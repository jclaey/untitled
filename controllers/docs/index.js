import 'dotenv/config'
import { validationResult } from 'express-validator'
import indexPage from "../../views/docs/index.js"
import newDocPage from "../../views/docs/new.js"
import DocItem from "../../models/Doc.js"

export const getIndex = (req, res, next) => {
    res.send(indexPage())
}

export const getNew = (req, res, next) => {
    res.send(newDocPage({}, req))
}

export const postNew = async (req, res, next) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.send(newDocPage({ errors, values: req.body }))
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