import express from 'express'
const router = express.Router()
import asyncHandler from '../../middleware/async.js'
import {
    getIndex,
    getWebsitesServices
} from '../../controllers/services/index.js'

router.route('/').get(getIndex)
router.route('/websites').get(getWebsitesServices)

export default router