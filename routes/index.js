import express from 'express'
const router = express.Router()
import asyncHandler from '../middleware/async.js'
import {
    validateName,
    requireValidEmail,
    validateContent,
    validateSubject,
    requireValidPasswordForUser
} from './validators.js'
import {
    getIndex,
    getAbout,
    getContact,
    postContact,
    getSuccess,
    getFailure,
    getDemo,
    getPaymentSuccessful,
    getForgotPassword,
    patchForgotPassword,
    getResetPassword,
    patchResetPassword
} from '../controllers/index.js'

router.route('/').get(getIndex)
router.route('/about').get(getAbout)
router.route('/contact').get(getContact).post([ 
    validateName, 
    requireValidEmail, 
    validateContent, 
    validateSubject 
], asyncHandler(postContact))
router.route('/success').get(getSuccess)
router.route('/failure').get(getFailure)
router.route('/demos').get(getDemo)
router.route('/payment-successful').get(asyncHandler(getPaymentSuccessful))
router.route('/forgot-password').get(getForgotPassword).patch([
    requireValidEmail
], asyncHandler(patchForgotPassword))
router.route('/reset-password/:token').get(asyncHandler(getResetPassword)).patch([
    requireValidPasswordForUser
], asyncHandler(patchResetPassword))

export default router