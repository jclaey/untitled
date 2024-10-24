import mongoose from "mongoose"
const Schema = mongoose.Schema

const OrderSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    orderItems: [
        {
            qty: {
                type: Number,
                required: true,
                default: 1
            },
            product: {
                type: Schema.Types.ObjectId,
                required: true,
                ref: "Product"
            }
        }
    ],
    shippingAddress: {
        streetAddressOne: String,
        streetAddressTwo: String,
        city: String,
        postalCode: String,
        state: String,
        country: String
    },
    billingAddress: {
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
        state: {
            type: String,
            required: true
        },
        country: String
    },
    paymentMethod: {
        type: String
    },
    paymentResult: {
        id: String,
        status: String,
        updateTime: String,
        emailAddress: String
    },
    orderNumber: String,
    subtotalPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    shippingPrice: Number,
    taxRate: Number,
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