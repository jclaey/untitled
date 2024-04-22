import indexPage from "../views/index.js"
import aboutPage from "../views/about.js"
import contactPage from "../views/contact.js"

export const getIndex = (req, res, next) => {
    res.send(indexPage())
}

export const getAbout = (req, res, next) => {
    res.send(aboutPage())
}

export const getContact = (req, res, next) => {
    res.send(contactPage())
}