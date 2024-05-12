import express from 'express'
const router = express.Router()
import asyncHandler from '../../middleware/async.js'
import {
    getIndex
} from '../../controllers/docs/index.js'

router.route('/').get(getIndex)
router.route('/new').get(getNew)

export default router