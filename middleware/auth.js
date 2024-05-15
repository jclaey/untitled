export const requireAuth = (req, res, next) => {
    if (!req.session.userId) {
        return res.redirect('/admin/login')
    }

    next()
}