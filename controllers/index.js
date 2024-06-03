import 'dotenv/config'
import { validationResult } from 'express-validator'
import indexPage from "../views/index.js"
import aboutPage from "../views/about.js"
import contactPage from "../views/contact.js"
import successPage from '../views/success.js'
import failurePage from "../views/failure.js"
import demoPage from "../views/demos.js"
import message from "../views/partials/message.js"
import sendEmail from "../utils/sendEmail.js"

export const getIndex = (req, res, next) => {
    res.send(indexPage())
}

export const getAbout = (req, res, next) => {
    res.send(aboutPage())
}

export const getContact = (req, res, next) => {
    res.send(contactPage({}, req))
}

export const postContact = async (req, res, next) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.send(contactPage({ errors, values: req.body }, req))
    }

    // Refactor this code
    await sendEmail(req)
    res.send(successPage())
}

export const getSuccess = (req, res, next) => {
    res.send(successPage())
}

export const getDemo = (req, res, next) => {
    res.send(demoPage())
}

export const getFailure = (req, res, next) => {
    res.send(failurePage())
}