import mongoose from 'mongoose'
const Schema = mongoose.Schema

const DocSchema = new Schema({
    type: String,
    category: String,
    title: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'Admin',
    },
    description: String,
    content: String,
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