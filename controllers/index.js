import 'dotenv/config'
import { validationResult } from 'express-validator'
import nodemailer from 'nodemailer'
import crypto from 'node:crypto'
import indexPage from "../views/index.js"
import aboutPage from "../views/about.js"
import contactPage from "../views/contact.js"
import successPage from '../views/success.js'
import successQuotePage from '../views/success-quote.js'
import failurePage from "../views/failure.js"
import demoPage from "../views/demos.js"
import paymentSuccessfulPage from '../views/payment-successful.js'
import forgotPasswordPage from '../views/forgot-password.js'
import resetPasswordPage from '../views/reset-password.js'
import sendEmail from "../utils/sendEmail.js"
import User from '../models/User.js'
import Order from '../models/Order.js'

export const getIndex = (req, res, next) => {
    res.send(indexPage(req))
}

export const getAbout = (req, res, next) => {
    res.send(aboutPage(req))
}

export const getContact = (req, res, next) => {
    res.send(contactPage({}, req))
}

export const postContact = async (req, res, next) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.send(contactPage({ errors, values: req.body }, req))
    }

    // Refactor this code
    await sendEmail(req)
    res.send(successPage(req))
}

export const getSuccess = (req, res, next) => {
    res.send(successPage(req))
}

export const getDemo = (req, res, next) => {
    res.send(demoPage(req))
}

export const getFailure = (req, res, next) => {
    res.send(failurePage(req))
}

export const getPaymentSuccessful = async (req, res, next) => {
    const user = await User.findById(req.session.userId)

    if (user) {
        const orderNumber = await crypto.randomBytes(10).toString('hex')
        const order = await Order.findOneAndUpdate({ user: user._id }, { orderNumber, isPaid: true, paidAt: Date.now() })

        if (order) {
            await order.save()
            res.send(paymentSuccessfulPage(req))
        } else {
            if (process.env.NODE_ENV === 'development') {
                throw new Error('Order not found')
            } else {
                res.redirect('/failure')
            }
        }
    } else {
        if (process.env.NODE_ENV === 'development') {
            throw new Error('User not found')
        } else {
            res.redirect('/failure')
        }
    }
}

export const getForgotPassword = (req, res, next) => {
    res.send(forgotPasswordPage({}, req))
}

export const patchForgotPassword = async (req, res, next) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.send(forgotPasswordPage({ errors, values: req.body }, req))
    }

    const token = await crypto.randomBytes(20).toString('hex')

    if (!token) {
        if (process.env.NODE_ENV === 'development') {
            throw new Error('Could not create token')
        } else {
            res.redirect('/failure')
        }
    }

    const { email } = req.body

    const user = await User.findOne({ email })

    if (user) {
        user.resetPasswordToken = token
        user.resetPasswordExpires = Date.now() + 3600000
        await user.save()

        const transporter = nodemailer.createTransport({
            host: 'smtp-mail.outlook.com',
            port: 587,
            secure: false,
            auth: {
                user: process.env.OUTLOOK_EMAIL,
                pass: process.env.OUTLOOK_PASS
            }
        })

        const resetUrl = `http://${req.headers.host}/reset-password/${token}`
        const content = ``

        const info = await transporter.sendMail({
            from: `"Web Solutions by HandierMe" <${process.env.OUTLOOK_EMAIL}>`,
            to: `${email}`,
            subject: 'Reset Password',
            text: `From: Web Solutions by HandierMe, Subject: Reset Password, Body: ${content}`,
            html: Buffer.from(`
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@1.0.0/css/bulma.min.css">
                    <title>Reset Password Email</title>
                </head>
                <body>
                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                        <tr>
                            <td align="center">
                                <table width="600" cellpadding="0" cellspacing="0" border="0">
                                    <tr>
                                        <td>
                                            <h1 style="font-size: 48px;">Reset Password</h1>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <h3 style="font-size: 28px;">From: <strong>Web Solutions by HandierMe</strong></h3>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <h3 style="font-size: 28px;">Subject: <strong>Reset Password</strong></h3>
                                            <p style="font-size: 28px;">
                                                <strong>
                                                    You are receiving this because you (or someone else) have requested the reset of the password for your account with Web Solutions.
                                                </strong>
                                            </p>
                                            <p style="font-size: 28px;">
                                                <strong>
                                                    Please click on the following link to reset your password: <br />
                                                    ${resetUrl}
                                                </strong>
                                            </p>
                                            <p style="font-size: 28px;">
                                                <strong>
                                                    If you did not request to reset your password, please ignore this email.
                                                </strong>
                                            </p>
                                            <p style="font-size: 28px;">
                                                <strong>
                                                    Regards, <br />
                                                    Web Solutions by HandierMe
                                                </strong>
                                            </p>
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
            if (process.env.NODE_ENV === 'development') {
                console.log("Message sent: %s", info.messageId)
                res.redirect('/success')
            } else {
                res.redirect('/success')
            }
        } else {
            if (process.env.NODE_ENV === 'development') {
                throw new Error('Message sending failed')
            } else {
                res.redirect('/failure')
            }
        }
    } else {
        if (process.env.NODE_ENV === 'development') {
            throw new Error('Could not find user')
        } else {
            res.redirect('/failure')
        }
    }
}

export const getResetPassword = async (req, res, next) => {
    const { token } = req.params

    const user = await User.findOne({
        resetPasswordToken: token,
        resetPasswordExpires: { $gt: Date.now() }
    })

    if (!user) {
        req.session.error = 'Password reset token is invalid or has expired'
        res.redirect('/forgot-password')
    }

    res.send(resetPasswordPage({ token }, req))
}

export const patchResetPassword = async (req, res, next) => {
    const { token } = req.params
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        res.send(resetPasswordPage({ token, errors }, req))
    }

    const user = await User.findOne({
        resetPasswordToken: token,
        resetPasswordExpires: { $gt: Date.now() }
    })

    if (user) {
        const { password, confirmPassword } = req.body

        if (password === confirmPassword) {
            const salt = crypto.randomBytes(8).toString('hex')
            const hashedPassword = crypto.createHash('sha256').update(req.body.password + salt).digest('hex')

            const newPassword = `${hashedPassword}.${salt}`

            user.password = newPassword
            user.resetPasswordToken = null
            user.resetPasswordExpires = null

            await user.save()

            req.session.userId = String(user._id)

            res.redirect(`/users/user/${user._id}/profile`)
        } else {
            req.session.error = 'Passwords do not match'
            res.redirect(`/reset-password/${token}`)
        }
    } else {
        req.session.error = 'Password reset token is invalid or has expired';
        res.redirect('/forgot-password');
    }
}

export const getSuccessQuote = (req, res, next) => {
    res.send(successQuotePage({}, req))
}

export const getStaySignedIn = (req, res, next) => {
    console.log(req.session)
    if (req.session.userId) {
        req.session.userId = req.session.userId
        req.session.expiration = Date.now() + 10800000
    }

    if (req.session.adminId) {
        req.session.adminId = req.session.adminId
        req.session.expiration = Date.now() + 10800000
    }
    console.log(req.session)
}