import indexPage from "../views/index.js"
import aboutPage from "../views/about.js"
import contactPage from "../views/contact.js"
import successPage from '../views/success.js'
import servicesPage from "../views/services.js"
import demoPage from "../views/demos.js"
import sendEmail from "../utils/sendEmail.js"

export const getIndex = (req, res, next) => {
    res.send(indexPage())
}

export const getAbout = (req, res, next) => {
    res.send(aboutPage())
}

export const getContact = (req, res, next) => {
    res.send(contactPage())
}

export const postContact = async (req, res, next) => {
    await sendEmail(req)
    res.send(successPage())
}

export const getSuccess = (req, res, next) => {
    res.send(successPage())
}

export const getServices = (req, res, next) => {
    res.send(servicesPage())
}

export const getDemo = (req, res, next) => {
    res.send(demoPage())
}