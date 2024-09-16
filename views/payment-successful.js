import layout from "./layout.js"

const paymentSuccessfulPage = ({ order }, req) => {
    return layout({ template: `
        <main class="container">
            <section class="hero">
                <div class="hero-body">
                    <p class="title is-size-3">Success! Thank you for your order!</p>
                    <p class="subtitle is-size-3">Order Confirmation Number: ${order.orderNumber}</p>
                    <div>
                        <p><button class="button is-link"><i class="fa-solid fa-print pr-2"></i> Print Receipt</button></p>
                    </div>
                </div>
            </section>
        </main>    
    ` }, req)
}

export default paymentSuccessfulPage