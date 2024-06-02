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
        from: `"${req.body.name}" <${process.env.OUTLOOK_EMAIL}>`,
        to: 'contact@handierme.com',
        subject: req.body.subject,
        text: `From: ${req.body.name}, Subject: ${req.body.subject}, Body: ${req.body.content}`,
        html: `<div>
                From: ${req.body.name}, ${req.body.email}<br />${req.body.content}
            </div>`
    })

    if (process.env.NODE_ENV === 'development') {
        console.log("Message sent: %s", info.messageId)
    }
}

export default sendEmail