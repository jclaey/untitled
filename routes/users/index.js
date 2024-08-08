import express from 'express'
const router = express.Router()
import asyncHandler from '../../middleware/async.js'
import { requireUserAuth } from '../../middleware/auth.js'
import {
    validateFirstName,
    validateLastName,
    requireValidEmail,
    requireValidPasswordForUser,
    validateStreetAddressOne,
    validateStreetAddressTwo,
    validateState,
    validateZipcode,
    validateCity
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
    handleStripeEvents,
    getBillingShipping,
    postBillingShipping
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
        requireValidPasswordForUser,
        validateStreetAddressOne,
        validateStreetAddressTwo,
        validateState,
        validateCity,
        validateZipcode
], asyncHandler(postRegister))
router.route('/logout').get(getLogout)
router.route('/user/:id/profile').get(asyncHandler(getUserProfile))
router.route('/user/:id/cart').get(asyncHandler(getCart))
router.route('/user/:userId/cart/:productId/add').post(asyncHandler(postCartItem))
router.route('/user/:id/cart/checkout').get(requireUserAuth, asyncHandler(getCheckout))
router.route('/user/getCartItems').get(asyncHandler(getCartItems))
router.route('/stripe/events').post(express.raw({ type: 'application/json' }), asyncHandler(handleStripeEvents))
router.route('/user/billing-shipping').get(asyncHandler(getBillingShipping)).post([
    validateStreetAddressOne,
    validateStreetAddressTwo,
    validateState,
    validateCity,
    validateZipcode
], asyncHandler(postBillingShipping))

export default router