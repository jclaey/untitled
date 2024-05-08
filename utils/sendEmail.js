import 'dotenv/config'
import nodemailer from 'nodemailer'

const sendEmail = async req => {
    const transporter = nodemailer.createTransport({
        host: 'smtp-mail.outlook.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.OUTLOOK_EMAIL,
            pass: process.env.OUTLOOK_PASS
        }
    })

    const info = await transporter.sendMail({
        from: `"${req.body.name}" <jdclaeys@outlook.com>`,
        to: 'contact@handierme.com',
        subject: req.body.subject,
        text: `From: ${req.body.name}, Subject: ${req.body.subject}, Body: ${req.body.content}`,
        html: `<div>
                <p>From: ${req.body.name}, ${req.body.email}</p>
                <p>${req.body.content}</p>
            </div>`
    })

    console.log("Message sent: %s", info.messageId)
}

export default sendEmail