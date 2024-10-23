import express from 'express'
const router = express.Router()
import asyncHandler from '../../middleware/async.js'
import {
    getIndex,
    getWebsiteServices,
    getMobileApplicationServices,
    getFullSystemServices,
    getWebApplicationServices,
    getOtherServices,
    getDesktopApplicationServices,
    getArtificialIntelligenceServices
} from '../../controllers/services/index.js'

router.route('/').get(getIndex)
router.route('/websites').get(getWebsiteServices)
router.route('/mobileApplications').get(getMobileApplicationServices)
router.route('/fullSystem').get(getFullSystemServices)
router.route('/webApplications').get(getWebApplicationServices)
router.route('/otherServices').get(getOtherServices)
router.route('/desktopApplications').get(getDesktopApplicationServices)
router.route('/artificialIntelligence').get(getArtificialIntelligenceServices)

export default router