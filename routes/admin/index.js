import express from 'express'
const router = express.Router()

import {
    getIndex
} from '../../controllers/admin/index.js'

router.route('/').get(getIndex)

export default router