import layout from "./layout.js"

const successQuotePage = (req) => {
    return layout({ template: `
        <main class="container">
            <section class="hero box">
                <div class="hero-body">
                    <div class="mb-6">
                        <p class="title has-text-success mb-6">Success!</p>
                        <p class="subtitle">
                            Your information was submitted. You should hear back from us, regarding your quote, within 2 to 3 business days. If you have any questions, please don't hesitate to reach out to us <a href="/contact">here</a>.
                        </p>
                    </div>
                    <div class="level">
                        <div class="level-left">
                            <div class="level-item">
                                <a href="/" class="button is-link">Home</a>
                            </div>
                            <div class="level-item">
                                <a href="/products" class="button is-link">Products</a>
                            </div>
                            <div class="level-item">
                                <a href="/services" class="button is-link">Services</a>
                            </div>
                            <div class="level-item">
                                <a href="/contact" class="button is-link">Contact</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    ` }, req)
}

export default successQuotePage