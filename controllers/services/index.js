import 'dotenv/config'
import { validationResult } from 'express-validator'
import indexPage from '../../views/services/index.js'
import websitesServicesPage from '../../views/services/websites.js'


export const getIndex = (req, res, next) => {
    res.send(indexPage())
}

export const getWebsitesServices = (req, res, next) => {
    res.send(websitesServicesPage())
}