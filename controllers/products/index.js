import 'dotenv/config'
import { validationResult } from 'express-validator'
import newProductPage from '../../views/products/new.js'

export const getNew = (req, res, next) => {
    res.send(newProductPage({}, req))
}