const stripe = Stripe('pk_test_51Pf8ZDCEsobBrNvVGFwJ9IkP6sMVuVLZzXF0gCqKirbqlKMVAA9gvt9lHlU9UsoPVYT2UkE8bLqCFCyOmGhAZDJi00SZXl6Yk8')

let elements

const getCartItems = async () => {
    const response = await fetch('/users/user/getCartItems')

    if (response) {
        const data = await response.json()

        return data
    }
}

const initialize = async () => {
    const data = await getCartItems()

    if (data && data.client_secret) {
        const appearance = { theme: 'stripe' }
        const options = { layout: 'tabs' }
        elements = stripe.elements({ clientSecret: data.client_secret, appearance })
        const paymentElement = elements.create('payment', options)
        paymentElement.mount('#payment-element')
    } else {
        console.error('No data found')
    }
}   

const checkStatus = async () => {
    const clientSecret = new URLSearchParams(window.location.search).get(
        "payment_intent_client_secret"
    )
    
    if (!clientSecret) {
        return
    }
    
    const { paymentIntent } = await stripe.retrievePaymentIntent(clientSecret)

    console.log(paymentIntent)
    
    switch (paymentIntent.status) {
        case "succeeded":
            showMessage("Payment succeeded!")
            break
        case "processing":
            showMessage("Your payment is processing.")
            break
        case "requires_payment_method":
            showMessage("Your payment was not successful, please try again.")
            break;
        default:
            showMessage("Something went wrong.")
            break
      }
}

// ------- UI helpers -------

function showMessage(messageText) {
    const messageContainer = document.querySelector("#payment-message");
  
    messageContainer.classList.remove("hidden");
    messageContainer.textContent = messageText;
  
    setTimeout(function () {
      messageContainer.classList.add("hidden");
      messageContainer.textContent = "";
    }, 4000);
}
  
// Show a spinner on payment submission
function setLoading(isLoading) {
    if (isLoading) {
      // Disable the button and show a spinner
      document.querySelector("#submit").disabled = true;
      document.querySelector("#spinner").classList.remove("hidden");
      document.querySelector("#button-text").classList.add("hidden");
    } else {
      document.querySelector("#submit").disabled = false;
      document.querySelector("#spinner").classList.add("hidden");
      document.querySelector("#button-text").classList.remove("hidden");
    }
}

document
  .querySelector("#payment-form")
  .addEventListener("submit", async e => {
        e.preventDefault()
    
        setLoading(true)
    
        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: `https://74a8-173-175-236-109.ngrok-free.app/payment-successful`
            }
        })
    
        if (error.type === "card_error" || error.type === "validation_error") {
            showMessage(error.message)
        } else {
            showMessage("An unexpected error occurred.")
        }
        
        setLoading(false)
  })

initialize()
checkStatus()