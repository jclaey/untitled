import express from 'express'
const router = express.Router()
import asyncHandler from '../../middleware/async.js'
import { requireAdminAuth } from '../../middleware/auth.js'
import {
    requireValidEmail,
    requireValidPasswordForUser,
    requireValidId,
    validateTitle,
    validateDescription
} from '../validators.js'
import {
    getIndex,
    getLogin,
    postLogin,
    getLogout,
    getProjectNew,
    postProjectNew,
    getProjectShow,
    postProjectUpdate
} from '../../controllers/admin/index.js'

router.route('/').get(requireAdminAuth, asyncHandler(getIndex))
router.route('/login').get(getLogin).post([ 
    requireValidEmail, 
    requireValidPasswordForUser 
], asyncHandler(postLogin))
router.route('/logout').get(getLogout)
router.route('/projects/new/:quoteInfoId?/-/:userId?').get(requireAdminAuth, asyncHandler(getProjectNew)).post([
    requireValidId
], asyncHandler(postProjectNew))
router.route('/projects/new/na/-/na').post([
    requireValidId
], asyncHandler(postProjectNew))
router.route('/project/:projectId').get(requireAdminAuth, asyncHandler(getProjectShow)).post([
    validateTitle, 
    validateDescription
], asyncHandler(postProjectUpdate))

export default router