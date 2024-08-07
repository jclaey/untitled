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
    email: {
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
    cart: [ProductSchema],
    createdAt: {
        type: Date,
        default: Date.now
    }
})

UserSchema.methods.comparePasswords = function(suppliedPassword) {
    const [hashed, salt] = this.password.split('.')
  
    const hashedSupplied = crypto.createHash('sha256').update(suppliedPassword + salt).digest('hex')

    console.log(hashedSupplied)
    console.log(hashed)
  
    return hashedSupplied === hashed
}

const User = mongoose.model('User', UserSchema)

export default User