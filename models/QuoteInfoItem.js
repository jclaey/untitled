import mongoose from 'mongoose'
const Schema = mongoose.Schema

const QuoteInfoItemSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    businessName: {
        type: String,
        required: true
    },
    businessAddress: {
        streetAddressOne: {
            type: String,
            required: true
        },
        streetAddressTwo: {
            type: String,
            required: false
        },
        city: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        zipcode: {
            type: String,
            required: true
        }
    },
    phoneNumber: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    projectType: {
        type: String,
        required: true
    },
    projectDetails: {
        type: String,
        required: true
    },
    budget: {
        type: Number,
        required: true
    },
    submitted_at: {
        type: Date,
        default: Date.now()
    }
})

const QuoteInfoItem = mongoose.model('QuoteInfoItem', QuoteInfoItemSchema)

export default QuoteInfoItem