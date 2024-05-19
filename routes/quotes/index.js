import express from 'express'
const router = express.Router()
import asyncHandler from '../../middleware/async.js'
import {
    validateFirstName,
    validateLastName,
    validateBusinessName,
    validateStreetAddressOne,
    validateStreetAddressTwo,
    validateCity,
    validateState,
    validateZipcode,
    requireValidEmail,
    validatePhoneNumber,
    validateProjectType,
    validateProjectDetails,
    validateBudget
} from '../validators.js'
import {
    getNewQuote,
    postNewQuote
} from '../../controllers/quotes/index.js'

router.route('/').get(getNewQuote).post([
    validateFirstName, 
    validateLastName, 
    validateBusinessName, 
    validateStreetAddressOne, 
    validateStreetAddressTwo, 
    validateCity, 
    validateState, 
    validateZipcode,
    requireValidEmail,
    validatePhoneNumber,
    validateProjectType,
    validateProjectDetails,
    validateBudget
], asyncHandler(postNewQuote))

export default router