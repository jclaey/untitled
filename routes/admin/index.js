import express from 'express'
const router = express.Router()
import multer from 'multer'
import { storage } from '../../cloudinary/index.js'
const upload = multer({ storage })
import asyncHandler from '../../middleware/async.js'
import { requireAdminAuth } from '../../middleware/auth.js'
import {
    requireValidEmail,
    requireValidPasswordForUser,
    requireValidId,
    validateTitle,
    validateDescription,
    validateVersion,
    validateProjectUpdateType
} from '../validators.js'
import {
    getIndex,
    getLogin,
    postLogin,
    getLogout,
    getProjectNew,
    postProjectNew,
    getProjectShow,
    postProjectUpdate,
    getProjectUpdateShow
} from '../../controllers/admin/index.js'

router.route('/').get(requireAdminAuth, asyncHandler(getIndex))
router.route('/login').get(getLogin).post([ 
    requireValidEmail, 
    requireValidPasswordForUser 
], asyncHandler(postLogin))
router.route('/logout').get(getLogout)
router.route('/projects/new/:quoteInfoId?/-/:userId?')
    .get(requireAdminAuth, asyncHandler(getProjectNew)).post(requireAdminAuth, [
    requireValidId
], asyncHandler(postProjectNew))
router.route('/projects/new/na/-/na').post([
    requireValidId
], asyncHandler(postProjectNew))
router.route('/project/:projectId')
    .get(requireAdminAuth, asyncHandler(getProjectShow)).post(requireAdminAuth, upload.array('images', 12), [
    validateTitle,
    validateDescription,
    validateVersion,
    validateProjectUpdateType
], asyncHandler(postProjectUpdate))
router.route('/project/:projectId/update/:updateId')
    .get(requireAdminAuth, asyncHandler(getProjectUpdateShow))

export default router