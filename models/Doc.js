import mongoose from 'mongoose'
const Schema = mongoose.Schema

const DocSchema = new Schema({
    type: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'Admin',
    },
    description: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    image: {
        path: String,
        filename: String
    },
    created_at: {
        type: Date,
        default: Date.now
    }
})

const DocItem = mongoose.model('Doc', DocSchema)

export default DocItem