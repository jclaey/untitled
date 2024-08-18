import { validationResult } from 'express-validator'
import newQuotePage from '../../views/quotes/index.js'
import QuoteInfoItem from '../../models/QuoteInfoItem.js'

export const getNewQuote = (req, res, next) => {
    res.send(newQuotePage({}, req))
}

export const postNewQuote = async (req, res, next) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.send(newQuotePage({ errors, values: req.body }, req))
    }

    const quote = new QuoteInfoItem({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        businessName: req.body.businessName,
        businessAddress: {
            streetAddressOne: req.body.streetAddressOne,
            streetAddressTwo: req.body.streetAddressTwo ? req.body.streetAddressTwo : '',
            city: req.body.city,
            state: req.body.state,
            postalCode: req.body.postalCode
        },
        phoneNumber: req.body.phoneNumber,
        email: req.body.email,
        projectType: req.body.projectType,
        projectDetails: req.body.projectDetails,
        budget: req.body.budget
    })

    if (quote) {
        await quote.save()
        res.redirect('/success-quote')
    } else {
        if (process.env.NODE_ENV === 'development') {
            throw new Error('Info could not be submitted successfully')
        } else {
            res.redirect('/failure')
        }
    }
}