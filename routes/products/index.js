import express from 'express'
const router = express.Router()
import multer from 'multer'
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
    getIndex,
    getShow,
    getEdit
} from '../../controllers/products/index.js'

router.route('/').get(asyncHandler(getIndex))

router.route('/new')
    .get(requireAuth, getNew)
    .post(upload.fields([{ name: 'image' }, { name: 'product' }]), [
        validateTitle,
        validateProductType,
        validateDescription,
        validatePrice,
        validateCountInStock
    ], asyncHandler(postNew))

router.route('/product/:id').get(asyncHandler(getShow))

router.route('/product/:id/edit').get(asyncHandler(getEdit))

export default router