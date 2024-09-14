import { validationResult } from "express-validator"
import crypto from 'crypto'
import { google } from 'googleapis'
import path from 'path'
import process from 'node:process'
import Stripe from 'stripe'
import userLoginPage from '../../views/users/login.js'
import userRegisterPage from '../../views/users/register.js'
import userProfilePage from "../../views/users/profile.js"
import userCartPage from "../../views/users/cart.js"
import userCheckoutPage from '../../views/users/checkout.js'
import userBillingShippingPage from '../../views/users/billingShipping.js'
import userEditProfilePage from "../../views/users/editProfile.js"
import User from "../../models/User.js"
import Order from "../../models/Order.js"
import { Product } from "../../models/Product.js"
import { handlePaymentIntentSucceeded } from "../../utils/handleStripeEvents.js"
import { encryptStringData, decryptStringData } from "../../utils/encrypt.js"

const CREDENTIALS_PATH = path.join(process.cwd(), 'credentials.json')

const auth = new google.auth.GoogleAuth({
    keyFile: CREDENTIALS_PATH,
    scopes: ['https://www.googleapis.com/auth/drive']
})

const drive = google.drive({ version: 'v3', auth })

const productsFolderId = process.env.DRIVE_PRODUCTS_FOLDER_ID
const imagesFolderId = process.env.DRIVE_IMAGES_FOLDER_ID

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

const endpointSecret = process.env.STRIPE_ENDPOINT_SECRET

const key = process.env.ENCRYPTION_KEY

export const getLogin = (req, res, next) => {
    res.send(userLoginPage({}, req))
}

export const postLogin = async (req, res, next) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.send(userLoginPage({ errors, values: req.body }, req))
    }

    const { password } = req.body
    let email = crypto.createHash('sha256').update(req.body.email).digest('hex')
        
    const user = await User.findOne({ emailHashed: email })

    if (user && user.comparePasswords(password)) {
        let userId = encryptStringData(String(user._id), key)
        req.session.userId = userId.encryptedData
        req.session.userIv = userId.iv
        req.session.expiration = Date.now() + 10800000
        res.redirect(`/users/user/${user._id}/profile`)
    } else {
        req.session.error = 'Invalid credentials'
        return res.send(userLoginPage({}, req))
    }
}

export const getRegister = (req, res, next) => {
    res.send(userRegisterPage({}, req))
}

export const postRegister = async (req, res, next) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.send(userRegisterPage({ errors, values: req.body }, req))
    }

    let { 
        password, 
        confirmPassword, 
        firstName, 
        lastName,
        phoneNumber,
        email 
    } = req.body

    if (password === confirmPassword) {
        const salt = crypto.randomBytes(8).toString('hex')
        const hashedPassword = crypto.createHash('sha256').update(req.body.password + salt).digest('hex')

        password = `${hashedPassword}.${salt}`

        const encrypted = encryptStringData(email, key)
        const hashed = crypto.createHash('sha256').update(email).digest('hex')

        firstName = encryptStringData(firstName, key)
        lastName = encryptStringData(lastName, key)
        phoneNumber = encryptStringData(phoneNumber, key)

        let user = new User({
            firstName: `${firstName.encryptedData}.${firstName.iv}`,
            lastName: `${lastName.encryptedData}.${lastName.iv}`,
            emailEncrypted: {
                encryptedData: encrypted.encryptedData,
                iv: encrypted.iv
            },
            emailHashed: hashed,
            phoneNumber: `${phoneNumber.encryptedData}.${phoneNumber.iv}`,
            password
        })

        if (user) {
            user = await user.save()
            let userId = encryptStringData(String(user._id), key)
            req.session.userId = userId.encryptedData
            req.session.userIv = userId.iv
            req.session.expiration = Date.now() + 10800000
            res.redirect(`/users/user/${user._id}/profile`)
        } else {
            if (process.env.NODE_ENV === 'development') {
                throw new Error('Could not create a new user')
            } else {
                res.redirect('/failure')
            }
        }
    } else {
        res.redirect('/failure')
    }
}

