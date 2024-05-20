import express from 'express'
const router = express.Router()
import multer from 'multer'
import { storage } from '../../cloudinary/index.js'
const upload = multer({ storage })
import asyncHandler from '../../middleware/async.js'
import { requireAuth } from '../../middleware/auth.js'
import {
    getNew
} from '../../controllers/products/index.js'

router.route('/').get()

export default router