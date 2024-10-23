import 'dotenv/config'
import { validationResult } from 'express-validator'
import indexPage from '../../views/services/index.js'
import websiteServicesPage from '../../views/services/websites.js'
import mobileApplicationServicesPage from '../../views/services/mobileApplications.js'
import fullSystemServicesPage from '../../views/services/fullSystem.js'
import webApplicationServicesPage from '../../views/services/webApplications.js'
import desktopApplicationServicesPage from '../../views/services/desktopApplications.js'
import artficialIntelligenceServicesPage from '../../views/services/artificialIntelligence.js'
import otherServicesPage from '../../views/services/otherServices.js'

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

export const getArtificialIntelligenceServices = (req, res, next) => {
    res.send(artficialIntelligenceServicesPage({}, req))
}

export const getDesktopApplicationServices = (req, res, next) => {
    res.send(desktopApplicationServicesPage({}, req))
}

export const getOtherServices = (req, res, next) => {
    res.send(otherServicesPage({}, req))
}