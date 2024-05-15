import express from 'express'
const router = express.Router()
import asyncHandler from '../../middleware/async.js'
import { requireAuth } from '../../middleware/auth.js'
import {
    getIndex,
    getNew,
    postNew
} from '../../controllers/docs/index.js'

router.route('/').get(getIndex)
router.route('/new').get(requireAuth, getNew).post(requireAuth, asyncHandler(postNew))

export default router