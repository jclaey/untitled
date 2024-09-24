import mongoose from 'mongoose'
import { validationResult } from "express-validator"
import DocItem from '../../models/Doc.js'
import adminIndexPage from "../../views/admin/index.js"
import adminLoginPage from "../../views/admin/login.js"
import projectNewPage from "../../views/admin/projectNew.js"
import Admin from "../../models/Admin.js"
import Project from '../../models/Project.js'
import QuoteInfoItem from "../../models/QuoteInfoItem.js"
import { Product } from '../../models/Product.js'
import { decryptStringData } from '../../utils/encrypt.js'

const key = process.env.ENCRYPTION_KEY

export const getIndex = async (req, res, next) => {
    const docs = await DocItem.find({})
    let userId = decryptStringData(req.session.adminId, key, req.session.adminIv)
    const products = await Product.find({ user: userId })
    const projects = await Project.find({}).populate({ path: 'user', path: 'quoteInfoItem' }).exec()
    
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
        req.session.adminId = String(admin._id)
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

    const quoteInfoId = req && req.params && req.params.quoteInfoId ? req.params.quoteInfoId : req.body.quoteInfoId ? req.body.quoteInfoId : ''
    const quoteInfoItem = await QuoteInfoItem.findById(quoteInfoId).populate({ path: 'user' }).exec()
    console.log(quoteInfoItem)
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
                req.session.error = 'Could not create new project'
                res.send(projectNewPage({}, req))
            }
        }
    }    
}