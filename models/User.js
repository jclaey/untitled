import mongoose from "mongoose"
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
    createdAt: {
        type: Date,
        default: Date.now
    }
})

UserSchema.methods.comparePasswords = function(suppliedPassword) {
    const [hashed, salt] = this.password.split('.')
  
    const hashedSupplied = crypto.createHash('sha256').update(suppliedPassword + salt).digest('hex')
  
    return hashedSupplied === hashed
}

const User = mongoose.model('User', UserSchema)

export default User