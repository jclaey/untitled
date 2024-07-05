import 'dotenv/config'
import { validationResult } from 'express-validator'
import docsIndexPage from "../../views/docs/index.js"
import newDocPage from "../../views/docs/new.js"
import showDocPage from '../../views/docs/show.js'
import docsEditPage from '../../views/docs/edit.js'
import DocItem from "../../models/Doc.js"

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
        return res.send(newDocPage({ errors, values: req.body }, req))
    }

    const doc = new DocItem({
        type: req.body.type,
        category: req.body.category,
        title: req.body.title,
        author: req.session.userId,
        description: req.body.description,
        content: req.body.content,
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
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.send(newDocPage({ errors, values: req.body }, req))
    }
    
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