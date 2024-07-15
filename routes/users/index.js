import express from 'express'
const router = express.Router()
import asyncHandler from '../../middleware/async.js'
import {
    validateFirstName,
    validateLastName,
    requireValidEmail,
    requireValidPasswordForUser
} from '../validators.js'
import {
    getLogin,
    getRegister,
    postLogin,
    postRegister,
    getLogout,
    getUserProfile
} from '../../controllers/users/index.js'

router.route('/login')
    .get(getLogin)
    .post([
        requireValidEmail,
        requireValidPasswordForUser
], asyncHandler(postLogin))
router.route('/register')
    .get(getRegister)
    .post([
        validateFirstName,
        validateLastName,
        requireValidEmail,
        requireValidPasswordForUser
], asyncHandler(postRegister))
router.route('/logout').get(getLogout)
router.route('/user/:id/profile').get(asyncHandler(getUserProfile))

export default router