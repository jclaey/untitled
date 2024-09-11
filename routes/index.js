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
    patchResetPassword,
    getSuccessQuote,
    getStaySignedIn,
    getWebsitesDemo
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
router.route('/success-quote').get(getSuccessQuote)
router.route('/failure').get(getFailure)
router.route('/demos').get(getDemo)
router.route('/payment-successful').get(asyncHandler(getPaymentSuccessful))
router.route('/forgot-password').get(getForgotPassword).patch([
    requireValidEmail
], asyncHandler(patchForgotPassword))
router.route('/reset-password/:token').get(asyncHandler(getResetPassword)).patch([
    requireValidPasswordForUser
], asyncHandler(patchResetPassword))
router.route('/stay-signed-in').get(getStaySignedIn)
router.route('/websites-demos').get(getWebsitesDemo)

export default router