import express from 'express'
const router = express.Router()
import asyncHandler from '../../middleware/async.js'
import {
    getIndex
} from '../../controllers/docs/index.js'

router.route('/', getIndex)