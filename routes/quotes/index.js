import express from 'express'
const router = express.Router()
import asyncHandler from '../../middleware/async.js'
import {
    getNewQuote,
    postNewQuote
} from '../../controllers/quotes/index.js'

router.route('/').get(getNewQuote).post(asyncHandler(postNewQuote))

export default router