export const getLogout = (req, res, next) => {
    req.session.userId = null
    req.session.userIv = null
    req.session.expiration = null
    res.send(userLoginPage({}, req))
}

export const getUserProfile = async (req, res, next) => {
    let user = await User.findById(req.params.id)

    if (user) {
        let firstName = user.firstName.split('.')
        firstName = decryptStringData(firstName[0], key, firstName[1])
        let lastName = user.lastName.split('.')
        lastName =  decryptStringData(lastName[0], key, lastName[1])
        let email = decryptStringData(user.emailEncrypted.encryptedData, key, user.emailEncrypted.iv)

        user = { id: user._id, createdAt: user.createdAt, firstName, lastName, email }

        res.send(userProfilePage({ user }, req))
    } else {
        if (process.env.NODE_ENV === 'development') {
            throw new Error('Could not find resource')
        } else {
            res.redirect('/failure')
        }
    }
}

export const getEditUserProfile = async (req, res, next) => {
    const user = await User.findById(req.params.id)

    if (user) {
        let firstName = user.firstName.split('.')
        firstName = decryptStringData(firstName[0], key, firstName[1])
        let lastName = user.lastName.split('.')
        lastName =  decryptStringData(lastName[0], key, lastName[1])
        let email = user.email
        email = decryptStringData(email.encryptedData, key, email.iv)

        const userInfo = { id: user._id, firstName, lastName, email }

        res.send(userEditProfilePage({ 
            userInfo 
        }, req))
    } else {
        if (process.env.NODE_ENV === 'development') {
            throw new Error('Could not get user')
        } else {
            res.redirect('/failure')
        }
    }
}

export const patchEditUserProfile = async (req, res, next) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        res.send(userEditProfilePage({ errors, values: req.body }, req))
    }

    let user = await User.findById(req.params.id)

    user = {
        id: user._id,
        firstName: decryptStringData(user.firstName.split('.')[0], key, user.firstName.split('.')[1]),
        lastName: decryptStringData(user.lastName.split('.')[0], key, user.lastName.split('.')[1]),
        email: decryptStringData(user.email.encryptedData, key, user.email.iv)
    }

    if (user) {
        user = {
            id: user.id,
            firstName: req.body.firstName !== user.firstName ? req.body.firstName : user.firstName,
            lastName: req.body.lastName !== user.lastName ? req.body.lastName : user.lastName,
            email: req.body.email !== user.email ? req.body.email : user.email
        }

        let firstName = encryptStringData(user.firstName, key)
        let lastName = encryptStringData(user.lastName, key)
        let email = encryptStringData(user.email, key)

        const userUpdate = {
            firstName: `${firstName.encryptedData}.${firstName.iv}`,
            lastName: `${lastName.encryptedData}.${lastName.iv}`,
            email: {
                encryptedData: email.encryptedData,
                iv: email.iv
            }
        }

        user = await User.findByIdAndUpdate(req.params.id, userUpdate)

        if (user) {
            res.redirect(`/users/user/${user._id}/profile`)
        } else {
            if (process.env.NODE_ENV === 'development') {
                throw new Error('Could not update user')
            } else {
                res.redirect('/failure')
            }
        }
    } else {
        if (process.env.NODE_ENV === 'development') {
            throw new Error('Could not find user')
        } else {
            res.redirect('/failure')
        }
    }
}

export const getCart = async (req, res, next) => {
    let user = await User.findById(req.params.id).populate({
        path: 'cart',
        populate: { path: 'product' }
    }).exec()

    if (user) {
        const cartItems = user.cart
        user = {
            id: user._id,
            firstName: decryptStringData(user.firstName.split('.')[0], key, user.firstName.split('.')[1])
        }

        res.send(userCartPage({ cartItems, user }, req))
    } else {
        if (process.env.NODE_ENV === 'development') {
            throw new Error('Resource not found')
        } else {
            res.redirect('/failure')
        }
    }
}

