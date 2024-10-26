import 'dotenv/config'
import { validationResult } from 'express-validator'
import { google } from 'googleapis'
import path from 'path'
import process from 'process'
import { Readable } from 'stream'
import { Product } from '../../models/Product.js'
import newProductPage from '../../views/products/new.js'
import productsIndexPage from '../../views/products/index.js'
import productsShowPage from '../../views/products/show.js'
import productsEditPage from '../../views/products/edit.js'
import { decryptStringData } from '../../utils/encrypt.js'

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
        if (req.file) {
            req.body.file = req.file
        }
        
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
        user: req.session.adminId,
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
    const isSignedIn = req.adminId && req.adminId === process.env.ADMIN_ID ? true : false
    let product = await Product.findById(req.params.id).populate('user').exec()

    if (product) {
        product = {
            id: product._id,
            title: product.title,
            imageId: product.imageId,
            description: product.description,
            price: product.price,
            countInStock: product.countInStock,
            user: { id: product.user._id }
        }

        res.send(productsShowPage({ product }, req))
    } else {
        if (process.env.NODE_ENV === 'development') {
            throw new Error('Product not found')
        } else {
            res.redirect('/failure')
        }
    }
}

export const getEdit = async (req, res, next) => {
    const product = await Product.findById(req.params.id)

    if (product) {
        res.send(productsEditPage({ product }, req))
    } else {
        if (process.env.NODE_ENV === 'developemtn') {
            throw new Error('Product not found')
        } else {
            res.redirect('/failure')
        }
    }
}

export const patchEdit = async (req, res, next) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        res.send(productsEditPage({ errors, values: req.body }, req))
    }

    let product = await Product.findById(req.params.id)
    let update = {}

    if (!product) {
        if (process.env.NODE_ENV === 'development') {
            throw new Error('Product not found')
        } else {
            res.redirect('/failure')
        }
    }

    if (req.files) {
        if (req.files['image']) {
            const deleteImageResponse = await drive.files.update({
                fileId: product.imageId,
                requestBody: {
                    trashed: true
                }
            })
    
            if (deleteImageResponse) {
                const newProductImage = await drive.files.create({
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

                update.imageId = newProductImage.data.id
            }
        }

        if (req.files['product']) {
            const listFiles = await drive.files.list({
                q: `name contains '${product._id}'`
            })

            const deleteProductResponse = await drive.files.update({
                fileId: listFiles.data.files[0].id,
                requestBody: {
                    trashed: true
                }
            })

            if (deleteProductResponse) {
                const prodExtIndex = req.files['product'][0].originalname.indexOf('.')

                const newProduct = await drive.files.create({
                    resource: {
                        name: `${req.files['product'][0].originalname.slice(0, prodExtIndex)}-${product._id}.zip`,
                        parents: [productsFolderId]
                    },
                    media: {
                        mimeType: 'application/zip',
                        body: Readable.from(req.files['product'][0].buffer)
                    },
                    fields: 'id'
                })

                if (!newProduct) {
                    if (process.env.NODE_ENV === 'development') {
                        throw new Error('Could not create new product')
                    } else {
                        res.redirect('/failure')
                    }
                }
            } else {
                if (process.env.NODE_ENV === 'development') {
                    throw new Error('Could not delete existing product')
                } else {
                    res.redirect('/failure')
                }
            }
        }

        update.title = req.body.title === product.title ? product.title : req.body.title
        update.type = req.body.type === product.type ? product.type : req.body.type
        update.description = req.body.description === product.description ? product.description : req.body.description
        update.price = req.body.price === product.price ? product.price : req.body.price
        update.countInStock = req.body.countInStock === product.countInStock ? product.countInStock : req.body.countInStock

        product = await Product.findByIdAndUpdate(product._id, update)

        if (product) {
            res.redirect(`/products/product/${product._id}`)
        } else {
            if (process.env.NODE_ENV === 'development') {
                throw new Error('Could not update product')
            } else {
                res.redirect('/failure')
            }
        }
    } else {
        update = {
                title: req.body.title === product.title ? product.title : req.body.title,
                type: req.body.type === product.type ? product.type : req.body.type,
                description: req.body.description === product.description ? product.description : req.body.description,
                price: req.body.price === product.price ? product.price : req.body.price,
                countInStock: req.body.countInStock === product.countInStock ? product.countInStock : req.body.countInStock
            }

        product = await Product.findByIdAndUpdate(product._id, update)

        if (product) {
            res.redirect(`/products/product/${product._id}`)
        } else {
            if (process.env.NODE_ENV === 'development') {
                throw new Error('Could not update product')
            } else {
                res.redirect('/failure')
            }
        }
    }
}