import express from 'express'
const router = express.Router()
import multer from 'multer'
import { storage } from '../../cloudinary/index.js'
const upload = multer()
import asyncHandler from '../../middleware/async.js'
import { requireAuth } from '../../middleware/auth.js'
import {
    validateTitle,
    validateProductType,
    validateDescription,
    validatePrice,
    validateCountInStock
} from '../validators.js'
import {
    getNew,
    postNew,
    getIndex
} from '../../controllers/products/index.js'

router.route('/').get(getIndex)

router.route('/new')
    .get(requireAuth, getNew)
    .post(upload.fields([{ name: 'image' }, { name: 'product' }]), [
        validateTitle,
        validateProductType,
        validateDescription,
        validatePrice,
        validateCountInStock
    ], asyncHandler(postNew))

export default router