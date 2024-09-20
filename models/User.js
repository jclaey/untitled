import crypto from 'crypto'
import mongoose from "mongoose"
import { ProductSchema } from "./Product.js"
const Schema = mongoose.Schema

const UserSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    emailEncrypted: {
        encryptedData: {
            type: String,
            required: true
        },
        iv: {
            type: String,
            required: true
        }
    },
    emailHashed: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    address: {
        streetAddressOne: String,
        streetAddressTwo: String,
        city: String,
        postalCode: String,
        country: String
    },
    phoneNumber: {
        type: String,
        required: true
    },
    cart: [
        {
            qty: {
                type: Number,
                required: true,
                default: 1
            },
            product: {
                type: Schema.Types.ObjectId,
                ref: 'Product'
            }
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    mobileVerifyToken: String,
    mobileVerifyTokenExpires: Date,
    mobileVerified: {
        type: String,
        default: false
    }
})

UserSchema.methods.comparePasswords = function(suppliedPassword) {
    const [hashed, salt] = this.password.split('.')
  
    const hashedSupplied = crypto.createHash('sha256').update(suppliedPassword + salt).digest('hex')
  
    return hashedSupplied === hashed
}

const User = mongoose.model('User', UserSchema)

export default User