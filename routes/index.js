import express from 'express'
const router = express.Router()
import {
    getIndex,
    getAbout,
    getContact
} from '../controllers/index.js'

router.route('/').get(getIndex)
router.route('/about').get(getAbout)
router.route('/contact').get(getContact)

export default router