import { body } from "express-validator"
import sanitize from "../utils/sanitize.js"

export const validateAuthorName = 
    sanitize(body('author')
    .isEmpty()
    .withMessage('Please enter an author name')
    .trim()
    .escape())

export const validateTitle = 
    sanitize(body('title')
    .isLength({ min: 1, max: Infinity })
    .withMessage('Please enter a title')
    .trim()
    .escape())

export const validatePostContent =
    sanitize(body('content')
    .isLength({ min: 1, max: Infinity })
    .withMessage('Please enter some post content')
    .trim()
    .escape())

export const validatePostDescription = 
    sanitize(body('description')
    .isLength({ min: 1, max: Infinity })
    .withMessage('Please enter a description')
    .trim()
    .escape())

export const requireValidEmail = 
    sanitize(body('email')
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage('Must provide a valid email')
    .isLength({ min: 1, max: 30 })
    .withMessage('Email must be between 1 and 30 characters')
    .escape())

export const requireValidPasswordForUser =
    body('password')
    .trim()
    .isLength({ min: 8, max: 30 })
    .withMessage('Password must be between 8 and 30 characters')
    .escape()