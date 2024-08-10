import Stripe from 'stripe'
import Order from '../models/Order.js'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export const handlePaymentIntentSucceeded = async (paymentIntent, user, order, req) => {
    console.log('From handleStripeEvents.js in utils')
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

    // Do something here
}