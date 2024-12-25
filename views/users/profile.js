import layout from "../layout.js"

const userProfilePage = ({ user, orders = [], projects, quotes }, req) => {
    let renderedCompleteOrders
    let renderedIncompleteOrders
    let renderedProjects
    let renderedActiveQuotes

    if (orders.length > 0) {
        renderedCompleteOrders = orders.map(order => {
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

        renderedIncompleteOrders = orders.map(order => {
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

    if (!projects || projects.length === 0) {
        renderedProjects = '<p class="box">You have no quotes under review</p>'
    } else {
        let renderedUpdates
        renderedProjects = projects.map(project => {
            if (project.updates.length > 0) {
                renderedUpdates = project.updates.map(update => {
                    return `
                        <article class="media">
                            <div class="media-content">
                                <div class="content">
                                    <a href="/users/project/${project._id}/update/${update._id}">
                                        <h5 class="is-size-5">${update.title}</h5>
                                    </a>
                                </div>
                            </div>
                        </article>
                    `
                }).join('')
            } else {
                renderedUpdates = 'There are no updates to this project yet'
            }

            return `
                <div class="box">
                    <div class="is-size-5 mb-2">
                        <h3 class="is-size-3 mb-2">${project.title}</h3>
                        <strong>Created at:</strong> ${project.created_at.toLocaleDateString()} at ${project.created_at.toLocaleTimeString()}
                    </div>
                    <div>
                        <h4 class="is-size-4 mb-2">Project Updates:</h4>
                        ${renderedUpdates}
                    </div>
                </div>
            `
        }).join('')
    }

    if (!quotes || quotes.length === 0) {
        renderedActiveQuotes = '<p>You have no quotes under review</p>'
    } else {
        renderedActiveQuotes = quotes.map(quote => {
            return `
                <div class="box">
                    <h3 class="is-size-5 mb-2">
                        <strong>Project Type: ${quote.projectType}</strong>
                    </h3>
                    <p class="is-size-6 mb-2">
                        <strong>Project Details:</strong> ${
                            quote.projectDetails.length > 60 
                            ? quote.projectDetails.slice(0, 60) + '...' 
                            : quote.projectDetails
                        }
                    </p>
                    <p class="is-size-6 mb-2"><strong>Budget:</strong> $${quote.budget}</p>
                    <p class="is-size-6 mb-2"><strong>Submitted at:</strong> ${quote.submitted_at.toLocaleDateString()} at ${quote.submitted_at.toLocaleTimeString()}
                </div>
            `
        }).join('')
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
                            <a href="/reset-password/${user.id}/email" class="button is-warning">
                                Change Password
                            </a>
                        </div>
                    </div>
                    <div class="column">
                        <div class="columns">
                            <div class="column container" id="order-history">
                                <div class="box">
                                    <h3 class="is-size-3">
                                        <i class="fa-regular fa-calendar pr-2"></i>
                                        Order History
                                    </h3>
                                    <hr>
                                    <div id="complete" class="mb-5">
                                        <h4 class="is-size-4 mb-3">Completed Orders</h4>
                                        <div class="box">
                                            ${renderedCompleteOrders ? renderedCompleteOrders : 'You have no completed orders, at this time'}
                                        </div>
                                    </div>
                                    <div id="incomplete" class="mb-5">
                                        <h4 class="is-size-4 mb-3">Orders in Progress</h4>
                                        <div class="box">
                                            ${renderedIncompleteOrders ? renderedIncompleteOrders : 'You have no incomplete orders, at this time'}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="column container">
                                <div id="subscriptions" class="mb-5">
                                    <div class="box">
                                        <h3 class="is-size-3">
                                            <i class="fa-solid fa-arrows-rotate pr-2"></i>
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
                                            <i class="fa-solid fa-magnifying-glass-dollar pr-2"></i>
                                            Quotes Under Review
                                        </h3>
                                        <hr>
                                        <div class="quote">
                                            ${renderedActiveQuotes}
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
                    <h2 class="is-size-2 mb-5">
                        <i class="fa-solid fa-person-digging pr-2"></i>
                        Current Projects
                    </h2>
                    <hr>
                    <div>
                        ${renderedProjects}
                    </div>
                </div>
            </section>
        </main>
    ` }, req)
}

export default userProfilePage