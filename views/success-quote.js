import layout from "./layout.js"

const successQuotePage = (req) => {
    return layout({ template: `
        <main class="container">
            <section class="hero">
                <div class="hero-body">
                    <p class="title is-success">Success!</p>
                    <p class="subtitle">
                        Your information was submitted. You should hear back within a couple of days. If you have any questions,
                        please reach out to us <a href="/contact">here</a>. We would love to hear from you.
                    </p>
                </div>
            </section>
        </main>
    ` }, req)
}

export default successQuotePage