import layout from "./layout.js"

const verifyEmailSuccessPage = ({}, req) => {
    return layout({ template: `
        <main>
            <section class="hero-box">
                <div class="hero-body">
                    <div class="mb-6">
                        <p class="title has-text-success mb-6">Success!</p>
                        <p class="subtitle">
                            Your email has been verified! You will be re-directed to your profile in just a few seconds...
                        </p>
                    </div>
                    <div class="level">
                        <div class="level-left">
                            <div class="level-item">
                                <a href="/home" class="button is-link">Home</a>
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
    ` })
}

export default verifyEmailSuccessPage