export const postAddCartItem = async (req, res, next) => {
    let user = await User.findById(req.params.userId).populate({
        path: 'cart',
        populate: { path: 'product' }
    }).exec()
    const product = await Product.findById(req.params.productId)

    if (user && product) {
        // let existing = user.cart.find(item => item._id === product._id)
        // if (existing)
        user.cart.push({ qty: 1, product })
        await user.save()
        res.redirect(`/users/user/${user._id}/cart`)
    } else {
        throw new Error('Could not find user or product')
    }
}

export const putRemoveCartItem = async (req, res, next) => {
    let user = await User.findById(req.params.userId).populate({
        path: 'cart',
        populate: { path: 'product' }
    }).exec()
    const product = await Product.findById(req.params.productId)

    if (user && product) {
        const newCart = user.cart.filter(item => String(item.product._id) !== String(product._id))
        user.cart = newCart

        user = await user.save()

        if (user) {
            let cartItems = user.cart
            user = {
                id: user._id,
                firstName: decryptStringData(user.firstName.split('.')[0], key, user.firstName.split('.')[1])
            }

            res.send(userCartPage({ cartItems, user }, req))
        }
    } else {
        if (process.env.NODE_ENV === 'development') {
            if (!user) {
                throw new Error('Could not get user')
            } else if (!product) {
                throw new Error('Could not get product')
            } else {
                throw new Error('Could not remove item from cart')
            }
        } else {
            res.redirect('/failure')
        }
    }
}

export const getCheckout = async (req, res, next) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        res.send(userCheckoutPage({ errors, values: req.body }))
    }

    const user = await User.findById(req.session.userId).populate({
        path: 'cart',
        populate: { path: 'product' }
    }).exec()

    if (user) {
        const cartItems = []
        let needsShipping = false
        let subtotal = 0

        user.cart.forEach(item => {
            if (item.product.type.toLowerCase() === 'physical') {
                needsShipping = true
            }

            subtotal += item.product.price

            // let image = await drive.files.get(item.imageId)

            // console.log(image)

            cartItems.push({
                title: item.product.title,
                description: item.product.description,
                price: item.product.price
            })
        })

        subtotal *= 100

        res.send(userCheckoutPage({ cart: { cartItems, needsShipping, subtotal } }, req))
    } else {
        if (process.env.NODE_ENV === 'development') {
            throw new Error('User not found')
        } else {
            res.redirect('/failure')
        }
    }
}

export const getCartItems = async (req, res, next) => {
    if (req && req.session && req.session.userId) {
        const user = await User.findById(req.session.userId).populate({
            path: 'cart',
            populate: { path: 'product' }
        }).exec()

        if (user) {
            let subtotal = 0

            if (user.cart.length > 0) {
                user.cart.forEach(item => {
                    subtotal += item.product.price
                })

                // Calculate tax?
                subtotal *= 100

                // Payment processing?
                const paymentIntent = await stripe.paymentIntents.create({
                    amount: `${subtotal}`,
                    currency: 'USD'
                })

                const client_secret = paymentIntent.client_secret 
    
                res.json({ items: user.cart, total: subtotal, client_secret })
            } else {
                // Do something else
                console.log("The user's cart is empty")
            }
        } else {
            if (process.env.NODE_ENV === 'development') {
                throw new Error('Could not find user')
            } else {
                res.redirect('/failure')
            }
        }
    }
}

