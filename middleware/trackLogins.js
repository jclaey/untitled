import User from "../models/User.js"
import failurePage from '../views/failure.js'

const trackLogins = async (req, res, next) => {
    let user

    if (req.body.email) {
        user = await User.findOne({ email })

        if (user) {
            user.logins.push(Date.now())
            user.save()
    
            let date = Date.now()
            let failedLogins = 0
    
            if (user.logins.length > 2) {
                user.logins.forEach(login => {
                    if (login > (date - 86400000)) {
                        failedLogins += 1
                    }
                })
    
                if (failedLogins > 2) {
                    user.lockedAccount = true
                    return res.send(failurePage({}, req))
                }
            }
        } else {
            user.logins.push(Date.now())
            user.save()
        }

        next()
    }

    next()
}

export default trackLogins