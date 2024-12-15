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
            // Is this right?
            id: mongoose.ObjectId,
            title: String,
            type: String,
            description: String,
            images: [
                {
                    path: String,
                    filename: String
                }
            ],
            videos: [
                {
                    path: String,
                    filename: String
                }
            ],
            version: String,
            isPushed: Boolean
        }
    ],
    created_at: {
        type: Date,
        default: Date.now
    }
})

const Project = mongoose.model('Project', ProjectSchema)

export default Project