import indexPage from "../../views/admin/index.js"
import adminLoginPage from "../../views/admin/login.js"
import Admin from "../../models/Admin.js"

export const getIndex = (req, res, next) => {
    res.send(indexPage())
}

export const getLogin = (req, res, next) => {
    res.send(adminLoginPage())
}

export const postLogin = async (req, res, next) => {
    const email = req.body.email

    const admin = await Admin.findOne({ email })

    if (admin) {
        req.session.userId = String(admin._id)
        res.redirect('/admin')
    } else {
        if (process.env.NODE_ENV === 'development') {
            res.status(400)
            throw new Error('Invalid credentials')
        } else {
            // This is not good error handling. Will need to fix later
            res.redirect('/failure')
        }
    }
}

export const getLogout = (req, res, next) => {
    req.session = null
    res.redirect('/admin/login')
}