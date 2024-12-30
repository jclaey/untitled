import layout from "./layout.js"

const emailTokenInvalidPage = ({}, req) => {
    return layout({ template: `
        <main id="email-token-invalid-main">
            <section>
                <article class="message is-danger">
                    <div class="message-header">
                        <p>Email Token Invalid</p>
                    </div>
                    <div class="message-body has-text-dark is-size-5">
                        The email token is either invalid or has expired. To generate a new token and verification email, click <a href="/resend-verification-email">here</a>.
                    </div>
                </article>
            </section>
        </main>
    ` }, req)
}

export default emailTokenInvalidPage