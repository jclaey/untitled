import mongoose from 'mongoose'
import { validationResult } from "express-validator"
import DocItem from '../../models/Doc.js'
import adminIndexPage from "../../views/admin/index.js"
import adminLoginPage from "../../views/admin/login.js"
import projectNewPage from "../../views/admin/projectNew.js"
import projectShowPage from '../../views/admin/projectShow.js'
import Admin from "../../models/Admin.js"
import Project from '../../models/Project.js'
import QuoteInfoItem from "../../models/QuoteInfoItem.js"
import { Product } from '../../models/Product.js'
import { decryptStringData, encryptStringData } from '../../utils/encrypt.js'

const key = process.env.ENCRYPTION_KEY

export const getIndex = async (req, res, next) => {
    const docs = await DocItem.find({}).populate('author').exec()
    let userId = decryptStringData(req.session.adminId, key, req.session.adminIv)
    const products = await Product.find({ user: userId })
    const projects = await Project.find({})
        .populate('user')
        .populate('quoteInfoItem')
        .exec()
    
    if (docs) {
        res.send(adminIndexPage({ docs, products, projects }, req))
    } else {
        res.redirect('/failure')
    }
}

export const getLogin = (req, res, next) => {
    res.send(adminLoginPage({}, req, res))
}

export const postLogin = async (req, res, next) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        res.send(adminLoginPage({ errors, values: req.body }, req))
    }

    if (req.params.admin) {
        req.body.email = req.params.admin.split('-')[0],
        req.body.password = req.params.admin.split('-')[1]
    }

    const { email, password } = req.body
    const admin = await Admin.findOne({ email })

    if (admin && admin.comparePasswords(password)) {
        let adminId = encryptStringData(String(admin._id), key)
        req.session.adminId = adminId.encryptedData
        req.session.adminIv = adminId.iv
        req.session.expiration = Date.now() + 10800000
        res.redirect('/admin')
    } else {
        if (process.env.NODE_ENV === 'development') {
            res.status(400)
            throw new Error('Invalid credentials')
        } else {
            res.redirect('/failure')
        }
    }
}

export const getLogout = (req, res, next) => {
    req.session = null
    res.redirect('/admin/login')
}

export const getProjectNew = (req, res, next) => {
    res.send(projectNewPage({}, req))
}

export const postProjectNew = async (req, res, next) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        res.send(projectNewPage({ errors, values: req.body }, req))
    }

    const quoteInfoId = req && req.params && req.params.quoteInfoId && req.params.quoteInfoId.length > 2 ? req.params.quoteInfoId : req.body.quoteInfoId ? req.body.quoteInfoId : ''
    const quoteInfoItem = await QuoteInfoItem.findById(String(quoteInfoId)).populate({ path: 'user' }).exec()
    const userId = quoteInfoItem.user._id ? quoteInfoItem.user._id : req && req.params && req.params.userId ? req.params.userId : ''

    if (quoteInfoId && quoteInfoId !== '' && userId && userId !== '') {
        const project = new Project({
            quoteInfoItem: quoteInfoId,
            user: userId,
            title: quoteInfoItem ? `${quoteInfoItem.businessName}: ${quoteInfoItem.projectType} - ${quoteInfoItem.dueDate.toLocaleDateString()}` : ''
        })
        
        if (project) {
            await project.save()
            res.redirect('/admin')
        } else {
            if (process.env.NODE_ENV === 'development') {
                throw new Error('Could not create new project')
            } else {
                // Not sure about this logic here
                req.session.error = 'Could not create new project'
                res.send(projectNewPage({}, req))
            }
        }
    }    
}

export const getProjectShow = async (req, res, next) => {
    let project = await Project.findById(req.params.projectId)
        .populate('user')
        .populate('quoteInfoItem')
        .exec()

    let quoteItem = await QuoteInfoItem.findById(project.quoteInfoItem._id)

    project = {
        id: project._id,
        quoteInfoItem: {
            businessName: project.quoteInfoItem.businessName,
            businessAddress: {
                streetAddressOne: project.quoteInfoItem.businessAddress.streetAddressOne,
                streetAddressTwo: project.quoteInfoItem.businessAddress.streetAddressTwo,
                city: project.quoteInfoItem.businessAddress.city,
                state: project.quoteInfoItem.businessAddress.state,
                postalCode: project.quoteInfoItem.businessAddress.postalCode
            },
            projectDetails: quoteItem.projectDetails
            // businessName: decryptStringData(project.quoteInfoItem.businessName.split('.')[0], key, project.quoteInfoItem.businessName.split('.')[1]),
            // businessAddress: {
            //     streetAddressOne: decryptStringData(project.quoteInfoItem.businessAddress.streetAddressOne.split('.')[0], key, project.quoteInfoItem.businessAddress.streetAddressOne.split('.')[1]),
            //     streetAddressTwo: project.quoteInfoItem.businessAddress.streetAddressTwo ? decryptStringData(project.quoteInfoItem.businessAddress.streetAddressTwo.split('.')[0], key, project.quoteInfoItem.businessAddress.streetAddressTwo.split('.')[1]),
            //     city: decryptStringData(project.quoteInfoItem.businessAddress.city.split('.')[0], key, project.quoteInfoItem.businessAddress.city.split('.')[1]),
            //     state: decryptStringData(project.quoteInfoItem.businessAddress.state.split('.')[0], key, project.quoteInfoItem.businessAddress.state.split('.')[1]),
            //     postalCode: decryptStringData(project.quoteInfoItem.businessAddress.postalCode.split('.')[0], key, project.quoteInfoItem.businessAddress.postalCode.split('.')[1])
            // }
        },
        updates: [...project.updates],
        user: {
            firstName: decryptStringData(project.user.firstName.split('.')[0], key, project.user.firstName.split('.')[1]),
            lastName: decryptStringData(project.user.lastName.split('.')[0], key, project.user.lastName.split('.')[1])
        },
        title: project.title
    }

    res.send(projectShowPage({ project }, req))
}

export const postProjectUpdate = async (req, res, next) => {
    let project = await Project.findById(req.params.projectId)
        .populate('user')
        .populate('quoteInfoItem')
        .exec()

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.send(projectShowPage({ project, errors, values: req.body }, req))
    }

    let images = []

    if (req.files) {
        for (let image of req.files) {
            images.push({
                path: image.path,
                filename: image.filename
            })
        }
    }

    if (project) {
        project.updates.push({
            title: req.body.title,
            description: req.body.description,
            images,
            version: req.body.version,
            type: req.body.type
        })

        console.log(project)

        await project.save()
        res.redirect(`/admin`)
    } else {
        if (process.env.NODE_ENV === 'development') {
            throw new Error('Could not update project')
        } else {
            // Not sure about this logic here
            req.session.error = 'Could not update project'
            res.send(projectShowPage({}, req))
        }
    }
}