export const handleStripeEvents = async (req, res, next) => {
    let event = req.body

    if (endpointSecret) {
        const signature = req.get('stripe-signature')

        try {
            event = stripe.webhooks.constructEvent(
                event,
                signature,
                endpointSecret
            )
        } catch (err) {
            console.log('Verification failed: ', err.message)
            return res.sendStatus(400)
        }    
    }

    // Handle the event
    switch (event.type) {
        case 'payment_intent.succeeded':
        const paymentIntent = event.data.object
        console.log(`PaymentIntent for ${paymentIntent.amount} was successful!`)
        // Then define and call a method to handle the successful payment intent.
        await handlePaymentIntentSucceeded(paymentIntent)
        break
        // case 'payment_method.attached':
        // const paymentMethod = event.data.object
        // Then define and call a method to handle the successful attachment of a PaymentMethod.
        // handlePaymentMethodAttached(paymentMethod)
        // break
        default:
        // Unexpected event type
        console.log(`Unhandled event type ${event.type}.`)
    }

    res.sendStatus(200)
}

export const getBillingShipping = async (req, res, next) => {
    const userId = decryptStringData(req.session.userId, key, req.session.userIv)
    const user = await User.findById(userId).populate({
        path: 'cart',
        populate: { path: 'product' }
    }).exec()

    if (user) {
        let subtotal = 0
        let needsShipping = false

        user.cart.forEach(item => {
            if (item.product.type.toLowerCase() === 'physical') {
                needsShipping = true
            }

            subtotal += item.product.price
        })

        res.send(userBillingShippingPage({ cart: { cartItems: user.cart, subtotal: subtotal.toFixed(2) } }, req))
    } else {
        if (process.env.NODE_ENV === 'development') {
            throw new Error('Could not find user')
        } else {
            res.redirect('/failure')
        }
    }
}

