import layout from "./layout.js"

const paymentSuccessfulPage = (req) => {
    return layout({ template: `
        <main class="container">
            <section class="hero">
                <div class="hero-body">
                    <p class="title is-size-3">Success! Thank you for your order!</p>
                    <p class="subtitle is-size-3">Order Confirmation Number: </p>
                </div>
            </section>
        </main>    
    ` }, req)
}

export default paymentSuccessfulPage