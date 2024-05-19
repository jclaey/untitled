import express from 'express'
const router = express.Router()
import asyncHandler from '../middleware/async.js'
import {
    validateName,
    requireValidEmail,
    validateContent
} from './validators.js'
import {
    getIndex,
    getAbout,
    getContact,
    postContact,
    getSuccess,
    getFailure,
    getServices,
    getDemo
} from '../controllers/index.js'

router.route('/').get(getIndex)
router.route('/about').get(getAbout)
router.route('/contact').get(getContact).post([ validateName, requireValidEmail, validateContent ], asyncHandler(postContact))
router.route('/success').get(getSuccess)
router.route('/failure').get(getFailure)
router.route('/services').get(getServices)
router.route('/demos').get(getDemo)

export default router