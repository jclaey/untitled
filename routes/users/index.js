import express from 'express'
const router = express.Router()
import asyncHandler from '../../middleware/async.js'
import { requireUserAuth } from '../../middleware/auth.js'
import {
    validateFirstName,
    validateLastName,
    requireValidEmail,
    requireValidPasswordForUser
} from '../validators.js'
import {
    getLogin,
    getRegister,
    postLogin,
    postRegister,
    getLogout,
    getUserProfile,
    getCart,
    postCartItem,
    getCheckout,
    getCartItems,
    handleStripeEvents
} from '../../controllers/users/index.js'

router.route('/login')
    .get(getLogin)
    .post([
        requireValidEmail,
        requireValidPasswordForUser
], asyncHandler(postLogin))
router.route('/register')
    .get(getRegister)
    .post([
        validateFirstName,
        validateLastName,
        requireValidEmail,
        requireValidPasswordForUser
], asyncHandler(postRegister))
router.route('/logout').get(getLogout)
router.route('/user/:id/profile').get(asyncHandler(getUserProfile))
router.route('/user/:id/cart').get(asyncHandler(getCart))
router.route('/user/:userId/cart/:productId/add').post(asyncHandler(postCartItem))
router.route('/user/:id/cart/checkout').get(requireUserAuth, getCheckout)
router.route('/user/getCartItems').get(getCartItems)
router.route('/stripe/events').post(handleStripeEvents)

export default router