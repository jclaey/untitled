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
    postAddCartItem,
    putRemoveCartItem,
    getCheckout,
    getCartItems,
    handleStripeEvents,
    getBillingShipping,
    postBillingShipping,
    getEditUserProfile,
    patchEditUserProfile
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
router.route('/user/:id/profile/edit').get(requireUserAuth, asyncHandler(getEditUserProfile)).post([
    validateFirstName,
    validateLastName,
    requireValidEmail
], requireUserAuth, asyncHandler(patchEditUserProfile))
router.route('/user/:id/cart').get(requireUserAuth, asyncHandler(getCart))
router.route('/user/:userId/cart/:productId/add').post(requireUserAuth, asyncHandler(postAddCartItem))
router.route('/user/:userId/cart/:productId/remove').put(requireUserAuth, asyncHandler(putRemoveCartItem))
router.route('/user/:id/cart/checkout').get(requireUserAuth, asyncHandler(getCheckout))
router.route('/user/getCartItems').get(requireUserAuth, asyncHandler(getCartItems))
router.route('/stripe/events').post(express.raw({ type: 'application/json' }), asyncHandler(handleStripeEvents))
router.route('/user/billing-shipping').get(requireUserAuth, asyncHandler(getBillingShipping)).post([
    validateStreetAddressOne,
    validateStreetAddressTwo,
    validateState,
    validateCity,
    validateZipcode
], requireUserAuth, asyncHandler(postBillingShipping))

export default router