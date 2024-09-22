import layout from "../layout.js"

const userProfilePage = ({ user, orders = [], token }, req) => {
    let renderedComplete
    let renderedIncomplete

    if (orders.length > 0) {
        renderedComplete = orders.map(order => {
            if (order.isPaid === true) {
                return `
                    <article class="media box">
                        <div class="media-content">
                            <div class="content">
                                <div class="order mb-2">
                                    <p><strong>Order Number:</strong> ${order.orderNumber}</p>
                                </div>
                            </div>
                        </div>
                    </article>
                `
            } else {
                return `
                    <p>You have no completed orders, at this time</p>
                `
            }
        })

        renderedIncomplete = orders.map(order => {
            if (!order.isPaid) {
                return `
                    <article class="media box">
                        <div class="media-content">
                            <div class="content">
                                <div class="order mb-5">
                                    <p><strong>Order Number:</strong> ${order.orderNumber}</p>
                                    <p><strong>Order Total:</strong> $${order.totalPrice.toFixed(2)}</p>
                                    <p><strong>Date:</strong> ${order.createdAt.toLocaleDateString()} at ${order.createdAt.toLocaleTimeString()}</p>
                                </div>
                                <div class="finalize-btn mb-2">
                                    <a href="/users/user/${user.id}/cart/checkout" class="button is-success">Finalize</a>
                                </div>
                            </div>
                        </div>
                    </article>
                `
            } else {
                return `
                    <p>You have no incomplete orders, at this time</p>
                `
            }
        })
    }

    return layout({ template: `
        <main class="container">
            <section>
                <div class="columns mb-6">
                    <div class="column">
                        <h1 class="title is-size-1 mb-6">Hello, ${user.firstName} ${user.lastName}</h1>
                        <div class="mb-6 is-size-5">
                            <strong>Email:</strong> ${user.email} <br />
                            <strong>Date Joined:</strong> ${user.createdAt.toLocaleDateString('en-US')} at ${user.createdAt.toLocaleTimeString('en-US')}
                        </div>
                        <div>
                            <a href="/users/user/${user.id}/profile/edit" class="button is-warning">
                                Edit Profile
                            </a>
                            <a href="/reset-password/${token}/${user.id}" class="button is-warning">
                                Change Password
                            </a>
                        </div>
                    </div>
                    <div class="column">
                        <div class="columns">
                            <div class="column container" id="order-history">
                                <div class="box">
                                    <h3 class="is-size-3">
                                        Order History
                                    </h3>
                                    <hr>
                                    <div id="complete" class="mb-5">
                                        <h4 class="is-size-4 mb-3">Completed Orders</h4>
                                        <div class="box">
                                            ${renderedComplete ? renderedComplete : 'You have no completed orders, at this time'}
                                        </div>
                                    </div>
                                    <div id="incomplete" class="mb-5">
                                        <h4 class="is-size-4 mb-3">Orders in Progress</h4>
                                        <div class="box">
                                            ${renderedIncomplete ? renderedIncomplete : 'You have no incomplete orders, at this time'}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="column container">
                                <div id="subscriptions" class="mb-5">
                                    <div class="box">
                                        <h3 class="is-size-3">
                                            Subscriptions
                                        </h3>
                                        <hr>
                                        <div class="subscription">
                                            <p class="box">You have no current subscriptions</p>
                                        </div>
                                    </div>
                                </div>
                                <div id="quotes">
                                    <div class="box">
                                        <h3 class="is-size-3">
                                            Quotes Under Review
                                        </h3>
                                        <hr>
                                        <div class="quote">
                                            <p class="box">You have no quotes under review</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section>
                <div class="box">
                    <h2 class="is-size-2 mb-5">Current Projects</h2>
                    <div class="project box">
                        <p>You have no current projects</p>
                    </div>
                </div>
            </section>
        </main>
    ` }, req)
}

export default userProfilePage