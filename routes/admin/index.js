import express from 'express'
const router = express.Router()
import asyncHandler from '../../middleware/async.js'
import { requireAuth } from '../../middleware/auth.js'
import {
    requireValidEmail,
    requireValidPasswordForUser
} from '../validators.js'
import {
    getIndex,
    getLogin,
    postLogin,
    getLogout
} from '../../controllers/admin/index.js'

router.route('/').get(requireAuth, getIndex)
router.route('/login').get(getLogin).post([ requireValidEmail, requireValidPasswordForUser ], asyncHandler(postLogin))
router.route('/logout').get(getLogout)

export default router