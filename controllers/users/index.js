import { validationResult } from "express-validator"
import crypto from 'crypto'
import util from 'util'
import userLoginPage from '../../views/users/login.js'
import userRegisterPage from '../../views/users/register.js'
import userProfilePage from "../../views/users/profile.js"
import userCartPage from "../../views/users/cart.js"
import userCheckoutPage from '../../views/users/checkout.js'
import User from "../../models/User.js"
import Order from '../../models/Order.js'
import { Product } from "../../models/Product.js"

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

export const getCheckout = (req, res, next) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        res.send(userCheckoutPage({ errors, values: req.body }, req))
    }

    res.send(userCheckoutPage({ total: req.params.total, values: {} }, req))
}

export const postCheckout = (req, res, next) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        res.send(userCheckoutPage({ total: req.params.total, errors, values: req.body }, req))
    }

    
}