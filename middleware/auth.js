import userLoginPage from "../views/users/login.js"

export const requireUserAuth = (req, res, next) => {
    if (!req || !req.session || !req.session.userId) {
        if (req.originalUrl === '/quotes') {
            return res.send(userLoginPage({ fromQuotes: true }, req))
        } else {
            return res.redirect('/users/login')
        }
    }

    next()
}

export const requireAdminAuth = (req, res, next) => {
    if (!req || !req.session || !req.session.adminId) {
        return res.redirect('/admin/login')
    }

    next()
}