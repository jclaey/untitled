import { validationResult } from "express-validator"
import indexPage from "../../views/admin/index.js"
import adminLoginPage from "../../views/admin/login.js"
import Admin from "../../models/Admin.js"

export const getIndex = (req, res, next) => {
    res.send(indexPage(req))
}

export const getLogin = (req, res, next) => {
    if (req && req.session && req.session.userId) {
        res.redirect('/admin')
    }

    res.send(adminLoginPage(req))
}

export const postLogin = async (req, res, next) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        res.send(adminLoginPage({ errors, values: req.body }, req))
    }

    const { email, password } = req.body
    const admin = await Admin.findOne({ email })

    if (admin && admin.comparePasswords(password)) {
        req.session.userId = String(admin._id)
        res.redirect('/admin')
    } else {
        if (process.env.NODE_ENV === 'development') {
            res.status(400)
            throw new Error('Invalid credentials')
        } else {
            res.redirect('/failure')
        }
    }
}

export const getLogout = (req, res, next) => {
    req.session = null
    res.redirect('/admin/login')
}