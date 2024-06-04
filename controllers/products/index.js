import 'dotenv/config'
import fs from 'fs/promises'
import path from 'path'
import process from 'process'
import { authenticate } from '@google-cloud/local-auth'
import { google } from 'googleapis'
import { validationResult } from 'express-validator'
import Product from '../../models/Product.js'
import newProductPage from '../../views/products/new.js'
import productsPage from '../../views/products/index.js'

const SCOPES = ['']

export const getNew = (req, res, next) => {
    res.send(newProductPage({}, req))
}

export const postNew = (req, res, next) => {

}

export const getProducts = async (req, res, next) => {
    const products = await Product.find({})

    res.send(productsPage({ products }, req))
}