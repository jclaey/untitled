import express from 'express'
const router = express.Router()
import asyncHandler from '../middleware/async.js'
import {
    getIndex,
    getAbout,
    getContact,
    postContact,
    getSuccess
} from '../controllers/index.js'

router.route('/').get(getIndex)
router.route('/about').get(getAbout)
router.route('/contact').get(getContact).post(asyncHandler(postContact))
router.route('/success').get(getSuccess)

export default router