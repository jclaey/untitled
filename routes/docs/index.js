import express from 'express'
const router = express.Router()
import multer from 'multer'
import { storage } from '../../cloudinary/index.js'
const upload = multer({ storage })
import asyncHandler from '../../middleware/async.js'
import { requireAuth } from '../../middleware/auth.js'
import {
    validateTitle,
    validatePostContent,
    validatePostDescription
} from '../validators.js'
import {
    getIndex,
    getNew,
    postNew
} from '../../controllers/docs/index.js'

router.route('/').get(getIndex)
router.route('/new')
    .get(requireAuth, getNew)
    .post(requireAuth, [ 
        validateTitle,
        validatePostContent,
        validatePostDescription
], upload.single('image'), asyncHandler(postNew))

export default router