import { body } from "express-validator"

export const validateAuthorName = 
    body('author')
    .trim()
    .notEmpty()
    .withMessage('Please enter an author name')
    .escape()

export const validateTitle = 
    body('title')
    .trim()
    .notEmpty()
    .withMessage('Please enter a title')
    .escape()

export const validatePostContent =
    body('content')
    .trim()
    .notEmpty()
    .withMessage('Please enter some post content')
    .escape()

export const validatePostDescription = 
    body('description')
    .trim()
    .notEmpty()
    .withMessage('Please enter a description')
    .escape()

export const requireValidEmail = 
    body('email')
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage('Must provide a valid email')
    .isLength({ min: 1, max: 30 })
    .withMessage('Email must be between 1 and 30 characters')
    .escape()

export const requireValidPasswordForUser =
    body('password')
    .trim()
    .isLength({ min: 8, max: 30 })
    .withMessage('Password must be between 8 and 30 characters')