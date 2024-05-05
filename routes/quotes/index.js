import express from 'express'
const router = express.Router()
import {
    getNewQuote
} from '../../controllers/quotes/index.js'

router.route('/').get(getNewQuote)

export default router