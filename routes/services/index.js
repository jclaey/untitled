import express from 'express'
const router = express.Router()
import asyncHandler from '../../middleware/async.js'
import {
    getIndex,
    getWebsiteServices,
    getMobileApplicationServices,
    getFullSystemServices,
    getWebApplicationServices
} from '../../controllers/services/index.js'

router.route('/').get(getIndex)
router.route('/websites').get(getWebsiteServices)
router.route('/mobileApplications').get(getMobileApplicationServices)
router.route('/fullSystem').get(getFullSystemServices)
router.route('/webApplications').get(getWebApplicationServices)

export default router