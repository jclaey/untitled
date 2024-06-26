import 'dotenv/config'
import { validationResult } from 'express-validator'
import { google } from 'googleapis'
import path from 'path'
import process from 'process'
import { Readable } from 'stream'
import Product from '../../models/Product.js'
import newProductPage from '../../views/products/new.js'
import productsIndexPage from '../../views/products/index.js'
import productsShowPage from '../../views/products/show.js'

const CREDENTIALS_PATH = path.join(process.cwd(), 'credentials.json')

const auth = new google.auth.GoogleAuth({
    keyFile: CREDENTIALS_PATH,
    scopes: ['https://www.googleapis.com/auth/drive']
})

const drive = google.drive({ version: 'v3', auth })

const productsFolderId = process.env.DRIVE_PRODUCTS_FOLDER_ID
const imagesFolderId = process.env.DRIVE_IMAGES_FOLDER_ID

export const getIndex = async (req, res, next) => {
    const products = await Product.find({})

    if (products) {
        res.send(productsIndexPage({ products }, req))
    } else {
        res.redirect('/failure')
    }
}

export const getNew = (req, res, next) => {
    res.send(newProductPage({}, req))
}

export const postNew = async (req, res, next) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.send(newProductPage({ errors, values: req.body }, req))
    }

    const imageFile = await drive.files.create({
        resource: {
            name: req.files['image'][0].originalname,
            parents: [imagesFolderId]
        },
        media: {
            mimeType: 'application/octet-stream',
            body: Readable.from(req.files['image'][0].buffer)
        },
        fields: 'id'
    })

    const product = new Product({
        title: req.body.title,
        type: req.body.type,
        description: req.body.description,
        price: req.body.price,
        countInStock: req.body.countInStock,
        imageId: `${imageFile.data.id}`
    })

    const prodExtIndex = req.files['product'][0].originalname.indexOf('.')

    const productMetadata = {
        name: `${req.files['product'][0].originalname.slice(0, prodExtIndex)}-${product._id}.zip`,
        parents: [productsFolderId]
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

    if (product) {
        await product.save()
    
        res.redirect('/products')
    } else {
        res.redirect('/failure')
    }
}

export const getShow = async (req, res, next) => {
    const product = await Product.findById(req.params.id)

    if (product) {
        res.send(productsShowPage({ product }, req))
    } else {
        if (process.env.NODE_ENV === 'development') {
            throw new Error('Product not found')
        } else {
            res.redirect('/failure')
        }
    }
}