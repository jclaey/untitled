import express from 'express'
const router = express.Router()
import multer from 'multer'
import { storage } from '../../cloudinary/index.js'
const upload = multer({ storage })
import asyncHandler from '../../middleware/async.js'
import { requireAdminAuth } from '../../middleware/auth.js'
import {
    validateTitle,
    validateContent,
    validateDescription,
    validateImage
} from '../validators.js'
import {
    getIndex,
    getNew,
    postNew,
    getShow,
    getEdit,
    patchEdit,
    filterDocs
} from '../../controllers/docs/index.js'

router.route('/').get(getIndex)
router.route('/new')
    .get(requireAdminAuth, getNew)
    .post(requireAdminAuth, upload.single('image'), [
        validateTitle, 
        validateContent, 
        validateDescription,
        validateImage
], asyncHandler(postNew))
router.route('/doc/:id').get(asyncHandler(getShow))
router.route('/doc/:id/edit')
    .get(requireAdminAuth, asyncHandler(getEdit))
    .patch(requireAdminAuth, upload.single('image'), [
        validateTitle, 
        validateContent, 
        validateDescription
], asyncHandler(patchEdit))
router.route('/filter-docs').get(asyncHandler(filterDocs))

export default router