import 'dotenv/config'
import { validationResult } from 'express-validator'
import { google } from 'googleapis'
import path from 'path'
import process from 'process'
import fs from 'fs'
import { Readable } from 'stream'
import Product from '../../models/Product.js'
import newProductPage from '../../views/products/new.js'
import productsIndexPage from '../../views/products/index.js'

const TOKEN_PATH = path.join(process.cwd(), 'token.json')
const CREDENTIALS_PATH = path.join(process.cwd(), 'credentials.json')

export const getIndex = async (req, res, next) => {
    const products = await Product.find({})

    res.send(productsIndexPage({ products }, req))
}

export const getNew = (req, res, next) => {
    res.send(newProductPage({}, req))
}

export const postNew = async (req, res, next) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.send(newProductPage({ errors, values: req.body }, req))
    }

    const product = new Product({
        title: req.body.title,
        image: {
            path: req.files['image'][0].path,
            filename: req.files['image'][0].filename
        },
        type: req.body.type,
        description: req.body.description,
        price: req.body.price,
        countInStock: req.body.countInStock
    })

    if (product) {
        const auth = new google.auth.GoogleAuth({
            keyFile: CREDENTIALS_PATH,
            scopes: ['https://www.googleapis.com/auth/drive']
        })

        const drive = google.drive({ version: 'v3', auth })

        // Create a folder for the file to live in
        // const folderMetadata = {
        //     name: `${product.title.toLowerCase().replace(/^\s+$/, '_')}-${product._id}`,
        //     mimeType: 'application/vnd.google-apps.folder'
        // }

        // const folder = await drive.files.create({
        //     resource: folderMetadata,
        //     fields: 'id'
        // })

        // Use a pre-created folder
        const folderId = process.env.DRIVE_PRODUCTS_FOLDER_ID

        const productMetadata = {
            name: `${product.title.toLowerCase().replace(/^\s+$/, '_')}-${product._id}.zip`,
            parents: [folderId]
        }

        const media = {
            mimeType: 'application/zip',
            body: Readable.from(req.files['product'][0].buffer)
        }

        const file = await drive.files.create({
            resource: productMetadata,
            media,
            fields: 'id'
        })

        res.redirect('/products')
    } else {
        res.redirect('/failure')
    }
}