import { validationResult } from "express-validator"
import crypto from 'crypto'
import util from 'util'
import userLoginPage from '../../views/users/login.js'
import userRegisterPage from '../../views/users/register.js'
import User from "../../models/User.js"

const scrypt = util.promisify(crypto.scrypt)

export const getLogin = (req, res, next) => {
    res.send(userLoginPage({}, req))
}

export const postLogin = (req, res, next) => {
    
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
        const buf = await scrypt(req.body.password, salt, 64)

        let password = `${buf.toString('hex')}.${salt}`

        const user = new User({
            firstName,
            lastName,
            email,
            password
        })

        if (user) {
            await user.save()
            req.session.userId = String(user._id)
            res.redirect('/')
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