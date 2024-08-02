import Stripe from 'stripe'
import Order from '../models/Order.js'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export const handlePaymentIntentSucceeded = async (paymentIntent, user, req) => {
    let orderItems = []
    let amount = 0
    let needsShipping = false

    user.cart.forEach(item => {
        if (item.type.toLowerCase() === 'physical') {
            needsShipping = true
        }

        if (orderItems.find(el => el._id === item._id) !== undefined) {
            item.qty += 1
            amount += item.price
        } else {
            orderItems.push(item)
            amount += item.price
        }
    })

    // Order creation
    const order = new Order({
        orderItems,
        billingAddress: {
            streetAddressOne: req.body.streetAddressOne,
            streetAddressTwo: req.body.streetAddressTwo ? req.body.streetAddressTwo : '',
            city: req.body.city,
            state: req.body.state,
            postalCode: req.body.postalCode,
            country: req.body.country ? req.body.country : ''
        },
        paymentMethod: req.body.paymentType,
        subtotalPrice: amount,
        // change shipping price
        shippingPrice: req.body.shippingPrice ? req.body.shippingPrice : 0,
        // change total price calculation
        totalPrice: req.body.totalPrice ? req.body.totalPrice : 0,
        // change isPaid calculation
        isPaid: true
    })

    if (order) {
        await order.save()

        // Empty purchasing customer's cart
        // user.cart = []

        res.redirect('/')
    } else {
        // Change this
        console.log('This did not work')
    }
}