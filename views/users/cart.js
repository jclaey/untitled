import layout from "../layout.js"

const userCartPage = ({ cartItems, user }, req) => {
    let updateDetails = () => {
        let details = { subtotal: 0, total: 0 }
        // Change depending on state where user is located
        let salesTax = 0.0825
        let taxIncluded
        
        cartItems.forEach(item => {
            taxIncluded = item.product.price * salesTax + item.product.price
            details.subtotal += item.product.price
            details.total += taxIncluded
        })

        return details
    }

    let renderedItems

    if (!cartItems || cartItems.length === 0) {
        renderedItems = `
            <div class="is-size-4 box">
                Your cart is currently empty.
            </div>
        `
    } else {
        renderedItems = cartItems.map(item => {
            return `
                <div class="card box">
                    <div class="card-content">
                        <div class="content">
                            <div class="mb-2">
                                <div class="cart-item-div">
                                    <div class="item-info">
                                        <div>
                                            <strong><span class="is-size-4">${item.product.title}</span></strong>
                                        </div>
                                        <div>
                                            <strong>$${item.product.price}</strong>
                                        </div>
                                    </div>
                                    <div class="item-buttons">
                                        <form action="/users/user/${user.id}/cart/${item._id}/remove" method="POST">
                                            <button type="submit" class="button is-danger" id="cart-item-remove-btn">Remove</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            ${item.product.countInStock ? `
                                <form action="/users/user/${req.params.id}/cart/checkout" method="POST" id="user-cart-form">
                                    <div class="field level">
                                        <div class="label">
                                            <strong class="pr-2">Qty: </strong>
                                        </div>
                                        <div class="control">
                                            <input class="input" type="number" name="qty" min="1" max="${item.product.countInStock}" value="1" />
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
                    <div class="page-title-div" id="cart-title-div">
                        <h1 class="title is-size-1 mb-6">
                            <span class="pipe">|</span> ${user.firstName}'s Cart <span class="pipe">|</span>
                        </h1>
                    </div>
                    <div class="columns">
                        <div class="column">
                            <div id="cart-items-div" class="box">
                                <div class="mb-3">
                                    <h3 class="is-size-4 ml-4">${user.firstName}'s Items</h3>
                                </div>
                                ${renderedItems}
                            </div>
                        </div>
                        <div class="column">
                            <div id="cart-details" class="card box">
                                <div class="card-content">
                                    <div class="content">
                                        <div id="subtotal" class="is-size-4">
                                            <strong>Subtotal:</strong>
                                            $${updateDetails().subtotal.toFixed(2)}
                                        </div>
                                        <div id="tax" class="is-size-4">
                                            <strong>Tax:</strong>
                                            $${(updateDetails().total.toFixed(2) - updateDetails().subtotal.toFixed(2)).toFixed(2)}
                                        </div>
                                        <div id="total" class="is-size-4">
                                            <strong>Total:</strong>
                                            $${updateDetails().total.toFixed(2)}
                                        </div>
                                        <div id="checkout-btn" class="mt-4">
                                            <a href="/users/user/billing-shipping" class="button is-success is-medium">Proceed to Checkout</a>
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