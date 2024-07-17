import layout from "../layout.js"

const userCartPage = ({ cartItems, firstName }, req) => {
    let updateDetails = () => {
        let details = { subtotal: 0, total: 0 }
        // Change depending on state where user is located
        let salesTax = 0.0825
        let taxIncluded
        
        cartItems.forEach(item => {
            taxIncluded = item.price * salesTax + item.price
            details.subtotal += item.price
            details.total += taxIncluded
        })

        return details
    }

    let renderedItems

    if (!cartItems || cartItems.length === 0) {
        renderedItems = `
            <div class="is-size-4">
                No products yet.
            </div>
        `
    } else {
        renderedItems = cartItems.map(item => {
            return `
                <div class="card box">
                    <div class="card-content">
                        <div class="content">
                            <div class="mb-2">
                                <strong><span class="is-size-4">${item.title}</span></strong><br />
                                <strong>$${item.price}</strong><br />
                            </div>
                            ${item.countInStock ? `
                                <form action="/users/user/${req.params.userId}/cart/checkout" method="POST" id="user-cart-form">
                                    <div class="field level">
                                        <div class="label">
                                            <strong class="pr-2">Qty: </strong>
                                        </div>
                                        <div class="control">
                                            <input class="input" type="number" name="qty" min="1" max="${item.countInStock}" value="1" />
                                        </div>
                                    </div>
                                </form>
                            ` : ''}
                        </div>
                    </div>
                </div>
            `
        }).join('')
    }

    return layout({ template: `
            <main class="container">
                <section>
                    <div class="mb-6 page-title-div">
                        <h1 class="title is-size-1 mb-6">
                            <span class="pipe">|</span> ${firstName}'s Cart <span class="pipe">|</span>
                        </h1>
                        <div class="columns">
                            <div class="column">
                                <div id="items">
                                    ${renderedItems}
                                </div>
                            </div>
                            <div class="column">
                                <div id="cart-details" class="card box">
                                    <div class="card-content">
                                        <div class="content">
                                            <div id="subtotal" class="is-size-4">
                                                <strong>Subtotal:</strong>
                                                $${updateDetails().subtotal}
                                            </div>
                                            <div id="total" class="is-size-4">
                                                <strong>Total:</strong>
                                                $${updateDetails().total}
                                            </div>
                                            <div id="checkout-btn" class="mt-4">
                                                <a href="/users/user/${req.session.userId}/cart/checkout/${updateDetails().total.toString().replace('.', '')}" class="button is-success is-medium">Proceed to Checkout</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        ` }, req)
}

export default userCartPage