import mongoose from 'mongoose'
const Schema = mongoose.Schema

const ProjectSchema = new Schema({
    quoteInfoItem: {
        type: Schema.Types.ObjectId,
        ref: 'QuoteInfoItem'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
        required: true
    },
    stack: [String],
    updates: [
        {
            id: Schema.Types.ObjectId,
            title: String,
            type: { type: String },
            description: String,
            image: {
                path: String,
                filename: String
            },
            video: {
                path: String,
                filename: String
            },
            version: String,
            isPublished: Boolean,
            updated_at: {
                type: Date,
                default: Date.now()
            }
        }
    ],
    created_at: {
        type: Date,
        default: Date.now
    }
})

const Project = mongoose.model('Project', ProjectSchema)

export default Project