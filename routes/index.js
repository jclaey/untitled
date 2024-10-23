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
    getResetPasswordEmail,
    getPasswordEmailSentPage,
    getSuccessQuote,
    getStaySignedIn,
    getWebsitesDemo,
    getVerifyMobile,
    postVerifyMobile,
    postVerifyEmail,
    getVerifyEmailSuccess,
    getVerifyEmailPage
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
router.route('reset-password/:id/email').get(asyncHandler(getResetPasswordEmail))
router.route('password-email-sent').get(getPasswordEmailSentPage)
router.route('/stay-signed-in').get(getStaySignedIn)
router.route('/websites-demos').get(getWebsitesDemo)
router.route('/verify-mobile/:code?').get(getVerifyMobile).post(postVerifyMobile)
router.route('/verify-email-page').get(getVerifyEmailPage)
router.route('/verify-email/:token').get(postVerifyEmail)
router.route('/verify-email-success').get(getVerifyEmailSuccess)

export default router