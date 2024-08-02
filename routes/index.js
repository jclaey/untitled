import express from 'express'
const router = express.Router()
import asyncHandler from '../middleware/async.js'
import {
    validateName,
    requireValidEmail,
    validateContent,
    validateSubject
} from './validators.js'
import {
    getIndex,
    getAbout,
    getContact,
    postContact,
    getSuccess,
    getFailure,
    getDemo,
    getPaymentSuccessful
} from '../controllers/index.js'

router.route('/').get(getIndex)
router.route('/about').get(getAbout)
router.route('/contact').get(getContact).post([ validateName, requireValidEmail, validateContent, validateSubject ], asyncHandler(postContact))
router.route('/success').get(getSuccess)
router.route('/failure').get(getFailure)
router.route('/demos').get(getDemo)
router.route('/payment-successful').get(getPaymentSuccessful)

export default router