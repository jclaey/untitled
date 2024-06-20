import mongoose from 'mongoose'
const Schema = mongoose.Schema

const ReviewSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    name: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    comment: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

const ProductSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Admin'
    },
    title: {
        type: String,
        required: true
    },
    imageId: String,
    type: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    reviews: [ReviewSchema],
    rating: {
        type: Number,
        required: true,
        default: 0
    },
    numReviews: {
        type: Number,
        required: true,
        default: 0
    },
    price: {
        type: Number,
        required: true,
        default: 0
    },
    countInStock: {
        type: Number,
        required: true,
        default: 0
    },
    created_at: {
        type: Date,
        default: Date.now
    }
})

const Product = mongoose.model('Product', ProductSchema)

export default Product