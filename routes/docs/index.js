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
    validateDescription
} from '../validators.js'
import {
    getIndex,
    getNew,
    postNew,
    getShow,
    getEdit
} from '../../controllers/docs/index.js'

router.route('/').get(getIndex)
router.route('/new')
    .get(requireAdminAuth, getNew)
    .post(
        upload.single('image'),
        [validateTitle, validateContent, validateDescription], 
        asyncHandler(postNew)
    )
router.route('/doc/:id').get(asyncHandler(getShow))
router.route('/doc/:id/edit').get(requireAdminAuth, asyncHandler(getEdit))

export default router