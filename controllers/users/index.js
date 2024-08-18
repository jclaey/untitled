import { validationResult } from "express-validator"
import crypto from 'crypto'
import { google } from 'googleapis'
import path from 'path'
import process from 'process'
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

export const getLogin = (req, res, next) => {
    res.send(userLoginPage({}, req))
}

export const postLogin = async (req, res, next) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        res.send(userLoginPage({ errors, values: req.body }, req))
    }

    const { email, password } = req.body
    const user = await User.findOne({ email })

    if (user && user.comparePasswords(password)) {
        req.session.userId = String(user._id)
        res.redirect(`/users/user/${req.session.userId}/profile`)
    } else {
        req.session.error = 'Invalid credentials'
        res.send(userLoginPage({}, req))
    }
}

export const getRegister = (req, res, next) => {
    res.send(userRegisterPage({}, req))
}

export const postRegister = async (req, res, next) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        res.send(userRegisterPage({ errors, values: req.body }, req))
    }

    if (req.body.password === req.body.confirmPassword) {
        const { firstName, lastName, email } = req.body

        const salt = crypto.randomBytes(8).toString('hex')
        const hashedPassword = crypto.createHash('sha256').update(req.body.password + salt).digest('hex')

        let password = `${hashedPassword}.${salt}`

        const user = new User({
            firstName,
            lastName,
            email,
            password
        })

        if (user) {
            await user.save()
            req.session.userId = String(user._id)
            res.redirect(`/users/user/${user._id}/profile`)
        } else {
            if (process.env.NODE_ENV === 'development') {
                throw new Error('Could not create new user')
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
    res.redirect('/users/login')
}

export const getUserProfile = async (req, res, next) => {
    const user = await User.findById(req.params.id)

    if (user) {
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
        res.send(userEditProfilePage({ userInfo: { id: user._id, firstName: user.firstName, lastName: user.lastName, email: user.email } }))
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

    if (user) {
        const userUpdate = {
            firstName: req.body.firstName !== user.firstName ? req.body.firstName : user.firstName,
            lastName: req.body.lastName !== user.lastName ? req.body.lastName : user.lastName,
            email: req.body.email !== user.email ? req.body.email : user.email
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
    const user = await User.findById(req.params.id).populate({
        path: 'cart',
        populate: { path: 'product' }
    }).exec()

    if (user) {
        res.send(userCartPage({ cartItems: user.cart, user: { id: user._id, firstName: user.firstName } }, req))
    } else {
        if (process.env.NODE_ENV === 'development') {
            throw new Error('Resource not found')
        } else {
            res.redirect('/failure')
        }
    }
}

export const postAddCartItem = async (req, res, next) => {
    const user = await User.findById(req.params.userId)
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

export const postRemoveCartItem = async (req, res, next) => {
    let user = await User.findById(req.params.userId)
    const product = await Product.findById(req.params.productId)

    if (user && product) {
        const newCart = user.cart.filter(item => item.product._id !== product._id)
        user.cart = newCart

        user = await user.save()

        if (user) {
            res.send(userCartPage({ cartItems: user.cart, user: { id: user._id, firstName: user.firstName } }, req))
        }
    } else {
        if (process.env.NODE_ENV === 'development') {
            throw new Error('Could not remove item from cart')
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
    const user = await User.findById(req.session.userId).populate({
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
    const user = await User.findById(req.session.userId).populate({
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

        let existing = await Order.findOne({ user: user._id })

        if (existing) {
            existing.orderItems = orderItems,
            needsShipping ? existing.shippingAddress = {
                streetAddressOne: req.body.shippingAddressOne ? req.body.shippingAddressOne : '',
                streetAddressTwo: req.body.shippingAddressTwo ? req.body.shippingAddressTwo : '',
                city: req.body.shippingCity ? req.body.shippingCity : '',
                state: req.body.shippingState ? req.body.shippingState : '',
                postalCode: req.body.shippingPostalCode ? req.body.shippingPostalCode : '',
                country: req.body.shippingCountry ? req.body.shippingCountry : ''
            } : existing.shippingAddress = existing.shippingAddress
            existing.billingAddress = {
                streetAddressOne: req.body.streetAddressOne,
                streetAddressTwo: req.body.streetAddressTwo ? req.body.streetAddressTwo : '',
                city: req.body.city,
                state: req.body.state,
                postalCode: req.body.postalCode,
                country: req.body.country ? req.body.country : ''
            }
            existing.subtotalPrice = subtotal
            // calculate shipping costs
            existing.shippingPrice = 0
            // calculate tax rate
            existing.taxRate = 1
            // calculate total price of order
            existing.totalPrice = subtotal

            existing = await existing.save()

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
            const order = new Order({
                user: user._id,
                orderItems,
                shippingAddress: {
                    streetAddressOne: req.body.shippingAddressOne ? req.body.shippingAddressOne : '',
                    streetAddressTwo: req.body.shippingAddressTwo ? req.body.shippingAddressTwo : '',
                    city: req.body.shippingCity ? req.body.shippingCity : '',
                    state: req.body.shippingState ? req.body.shippingState : '',
                    postalCode: req.body.shippingPostalCode ? req.body.shippingPostalCode : '',
                    country: req.body.shippingCountry ? req.body.shippingCountry : ''
                },
                billingAddress: {
                    streetAddressOne: req.body.streetAddressOne,
                    streetAddressTwo: req.body.streetAddressTwo ? req.body.streetAddressTwo : '',
                    city: req.body.city,
                    state: req.body.state,
                    postalCode: req.body.postalCode,
                    country: req.body.country ? req.body.country : ''
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