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
import User from "../../models/User.js"
import Order from '../../models/Order.js'
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
        res.redirect(`/users/user/${user._id}/profile`)
    } else {
        if (process.env.NODE_ENV === 'development') {
            throw new Error('Invalid credentials')
        } else {
            res.redirect('/failure')
        }
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

export const getCart = async (req, res, next) => {
    const user = await User.findById(req.params.id)

    if (user) {
        res.send(userCartPage({ cartItems: user.cart, firstName: user.firstName }, req))
    } else {
        if (process.env.NODE_ENV === 'development') {
            throw new Error('Resource not found')
        } else {
            res.redirect('/failure')
        }
    }
}

export const postCartItem = async (req, res, next) => {
    const user = await User.findById(req.params.userId)
    const product = await Product.findById(req.params.productId)

    if (user && product) {
        user.cart.push(product)
        await user.save()
        res.redirect('/success')
    } else {
        throw new Error('Could not find user or product')
    }
}

export const getCheckout = async (req, res, next) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        res.send(userCheckoutPage({ errors, values: req.body }))
    }

    const user = await User.findById(req.session.userId)

    if (user) {
        const cartItems = []
        let needsShipping = false
        let subtotal = 0

        user.cart.forEach(item => {
            if (item.type.toLowerCase() === 'physical') {
                needsShipping = true
            }

            subtotal += item.price

            // let image = await drive.files.get(item.imageId)

            // console.log(image)

            cartItems.push({
                title: item.title,
                description: item.description,
                price: item.price
            })
        })

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
        const user = await User.findById(req.session.userId)

        if (user) {
            // Send client secret by creating payment intent here instead of checkout route
            let subtotal = 0

            if (user.cart.length > 0) {
                user.cart.forEach(item => {
                    subtotal += item.price
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
    const user = await User.findById(req.session.userId)

    const endpointSecret = process.env.STRIPE_ENDPOINT_SECRET

    let event = req.body

    if (endpointSecret) {
        const signature = req.headers['stripe-signature']

        try {
            event = stripe.webhooks.constructEvent(
                req.body,
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
        await handlePaymentIntentSucceeded(paymentIntent, user, req)
        break
        case 'payment_method.attached':
        const paymentMethod = event.data.object
        // Then define and call a method to handle the successful attachment of a PaymentMethod.
        // handlePaymentMethodAttached(paymentMethod)
        break
        default:
        // Unexpected event type
        console.log(`Unhandled event type ${event.type}.`)
    }

    res.sendStatus(200)
}