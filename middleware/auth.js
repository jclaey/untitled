import userLoginPage from "../views/users/login.js"
import { encryptStringData } from "../utils/encrypt.js"
import projectNewPage from "../views/admin/projectNew.js"

const key = process.env.ENCRYPTION_KEY

export const requireUserAuth = (req, res, next) => {
    if (!req || !req.session || !req.session.userId) {
        if (req.originalUrl === '/quotes') {
            return res.send(userLoginPage({ fromQuotes: true }, req))
        } else {
            return res.redirect('/users/login')
        }
    }

    if (req.session.emailUnverified) {
        return res.redirect('/verify-email-page')
    }

    next()
}

export const requireAdminAuth = (req, res, next) => {
    if (req.originalMethod === 'GET' && req.route.path === '/projects/new/:quoteInfoId?/-/:userId?') {
        let admin = encryptStringData(process.env.ADMIN_ID, key)
        req.session.adminId = admin.encryptedData
        req.session.adminIv = admin.iv
        req.session.expiration = Date.now() + 10800000
        
        next()
    }

    if (!req || !req.session || !req.session.adminId) {
        return res.redirect('/admin/login')
    }

    next()
}