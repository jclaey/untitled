import layout from "../layout.js"

const userProfilePage = ({ user, orders }, req) => {
    let renderedOrders
    if (orders.length > 0) {
        renderedOrders = orders.map(order => {
            return `
                <article class="media">
                    
                </article>
            `
        })
    }

    return layout({ template: `
        <main class="container">
            <section>
                <div class="columns">
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
                            <a href="/users/user/${user.id}/profile/change-password" class="button is-warning">
                                Change Password
                            </a>
                        </div>
                    </div>
                    <div class="column">
                        <div class="columns">
                            <div class="column">
                                <h3 class="is-size-3">
                                    Order History
                                </h3>
                            </div>
                            <div class="column">

                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    ` }, req)
}

export default userProfilePage