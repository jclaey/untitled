export const requireUserAuth = (req, res, next) => {
    if (!req.session.userId) {
        return res.redirect('/users/login')
    }

    next()
}

export const requireAdminAuth = (req, res, next) => {
    if (!req.session.adminId) {
        return res.redirect('/admin/login')
    }

    next()
}