import { validationResult } from "express-validator"
import DocItem from '../../models/Doc.js'
import adminIndexPage from "../../views/admin/index.js"
import adminLoginPage from "../../views/admin/login.js"
import Admin from "../../models/Admin.js"

export const getIndex = async (req, res, next) => {
    const docs = await DocItem.find({})

    if (docs) {
        res.send(adminIndexPage({ docs }, req))
    } else {
        res.redirect('/failure')
    }
}

export const getLogin = (req, res, next) => {
    if (req && req.session && req.session.adminId) {
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
        req.session.adminId = String(admin._id)
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