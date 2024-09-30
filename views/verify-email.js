import layout from "./layout.js"

const verifyEmailPage = ({}, req) => {
    return layout({ template: `
        <main id="verify-email-message">
            <section class="hero-box box">
                <div class="hero-body">
                    <div class="mb-6">
                        <p class="title has-text-success mb-6">Verify Email</p>
                        <p class="subtitle is-size-5">
                            An email has been sent to the email address you registered with us. Please navigate to your email inbox, open the email from Web Solutions, and click on the verify email link.
                        </p>
                        <p class="is-size-5">
                            <a href="/resend-verification-email">Re-send Verification Email</a>
                        </p>
                    </div>
                </div>
            </section>
        </main>    
    ` }, req)
}

export default verifyEmailPage