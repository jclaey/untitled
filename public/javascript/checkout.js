const stripe = Stripe('pk_test_51Pf8ZDCEsobBrNvVGFwJ9IkP6sMVuVLZzXF0gCqKirbqlKMVAA9gvt9lHlU9UsoPVYT2UkE8bLqCFCyOmGhAZDJi00SZXl6Yk8')

const getCartItems = async () => {
    const response = await fetch('/users/user/getCartItems')

    if (response) {
        const data = await response.json()

        return data
    }
}

const mountPaymentElement = async () => {
    const data = await getCartItems()

    if (data && data.client_secret) {
        const appearance = { theme: 'stripe' }
        const options = { layout: 'tabs' }
        const elements = stripe.elements({ clientSecret: data.client_secret, appearance })
        const paymentElement = elements.create('payment', options)
        paymentElement.mount('#payment-element')
    } else {
        console.error('No data found')
    }
}   

mountPaymentElement()