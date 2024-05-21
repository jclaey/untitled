import 'dotenv/config'
import { validationResult } from 'express-validator'
import Product from '../../models/Product.js'
import newProductPage from '../../views/products/new.js'
import productsPage from '../../views/products/index.js'

export const getNew = (req, res, next) => {
    res.send(newProductPage({}, req))
}

export const getProducts = async (req, res, next) => {
    const products = await Product.find({})

    res.send(productsPage({ products }))
}