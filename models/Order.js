import mongoose from "mongoose"
const Schema = mongoose.Schema

const OrderSchema = new Schema({
    orderItems: [
        {
            qty: {
                type: Number,
                required: true
            },
            product: {
                type: Schema.Types.ObjectId,
                required: true,
                ref: "Product"
            }
        }
    ],
    shippingAddress: {
        streetAddressOne: {
            type: String,
            required: true
        },
        streetAddressTwo: String,
        city: {
            type: String,
            required: true
        },
        postalCode: {
            type: String,
            required: true
        },
        country: {
            type: String,
            required: true
        }
    },
    paymentMethod: {
        type: String,
        required: true
    },
    paymentResult: {
        id: String,
        status: String,
        updateTime: String,
        emailAddress: String
    },
    itemsPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    shippingPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    totalPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    isPaid: {
        type: Boolean,
        required: true,
        default: false
    },
    paidAt: Date,
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const Order = mongoose.model('Order', OrderSchema)

export default Order