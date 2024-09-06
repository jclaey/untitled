import express from 'express'
const router = express.Router()
import multer from 'multer'
const upload = multer()
import asyncHandler from '../../middleware/async.js'
import { requireAdminAuth } from '../../middleware/auth.js'
import {
    validateTitle,
    validateProductType,
    validateDescription,
    validatePrice,
    validateCountInStock,
    validateImage
} from '../validators.js'
import {
    getNew,
    postNew,
    getIndex,
    getShow,
    getEdit,
    patchEdit
} from '../../controllers/products/index.js'

router.route('/').get(asyncHandler(getIndex))

router.route('/new')
    .get(requireAdminAuth, getNew)
    .post(upload.fields([{ name: 'image' }, { name: 'product' }]), [
        validateTitle,
        validateProductType,
        validateDescription,
        validatePrice,
        validateCountInStock,
        validateImage
    ], asyncHandler(postNew))

router.route('/product/:id').get(asyncHandler(getShow))

router.route('/product/:id/edit')
    .get(requireAdminAuth, asyncHandler(getEdit))
    .patch(upload.fields([{ name: 'image' }, { name: 'product' }]), [
        validateTitle, 
        validateProductType, 
        validateDescription, 
        validatePrice, 
        validateCountInStock,
        validateImage
    ], asyncHandler(patchEdit))

export default router