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
                        <section id="billing-info-section" class="column is-two-thirds">
                            <h3 class="is-size-3 mb-3">Billing Address</h3>
                            <div class="field mb-4">
                                <label for="streetAddressOne" class="label">
                                    Street Address One*
                                </label>
                                <div class="control">
                                    <input class="input" type="text" id="streetAddressOne" name="streetAddressOne" />
                                </div>
                            </div>
                            <div class="field mb-4">
                                <label for="streetAddressTwo" class="label">
                                    Street Address Two
                                </label>
                                <div class="control">
                                    <input class="input" type="text" id="streetAddressTwo" name="streetAddressTwo" />
                                </div>
                            </div>
                            <div class="field mb-4">
                                <label for="city" class="label">
                                    City*
                                </label>
                                <div class="control">
                                    <input class="input" type="text" id="city" name="city" />
                                </div>
                            </div>
                            <div class="field mb-4">
                                <label for="postalCode" class="label">
                                    Zip Code*
                                </label>
                                <div class="control">
                                    <input class="input" type="text" id="postalCode" name="postalCode" />
                                </div>
                            </div>
                            <div class="field mb-4">
                                <label for="state" class="label">
                                    State*
                                </label>
                                <div class="control">
                                    <div class="select">
                                        <select id="state" name="state">
                                            <option>Alabama</option>
                                            <option>Alaska</option>
                                            <option>Arizona</option>
                                            <option>Arkansas</option>
                                            <option>California</option>
                                            <option>Colorado</option>
                                            <option>Connecticut</option>
                                            <option>Delaware</option>
                                            <option>Florida</option>
                                            <option>Georgia</option>
                                            <option>Hawaii</option>
                                            <option>Idaho</option>
                                            <option>Illinois</option>
                                            <option>Indiana</option>
                                            <option>Iowa</option>
                                            <option>Kansas</option>
                                            <option>Kentucky</option>
                                            <option>Louisiana</option>
                                            <option>Maine</option>
                                            <option>Maryland</option>
                                            <option>Massachusetts</option>
                                            <option>Michigan</option>
                                            <option>Minnesota</option>
                                            <option>Mississippi</option>
                                            <option>Missouri</option>
                                            <option>Montana</option>
                                            <option>Nebraska</option>
                                            <option>Nevada</option>
                                            <option>New Hampshire</option>
                                            <option>New Jersey</option>
                                            <option>New Mexico</option>
                                            <option>New York</option>
                                            <option>North Carolina</option>
                                            <option>North Dakota</option>
                                            <option>Ohio</option>
                                            <option>Oklahoma</option>
                                            <option>Oregon</option>
                                            <option>Pennsylvania</option>
                                            <option>Rhode Island</option>
                                            <option>South Carolina</option>
                                            <option>South Dakota</option>
                                            <option>Tennessee</option>
                                            <option>Texas</option>
                                            <option>Utah</option>
                                            <option>Vermont</option>
                                            <option>Virginia</option>
                                            <option>Washington</option>
                                            <option>West Virginia</option>
                                            <option>Wisconsin</option>
                                            <option>Wyoming</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </section>
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
                    <div class="columns">
                        <section class="column is-two-thirds" id="shipping-info-section">
                            <div class="field mb-4">
                                <label class="checkbox" for="shipping-checkbox">
                                    <input type="checkbox" id="shipping-checkbox" />
                                    Shipping address is the same as billing address
                                </label>
                            </div>
                            <div id="shipping-info">
                                <h3 class="is-size-3 mb-3">Shipping Address</h3>
                                <div class="field mb-4">
                                    <label for="shippingAddressOne" class="label">
                                        Street Address One*
                                    </label>
                                    <div class="control">
                                        <input class="input" type="text" id="shippingAddressOne" name="shippingAddressOne" />
                                    </div>
                                </div>
                                <div class="field mb-4">
                                    <label for="shippingAddressTwo" class="label">
                                        Street Address Two
                                    </label>
                                    <div class="control">
                                        <input class="input" type="text" id="shippingAddressTwo" name="shippingAddressTwo" />
                                    </div>
                                </div>
                                <div class="field mb-4">
                                    <label for="shippingCity" class="label">
                                        City*
                                    </label>
                                    <div class="control">
                                        <input class="input" type="text" id="shippingCity" name="shippingCity" />
                                    </div>
                                </div>
                                <div class="field mb-4">
                                    <label for="shippingPostalCode" class="label">
                                        Zip Code*
                                    </label>
                                    <div class="control">
                                        <input class="input" type="text" id="shippingPostalCode" name="shippingPostalCode" />
                                    </div>
                                </div>
                                <div class="field mb-4">
                                    <label for="shippingState" class="label">
                                        State*
                                    </label>
                                    <div class="control">
                                        <div class="select">
                                            <select id="shippingState" name="shippingState">
                                                <option>Alabama</option>
                                                <option>Alaska</option>
                                                <option>Arizona</option>
                                                <option>Arkansas</option>
                                                <option>California</option>
                                                <option>Colorado</option>
                                                <option>Connecticut</option>
                                                <option>Delaware</option>
                                                <option>Florida</option>
                                                <option>Georgia</option>
                                                <option>Hawaii</option>
                                                <option>Idaho</option>
                                                <option>Illinois</option>
                                                <option>Indiana</option>
                                                <option>Iowa</option>
                                                <option>Kansas</option>
                                                <option>Kentucky</option>
                                                <option>Louisiana</option>
                                                <option>Maine</option>
                                                <option>Maryland</option>
                                                <option>Massachusetts</option>
                                                <option>Michigan</option>
                                                <option>Minnesota</option>
                                                <option>Mississippi</option>
                                                <option>Missouri</option>
                                                <option>Montana</option>
                                                <option>Nebraska</option>
                                                <option>Nevada</option>
                                                <option>New Hampshire</option>
                                                <option>New Jersey</option>
                                                <option>New Mexico</option>
                                                <option>New York</option>
                                                <option>North Carolina</option>
                                                <option>North Dakota</option>
                                                <option>Ohio</option>
                                                <option>Oklahoma</option>
                                                <option>Oregon</option>
                                                <option>Pennsylvania</option>
                                                <option>Rhode Island</option>
                                                <option>South Carolina</option>
                                                <option>South Dakota</option>
                                                <option>Tennessee</option>
                                                <option>Texas</option>
                                                <option>Utah</option>
                                                <option>Vermont</option>
                                                <option>Virginia</option>
                                                <option>Washington</option>
                                                <option>West Virginia</option>
                                                <option>Wisconsin</option>
                                                <option>Wyoming</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                    <div class="columns">
                        <div class="column is-two-thirds">
                            <div class="mb-4">
                                <h4 class="is-size-4 mb-3">Payment Type</h4>
                                <div class="control mb-5">
                                    <label class="label" for="cardPayRadio">
                                        <input type="radio" name="paymentType" id="cardPayRadio" checked />
                                        Credit/Debit
                                        <i class="fa-solid fa-credit-card"></i>
                                    </label>
                                    <label class="label" for="paypalPayRadio">
                                        <input type="radio" name="paymentType" id="paypalPayRadio" disabled />
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
                    </div>
                </form>
            </div>
        </main>    
    ` }, req)
}

export default userCheckoutPage