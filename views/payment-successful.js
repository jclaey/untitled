import layout from "./layout.js"

const paymentSuccessfulPage = (req) => {
    return layout({ template: `
        <main class="container">
            <section class="hero">
                <div class="hero-body">
                    <p class="title">Success! Thank you for your order!</p>
                    <p class="subtitle">Order Confirmation Number: </p>
                </div>
            </section>
        </main>    
    ` }, req)
}

export default paymentSuccessfulPage