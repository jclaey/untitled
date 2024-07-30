import { body } from "express-validator"
import { parsePhoneNumber } from "libphonenumber-js"
import Admin from "../models/Admin.js"

export const validateAuthorName = 
    body('author')
    .trim()
    .notEmpty()
    .withMessage('Please enter an author name')
    .escape()

export const validateSubject =
    body('subject')
    .trim()
    .notEmpty()
    .withMessage('Please enter a subject')
    .escape()

export const validateName = 
    body('name')
    .trim()
    .notEmpty()
    .withMessage('Please enter a valid name')
    .escape()

export const validateTitle = 
    body('title')
    .trim()
    .notEmpty()
    .withMessage('Please enter a title')
    .escape()

export const validateContent =
    body('content')
    .trim()
    .notEmpty()
    .withMessage('Please enter some content')
    .escape()

export const validateDescription = 
    body('description')
    .trim()
    .notEmpty()
    .withMessage('Please enter a description')
    .escape()

export const validateFirstName =
    body('firstName')
    .trim()
    .notEmpty()
    .withMessage('Please enter a first name')
    .escape()

export const validateLastName =
    body('lastName')
    .trim()
    .notEmpty()
    .withMessage('Please enter a last name')
    .escape()

export const validateBusinessName =
    body('businessName')
    .trim()
    .notEmpty()
    .withMessage('Please enter a business name')
    .escape()

export const validateStreetAddressOne =
    body('streetAddressOne')
    .trim()
    .notEmpty()
    .withMessage('Please enter a street address')
    .escape()

export const validateCity = 
    body('city')
    .trim()
    .notEmpty()
    .withMessage('Please enter a city')
    .escape()

export const validateState = 
    body('city')
    .trim()
    .notEmpty()
    .withMessage('Please enter a city')
    .escape()

export const validatePrice =
    body('price')
    .trim()
    .notEmpty()
    .withMessage('Please enter a price')
    .isNumeric()
    .withMessage('Price must be a number')
    .escape()

export const validateCountInStock =
    body('countInStock')
    .trim()
    .escape()

export const validateProductType =
    body('type')
    .trim()
    .notEmpty()
    .withMessage('Please select a type')
    .escape()

export const validateZipcode =
    body('zipcode')
    .trim()
    .notEmpty()
    .withMessage('Please enter a zipcode')
    .isPostalCode('US')
    .escape()

export const validateProjectType =
    body('projectType')
    .notEmpty()
    .withMessage('Please enter a project type')

export const validateProjectDetails =
    body('projectDetails')
    .trim()
    .notEmpty()
    .withMessage('Please enter some project details')
    .escape()

export const validateBudget =
    body('budget')
    .trim()
    .notEmpty()
    .withMessage('Please enter a budget')
    .isNumeric()
    .withMessage('Budget must be a number')
    .escape()

export const validatePhoneNumber =
    body('phoneNumber', 'Please enter a valid phone number')
    .trim()
    .isLength({ min: 10, max: 10 })
    .custom(value => {
        const phoneNumber = parsePhoneNumber(value, 'US')

        if (!phoneNumber) {
            throw new Error('Please enter a valid phone number')
        }
    })

export const validateStreetAddressTwo =
    body('streetAddressTwo')
    .trim()
    .escape()

export const requireValidEmail = 
    body('email')
    .trim()
    .notEmpty()
    .withMessage('Must provide a valid email')
    .normalizeEmail()
    .isEmail()
    .withMessage('Must provide a valid email')
    .escape()

export const requireValidPasswordForUser =
    body('password')
    .trim()
    .isLength({ min: 8, max: 30 })
    .withMessage('Password must be between 8 and 30 characters')