export const postBillingShipping = async (req, res, next) => {
    const userId = decryptStringData(req.session.userId, key, req.session.userIv)

    const user = await User.findById(userId).populate({
        path: 'cart',
        populate: { path: 'product' }
    }).exec()

    if (user) {
        let orderItems = []
        let subtotal = 0
        let needsShipping

        user.cart.forEach(item => {
            const dupIndex = orderItems.findIndex(el => item.product._id === el._id)

            if (dupIndex !== -1) {
                orderItems[dupIndex].qty += 1
            } else {
                orderItems.push(item)
            }

            if (item.product.type.toLowerCase() === 'physical') {
                needsShipping = true
            }

            subtotal += item.product.price
        })

        Number.parseFloat(subtotal)
        subtotal.toFixed(2)

        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            res.send(userBillingShippingPage({ cart: { cartItems: user.cart, needsShipping, subtotal }, errors, values: req.body }, req))
        }

        // add parameters to search for order where same user id and isPaid === false
        let existing = await Order.find({ user: user._id, isPaid: false })

        if (existing.length > 0) {
            existing[existing.length - 1].orderItems = orderItems,
            needsShipping ? existing[existing.length - 1].shippingAddress = {
                streetAddressOne: req.body.shippingAddressOne ? encryptStringData(req.body.shippingAddressOne, key) : '',
                streetAddressTwo: req.body.shippingAddressTwo ? encryptStringData(req.body.shippingAddressTwo, key) : '',
                city: req.body.shippingCity ? encryptStringData(req.body.shippingCity, key) : '',
                state: req.body.shippingState ? encryptStringData(req.body.shippingState, key) : '',
                postalCode: req.body.shippingPostalCode ? encryptStringData(req.body.shippingPostalCode, key) : '',
                country: req.body.shippingCountry ? encryptStringData(req.body.shippingCountry, key) : ''
            } : existing.shippingAddress = existing.shippingAddress
            existing[existing.length - 1].billingAddress = {
                streetAddressOne: encryptStringData(req.body.streetAddressOne, key),
                streetAddressTwo: req.body.streetAddressTwo ? encryptStringData(req.body.streetAddressTwo, key) : '',
                city: encryptStringData(req.body.city, key),
                state: encryptStringData(req.body.state, key),
                postalCode: encryptStringData(req.body.postalCode, key),
                country: req.body.country ? encryptStringData(req.body.country, key) : ''
            }
            existing[existing.length - 1].subtotalPrice = subtotal
            // calculate shipping costs
            existing[existing.length - 1].shippingPrice = 0
            // calculate tax rate
            existing[existing.length - 1].taxRate = 1
            // calculate total price of order
            existing[existing.length - 1].totalPrice = subtotal

            if (existing.length > 1) {
                existing = existing.slice(0, 1)
            }

            existing = await existing[0].save()

            if (existing) {
                res.redirect(`/users/user/${user._id}/cart/checkout`)
            } else {
                if (process.env.NODE_ENV === 'development') {
                    throw new Error('Could not save existing order')
                } else {
                    res.redirect('/failure')
                }
            }
        } else {
            let shippingAddressOne = req.body.shippingAddressOne ? encryptStringData(req.body.shippingAddressOne, key) : ''
            let shippingAddressTwo = req.body.shippingAddressTwo ? encryptStringData(req.body.shippingAddressTwo, key) : ''
            let shippingCity = req.body.shippingCity ? encryptStringData(req.body.shippingCity, key) : ''
            let shippingState = req.body.shippingState ? encryptStringData(req.body.shippingState, key) : ''
            let shippingPostalCode = req.body.shippingPostalCode ? encryptStringData(req.body.shippingPostalCode, key) : ''
            let shippingCountry = req.body.shippingCountry ? encryptStringData(req.body.shippingCountry) : ''

            let streetAddressOne = encryptStringData(req.body.streetAddressOne, key)
            let streetAddressTwo = req.body.streetAddressTwo ? encryptStringData(req.body.streetAddressTwo, key) : ''
            let city = encryptStringData(req.body.city, key)
            let state = encryptStringData(req.body.state, key)
            let postalCode = encryptStringData(req.body.postalCode, key)
            let country = req.body.country ? encryptStringData(req.body.country, key) : ''

            const order = new Order({
                user: user._id,
                orderItems,
                shippingAddress: {
                    // and finish this code
                    streetAddressOne: req.body.shippingAddressOne ? `${shippingAddressOne.encryptedData}.${shippingAddressOne.iv}` : '',
                    streetAddressTwo: req.body.shippingAddressTwo ? `${shippingAddressTwo.encryptedData}.${shippingAddressTwo.iv}` : '',
                    city: req.body.shippingCity ? `${shippingCity.encryptedData}.${shippingCity.iv}` : '',
                    state: req.body.shippingState ? `${shippingState.encryptedData}.${shippingState.iv}` : '',
                    postalCode: req.body.shippingPostalCode ? `${shippingPostalCode.encryptedData}.${shippingPostalCode.iv}` : '',
                    country: req.body.shippingCountry ? `${shippingCountry.encryptedData}.${shippingCountry.iv}` : ''
                },
                billingAddress: {
                    streetAddressOne: `${streetAddressOne.encryptedData}.${streetAddressOne.iv}`,
                    streetAddressTwo: req.body.streetAddressTwo ? `${streetAddressTwo.encryptedData}.${streetAddressTwo.iv}` : '',
                    city: `${city.encryptedData}.${city.iv}`,
                    state: `${state.encryptedData}.${state.iv}`,
                    postalCode: `${postalCode.encryptedData}.${postalCode.iv}`,
                    country: req.body.country ? `${country.encryptedData}.${country.iv}` : ''
                },
                paymentMethod: '',
                paymentResult: {
                    id: '',
                    status: '',
                    updateTime: '',
                    emailAddress: ''
                },
                subtotalPrice: subtotal,
                // calculate shipping costs
                shippingPrice: 0,
                // calculate tax rate (percentage)
                taxRate: 1,
                // calculate total price
                totalPrice: subtotal,
                isPaid: false,
                paidAt: null
            })

            if (order) {
                await order.save()
                res.redirect(`/users/user/${user._id}/cart/checkout`)
            } else {
                if (process.env.NODE_ENV === 'development') {
                    throw new Error('Could not create user order')
                } else {
                    res.redirect('/failure')
                }
            }
        }
    } else {
        if (process.env.NODE_ENV === 'development') {
            throw new Error('Could not find user')
        } else {
            res.redirect('/failure')
        }
    }
}