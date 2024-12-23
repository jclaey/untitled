import layout from "../layout.js"
import { getErrors } from "../../utils/getErrors.js"
import { decryptStringData } from "../../utils/encrypt.js"

const userBillingShippingPage = ({ cart, errors, values = {}, order }, req) => {
    console.log(errors)
    const key = process.env.ENCRYPTION_KEY

    const renderedItems = cart.cartItems.map(item => {
        return `
            <div class="box">
                <h4>${item.product.title}</h4>
                <p>
                    Price: $${item.product.price}
                </p>
            </div>
        `
    })

    let userId = decryptStringData(req.session.userId, key, req.session.userIv)

    return layout({ template: `
            <main class="container">
                <nav class="breadcrumb" aria-label="breadcrumbs">
                    <ul>
                        <li><a href="/users/user/${userId}/cart">Cart</a></li>
                        <li class="is-active"><a href="/users/user/billingShipping" aria-current="page">Billing and Shipping</a></li>
                    </ul>
                </nav>
                <section>
                    <div class="page-title-div">
                        <h1 class="title is-size-1">
                            ${cart.needsShipping ? `
                                <span class="pipe">|</span> Billing and Shipping Info <span class="pipe">|</span>
                            ` : `
                                <span class="pipe">|</span> Billing Info <span class="pipe">|</span>
                            `}
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
                </section>
                <section id="billing-shipping-section">
                    <form action="/users/user/billing-shipping" method="POST">
                        <div class="columns">
                            <section id="billing-info-section" class="column box is-two-thirds">
                                <h3 class="is-size-3 mb-3">Billing Address</h3>
                                <div class="field mb-4">
                                    <label for="streetAddressOne" class="label">
                                        Street Address One*
                                    </label>
                                    <div class="control">
                                        <input class="input" type="text" id="streetAddressOne" name="streetAddressOne" value="${errors && values.streetAddressOne && values.streetAddressOne !== '' ? values.streetAddressOne : order.length > 0 ? order.billingAddress.streetAddressOne : ''}" />
                                    </div>
                                </div>
                                <div class="field mb-4">
                                    <label for="streetAddressTwo" class="label">
                                        Street Address Two
                                    </label>
                                    <div class="control">
                                        <input class="input" type="text" id="streetAddressTwo" name="streetAddressTwo" value="${errors && values.streetAddressTwo && values.streetAddressTwo !== '' ? values.streetAddressTwo : order.length > 0 && order.billingAddress.streetAddressTwo ? order.billingAddress.streetAddressTwo : ''}" />
                                    </div>
                                </div>
                                <div class="field mb-4">
                                    <label for="city" class="label">
                                        City*
                                    </label>
                                    <div class="control">
                                        <input class="input" type="text" id="city" name="city" value="${errors && values.city && values.city !== '' ? values.city : order.length > 0 ? order.billingAddress.city : ''}" />
                                    </div>
                                </div>
                                <div class="field mb-4">
                                    <label for="postalCode" class="label">
                                        Zip Code*
                                    </label>
                                    <div class="control">
                                        <input class="input" type="text" id="postalCode" name="postalCode" value="${errors && values.postalCode && values.postalCode !== '' ? values.postalCode : order.length > 0 ? order.billingAddress.postalCode : ''}" />
                                    </div>
                                </div>
                                <div class="field mb-4">
                                    <label for="state" class="label">
                                        State*
                                    </label>
                                    <div class="control">
                                        <div class="select">
                                            <select id="state" name="state" value="${errors && values.state && values.state !== '' ? values.state : order.length > 0 ? order.billingAddress.state : ''}">
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
                        ${cart.needsShipping ? `
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
                                                <input class="input" type="text" id="shippingAddressOne" name="shippingAddressOne" value="${errors && values.shippingAddressOne && values.shippingAddressOne !== '' ? values.shippingAddressOne : order.length > 0 ? order.shippingAddress.shippingAddressOne : ''}" />
                                            </div>
                                        </div>
                                        <div class="field mb-4">
                                            <label for="shippingAddressTwo" class="label">
                                                Street Address Two
                                            </label>
                                            <div class="control">
                                                <input class="input" type="text" id="shippingAddressTwo" name="shippingAddressTwo" value="${errors && values.shippingAddressTwo && values.shippingAddressTwo !== '' ? values.shippingAddressTwo : order.length > 0 && order.shippingAdrress.shippingAddressTwo ? order.shippingAddress.shippingAddressTwo : ''}" />
                                            </div>
                                        </div>
                                        <div class="field mb-4">
                                            <label for="shippingCity" class="label">
                                                City*
                                            </label>
                                            <div class="control">
                                                <input class="input" type="text" id="shippingCity" name="shippingCity" value="${errors && values.shippingCity && values.shippingCity !== '' ? values.shippingCity : order.length > 0 ? order.shippingAdress.city : ''}" />
                                            </div>
                                        </div>
                                        <div class="field mb-4">
                                            <label for="shippingPostalCode" class="label">
                                                Zip Code*
                                            </label>
                                            <div class="control">
                                                <input class="input" type="text" id="shippingPostalCode" name="shippingPostalCode" value="${errors && values.shippingPostalCode && values.shippingPostalCode !== '' ? values.shippingPostalCode : order.length > 0 ? order.shippingAddress.postalCode : ''}" />
                                            </div>
                                        </div>
                                        <div class="field mb-4">
                                            <label for="shippingState" class="label">
                                                State*
                                            </label>
                                            <div class="control">
                                                <div class="select">
                                                    <select id="shippingState" name="shippingState" value="${errors && values.shippingState && values.shippingState !== '' ? values.shippingState : order.length > 0 ? order.shippingAddress.state : ''}">
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
                        ` : ''}
                        <div>
                            <button type="submit" class="button is-success is-medium">Continue to Payment</button>
                        </div>
                    </form>
                </section>
            </main>
        ` }, req)
}

export default userBillingShippingPage