import 'dotenv/config'
import { validationResult } from 'express-validator'
import docsIndexPage from "../../views/docs/index.js"
import newDocPage from "../../views/docs/new.js"
import showDocPage from '../../views/docs/show.js'
import docsEditPage from '../../views/docs/edit.js'
import DocItem from "../../models/Doc.js"
import { decode } from 'html-entities'
import { decryptStringData } from '../../utils/encrypt.js'

const key = process.env.ENCRYPTION_KEY

export const getIndex = async (req, res, next) => {
    const docs = await DocItem.find({}).populate('author').exec()

    res.send(docsIndexPage({ docs }, req))
}

export const getNew = (req, res, next) => {
    res.send(newDocPage({}, req))
}

export const postNew = async (req, res, next) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        if (req.file) {
            req.body.file = req.file
        }
        
        return res.send(newDocPage({ errors, values: req.body }, req))
    }

    const adminId = decryptStringData(req.session.adminId, key, req.session.adminIv)

    const doc = new DocItem({
        type: req.body.type,
        category: req.body.category,
        title: req.body.title,
        author: adminId,
        description: req.body.description,
        content: typeof req.body.content !== 'string' ? req.body.content[0] : '',
        keywords: req.body.keywords,
        image: {
            path: req.file.path,
            filename: req.file.filename
        }
    })

    if (doc) {
        await doc.save()
        res.redirect('/admin')
    } else {
        if (process.env.NODE_ENV === 'development') {
            res.redirect('/failure')
            res.status(500)
            throw new Error('Server error')
        } else {
            res.redirect('/failure')
        }
    }
}

export const getShow = async (req, res, next) => {
    const doc = await DocItem.findById(req.params.id).populate('author').exec()

    if (doc) {
        res.send(showDocPage({ doc }, req))
    } else {
        if (process.env.NODE_ENV === 'development') {
            res.redirect('/failure')
            res.status(500)
            throw new Error('Server error')
        } else {
            res.redirect('/failure')
        }
    }
}

export const getEdit = async (req, res, next) => {
    const doc = await DocItem.findById(req.params.id)

    if (doc) {
        res.send(docsEditPage({ doc }, req))
    } else {
        if (process.env.NODE_ENV === 'development') {
            throw new Error('Resource not found')
        } else {
            res.redirect('/failure')
        }
    }
}

export const patchEdit = async (req, res, next) => {
    let doc = await DocItem.findById(req.params.id)

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.send(docsEditPage({ doc, errors, values: req.body }, req))
    }

    if (!doc) {
        if (process.env.NODE_ENV === 'development') {
            throw new Error('Resource not found')
        } else {
            res.redirect('/failure')
        }
    }

    const update = {
        type: req.body.type === doc.type ? doc.type : req.body.type,
        category: req.body.category === doc.category ? doc.category : req.body.category,
        tite: req.body.title === doc.title ? doc.title : req.body.title,
        description: req.body.description === doc.description ? doc.description : req.body.description,
        content: req.body.content === doc.content ? doc.content : req.body.content
    }

    if (req.file) {
        update.image.path = req.file.path
        update.image.filename = req.file.filename
    }

    doc = await DocItem.findByIdAndUpdate(doc._id, update)

    if (doc) {
        res.redirect(`/docs/doc/${doc._id}`)
    } else {
        if (process.env.NODE_ENV === 'development') {
            throw new Error('Could not update resource')
        } else {
            res.redirect('/failure')
        }
    }
}

export const filterDocs = async (req, res, next) => {
    const arr = []

    if (req.query.type) {
        arr.push({ type: req.query.type.replace('_', ' ') })
        // query.where('type').equals(`${req.query.type.replace('_', ' ')}`)
    }

    if (req.query.category) {
        arr.push({ category: req.query.category.replace('_', ' ') })
        // query.where('category').equals(`${req.query.category.replace('_', ' ')}`)
    }

    if (req.query.description) {
        arr.push({ description: { $regex: new RegExp(req.query.description.replace('_', ' '), 'i') } })
        // query.where('description').in(`${req.query.description.replace('_', ' ')}`)
    }

    if (req.query.title) {
        arr.push({ title: { $regex: new RegExp(req.query.title.replace('_', ' '), 'i') } })
        // query.where('title').in(`${req.query.title.replace('_', ' ')}`)
    }

    if (req.query.content) {
        arr.push({ content: { $regex: new RegExp(req.query.content.replace('_', ' '), 'i') } })
        // query.where('content').in(`${req.query.content.replace('_', ' ')}`)
    }

    let inputValue

    if (req.query.description || req.query.content || req.query.title) {
        inputValue = req.query.description || req.query.content || req.query.title
    }

    let docs

    if (arr.length === 0) {
        docs = []
        return res.send(docsIndexPage({ docs: { docs, isFiltered: true, inputValue } }))
    }

    docs = await DocItem.find({}).or(arr).populate({ path: 'author' })

    res.send(docsIndexPage({ docs: { docs, isFiltered: true, inputValue } }, req))
}