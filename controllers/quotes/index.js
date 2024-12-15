import { validationResult } from 'express-validator'
import nodemailer from 'nodemailer'
import { google } from 'googleapis'
import newQuotePage from '../../views/quotes/index.js'
import successQuotePage from '../../views/success-quote.js'
import QuoteInfoItem from '../../models/QuoteInfoItem.js'
import { decryptStringData } from '../../utils/encrypt.js'
import User from '../../models/User.js'

const key = process.env.ENCRYPTION_KEY

const gmailClientId = process.env.GMAIL_CLIENT_ID
const gmailClientSecret = process.env.GMAIL_CLIENT_SECRET
const gmailRefreshToken = process.env.GMAIL_REFRESH_TOKEN
const gmailRedirectUri = 'http://localhost:3000/verify-email-page'

export const getNewQuote = (req, res, next) => {
    res.send(newQuotePage({}, req))
}

export const postNewQuote = async (req, res, next) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.send(newQuotePage({ errors, values: req.body }, req))
    }

    const quote = new QuoteInfoItem({
        user: decryptStringData(req.session.userId, key, req.session.userIv),
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
        budget: req.body.budget,
        dueDate: req.body.dueDate
    })

    if (quote) {
        await quote.save()

        let userId = decryptStringData(req.session.userId, key, req.session.userIv)
        const user = await User.findById(userId)
        const userEmail = decryptStringData(user.emailEncrypted.encryptedData, key, user.emailEncrypted.iv)

        const oAuth2Client = new google.auth.OAuth2(gmailClientId, gmailClientSecret, gmailRedirectUri)
        oAuth2Client.setCredentials({ refresh_token: gmailRefreshToken })
        const accessToken = await oAuth2Client.getAccessToken()

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: `${process.env.GMAIL_EMAIL}`,
                clientId: gmailClientId,
                clientSecret: gmailClientSecret,
                refreshToken: gmailRefreshToken,
                accessToken: accessToken.token
            }
        })

        const info = await transporter.sendMail({
            from: `"Web Solutions" <${process.env.OUTLOOK_EMAIL}>`,
            to: `${process.env.OUTLOOK_EMAIL}`,
            subject: 'Quote Requested',
            text: `From: Web Solutions by HandierMe, Subject: Quote Requested`,
            html: Buffer.from(`
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Quote Requested</title>
                </head>
                <body>
                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                        <tr>
                            <td align="center">
                                <table width="600" cellpadding="0" cellspacing="0" border="0">
                                    <tr>
                                        <td>
                                            <h1 style="font-size: 48px;">Quote Requested</h1>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <h3 style="font-size: 28px;">From: <strong>${req.body.email}</strong></h3>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <h3 style="font-size: 28px;">Subject: <strong>Quote Requested</strong></h3>
                                            <p style="font-size: 28px;">
                                                <strong>
                                                    You are receiving this because user ${req.body.firstName} ${req.body.lastName} has requested a quote from Web Solutions.
                                                </strong>
                                            </p>
                                            <div style="font-size: 28px;">
                                                <strong>Business name: ${req.body.businessName}</strong><br />
                                                <strong>Business Address:</strong><br />
                                                <strong>${req.body.streetAddressOne}</strong><br />
                                                ${req.body.streetAddressTwo ? `, <strong>${req.body.streetAddressTwo}</strong><br />` : ''}
                                                <strong>${req.body.postalCode}, ${req.body.city}, ${req.body.state}</strong><br />
                                                <strong>Phone number: ${req.body.phoneNumber}</strong><br />
                                                <strong>Stated Email: ${req.body.email}</strong><br />
                                                <strong>Project type: ${req.body.projectType}</strong><br />
                                                <strong>Project details: ${req.body.projectDetails}</strong><br />
                                                <strong>Budget: $${req.body.budget}</strong><br />
                                                <strong>Due date: ${req.body.dueDate}</strong><br />
                                                <strong>User Email: ${userEmail}</strong><br />
                                                <strong>User Id: ${userId}</strong>
                                                <p>
                                                    Please click the button below to create a project for this quote<br />
                                                    <a href="https://d5d9-173-175-236-109.ngrok-free.app/admin/projects/new/${quote._id}/-/${req.session.userId}">Create Project</a>
                                                </p>
                                            </div>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                </body>
                </html>
            `, 'utf-8')
        })

        if (info) {
            res.send(successQuotePage(req))
        } else {
            if (process.env.NODE_ENV === 'development') {
                throw new Error('Could not send email')
            } else {
                res.redirect('/failure')
            }
        }
    } else {
        if (process.env.NODE_ENV === 'development') {
            throw new Error('Info could not be submitted successfully')
        } else {
            res.redirect('/failure')
        }
    }
}