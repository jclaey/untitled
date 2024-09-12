import crypto from 'node:crypto'

export const encryptStringData = (str, key) => {
    const iv = crypto.randomBytes(16)
    const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key, 'hex'), iv)
    let encrypted = cipher.update(str, 'utf-8', 'hex')
    encrypted += cipher.final('hex')

    return { encryptedData: encrypted, iv: iv.toString('hex') }
}

export const decryptStringData = (str, key, iv) => {
    const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key, 'hex'), Buffer.from(iv, 'hex'))
    let decrypted = decipher.update(str, 'hex', 'utf-8')
    decrypted += decipher.final('utf-8')

    return decrypted
}