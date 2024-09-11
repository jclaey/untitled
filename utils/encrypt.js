import crypto from 'node:crypto'

const algorithm = 'aes256'
const key = process.env.ENCRYPTION_KEY

export const encryptStringData = str => {
    const cipher = crypto.createCipheriv(algorithm, key) + cipher.final('hex')
    const encrypted = cipher.update(str, 'utf-8', 'hex')

    return encrypted
}

export const decryptStringData = str => {
    const decipher = crypto.createDecipheriv(algorithm, key)
    const decrypted = decipher.update(str, 'hex', 'utf-8') + decipher.final('utf-8')

    return decrypted
}