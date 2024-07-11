import express from 'express'
const router = express.Router()
import asyncHandler from '../../middleware/async.js'
import { requireAuth } from '../../middleware/auth.js'
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
    postRegister
} from '../../controllers/users/index.js'

router.route('/login')
    .get(getLogin)
    .post([
        requireValidEmail,
        requireValidPasswordForUser
], postLogin)
router.route('/register')
    .get(getRegister)
    .post([
        validateFirstName,
        validateLastName,
        requireValidEmail,
        requireValidPasswordForUser
], asyncHandler(postRegister))

export default router