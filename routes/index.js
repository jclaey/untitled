import express from 'express'
const router = express.Router()
import asyncHandler from '../middleware/async.js'
import { requireUserAuth } from '../middleware/auth.js'
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
    getWebsitesDemo,
    getVerifyMobile,
    postVerifyMobile,
    postVerifyEmail,
    getVerifyEmailSuccess
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
router.route('/payment-successful').get(requireUserAuth, asyncHandler(getPaymentSuccessful))
router.route('/forgot-password').get(getForgotPassword).patch([
    requireValidEmail
], asyncHandler(patchForgotPassword))
router.route('/reset-password/:token/:userId?').get(asyncHandler(getResetPassword)).patch([
    requireValidPasswordForUser
], asyncHandler(patchResetPassword))
router.route('/stay-signed-in').get(getStaySignedIn)
router.route('/websites-demos').get(getWebsitesDemo)
router.route('/verify-mobile/:code?').get(getVerifyMobile).post(postVerifyMobile)
router.route('/verify-email/:token').post(postVerifyEmail)
router.route('/verify-email-success').get(getVerifyEmailSuccess)

export default router