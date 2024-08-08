import layout from "../../views/layout.js"

const userCheckoutPage = ({ cart, errors, values = {} }, req) => {
    const renderedItems = cart.cartItems.map(item => {
        return `
            <div class="box">
                <h4>${item.title}</h4>
                <p>
                    Price: $${parseFloat(item.price, 2)}
                </p>
            </div>
        `
    })

    return layout({ template: `
        <main class="container">
            <div class="mb-6 page-title-div">
                <h1 class="title is-size-1">
                    <span class="pipe">|</span> Finalize Purchase <span class="pipe">|</span>
                </h1>
            </div>
            <div>
                ${errors ? 
                    `
                        <div>
                            <div>
                                ${getErrors(errors)}
                            </div>
                        </div>
                    `
                : ''}
            </div>
            <div>
                <form action="/users/stripe/events" method="POST" id="payment-form">
                    <div class="columns">
                        <div class="column is-two-thirds">
                            <div class="mb-4">
                                <h4 class="is-size-4 mb-3">Payment Type</h4>
                                <div class="control mb-5">
                                    <label class="label" for="cardPayRadio">
                                        <input type="radio" id="cardPayRadio" checked />
                                        Credit/Debit
                                        <i class="fa-solid fa-credit-card"></i>
                                    </label>
                                    <label class="label" for="paypalPayRadio">
                                        <input type="radio" id="paypalPayRadio" disabled />
                                        Paypal
                                        <i class="fa-brands fa-paypal"></i>
                                    </label>
                                </div>
                            </div>
                            <div class="mb-5 box">
                                <h4 class="is-size-4 mb-3">Enter Payment Details</h4>
                                <div id="payment-element" class="mb-3"></div>
                                <div id="payment-message" class="hidden"></div>
                            </div>
                            <button id="submit" type="submit" class="button mb-3 is-medium is-success">
                                <div class="spinner hidden" id="spinner"></div>
                                <span id="button-text">Pay now</span>
                            </button>
                        </div>
                        <section id="checkout-items-section" class="column is-one-third">
                            <div class="card">
                                <div class="card-content">
                                    <div class="content">
                                        ${renderedItems}
                                        <div>
                                            Subtotal: $${cart.subtotal}
                                            Total: $...
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </form>
            </div>
        </main>    
    ` }, req)
}

export default userCheckoutPage