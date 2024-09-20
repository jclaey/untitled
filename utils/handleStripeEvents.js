import userCheckoutPage from "../views/users/checkout.js"
import User from "../models/User.js"
import { decryptStringData } from "./encrypt.js"

const key = process.env.ENCRYPTION_KEY

export const handlePaymentIntentSucceeded = async (paymentIntent) => {
    console.log('From handleStripeEvents.js in utils')
    console.log(paymentIntent)

    // Do something here
    
}

export const handlePaymentIntentCanceled = async (paymentIntent) => {
    console.log('From handleStripeEvents.js in utils')
    console.log(paymentIntent)
}

export const handlePaymentIntentFailed = async (paymentIntent, user, req) => {
    console.log(paymentIntent)
    console.log(paymentIntent.last_payment_error)
    // let cartItems
    // let needsShipping
    // let subtotal = 0

    // user.cart.forEach(item => {
    //     cartItems.push({
    //         title: item.product.title,
    //         description: item.product.description,
    //         price: item.product.price
    //     })

    //     if (item.product.type.toLowerCase() === 'physical') {
    //         needsShipping = true
    //     }

    //     subtotal += item.product.price
    // })

    // req.session.error = `Your payment could not go through. Please try a different form of payment or try again later.`
    // res.send(userCheckoutPage({ cart: { cartItems, needsShipping, subtotal } }, req))
}