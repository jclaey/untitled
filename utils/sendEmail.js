import 'dotenv/config'
import nodemailer from 'nodemailer'

const sendEmail = async (req) => {
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
        html: Buffer.from(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@1.0.0/css/bulma.min.css">
                <title>User Contact Email</title>
            </head>
            <body>
                <table width="100%" cellpadding="0" cellspacing="0" border="0">
                    <tr>
                        <td align="center">
                            <table width="600" cellpadding="0" cellspacing="0" border="0">
                                <tr>
                                    <td>
                                        <h1>A User Has Submitted a Question or Comment</h1>
                                    </td>
                                </tr>
                                <tr>
                                    <td><h3>From: <strong>${req.body.name}</strong></h3></td>
                                </tr>
                                <tr>
                                    <td><h3>Email: <strong>${req.body.email}</strong></h3></td>
                                </tr>
                                <tr>
                                    <td><h3>Subject: <strong>${req.body.subject}</strong></h3></td>
                                </tr>
                                <tr>
                                    <td><h3>Content: <strong>${req.body.content}</strong></h3></td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </body>
            </html>
        `, 'utf-8')
    })

    if (process.env.NODE_ENV === 'development') {
        console.log("Message sent: %s", info.messageId)
    }
}

export default sendEmail