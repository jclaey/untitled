import 'dotenv/config'
import { validationResult } from 'express-validator'
import indexPage from '../../views/services/index.js'
import websiteServicesPage from '../../views/services/websites.js'
import mobileApplicationServicesPage from '../../views/services/mobileApplications.js'
import fullSystemServicesPage from '../../views/services/fullSystem.js'
import webApplicationServicesPage from '../../views/services/webApplications.js'


export const getIndex = (req, res, next) => {
    res.send(indexPage(req))
}

export const getWebsiteServices = (req, res, next) => {
    res.send(websiteServicesPage(req))
}

export const getMobileApplicationServices = (req, res, next) => {
    res.send(mobileApplicationServicesPage(req))
}

export const getFullSystemServices = (req, res, next) => {
    res.send(fullSystemServicesPage(req))
}

export const getWebApplicationServices = (req, res, next) => {
    res.send(webApplicationServicesPage(req))
}