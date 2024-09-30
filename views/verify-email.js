import layout from "./layout.js"

const verifyEmailPage = ({}, req) => {
    return layout({ template: `
        <main id="verify-email-message">
            <div>
                ${req && req.session && req.session.error ? 
                    `
                        <div>
                            <div>
                                <article class="message" id="message">
                                    <div class="message-header">
                                        <p>Error</p>
                                        <button id="msg-close-btn" class="delete" aria-label="delete"></button>
                                    </div>
                                    <div class="message-body">
                                        <div id="errors" class="has-text-danger is-size-5">
                                            ${req.session.error}
                                        </div>
                                    </div>
                                </article>
                            </div>
                        </div>
                    `
                : ''}
            </div>
            <div>
                ${req && req.session && req.session.message ? 
                    `
                        <div>
                            <div>
                                <article class="message" id="message">
                                    <div class="message-header">
                                        <p>Success</p>
                                        <button id="msg-close-btn" class="delete" aria-label="delete"></button>
                                    </div>
                                    <div class="message-body">
                                        <div id="errors" class="is-size-5">
                                            ${req.session.message}
                                        </div>
                                    </div>
                                </article>
                            </div>
                        </div>
                    `
                : ''}
            </div>
            <section class="hero-box box">
                <div class="hero-body">
                    <div class="mb-6">
                        <p class="title has-text-success mb-6">Verify Email</p>
                        <p class="subtitle is-size-5">
                            An email is being sent to the email address you registered with us. This can take several minutes. Please navigate to your email inbox, open the email from Web Solutions, and click on the verify email link. If you don't see the email, please wait a few minutes and try again or check your spam or other folders within your email account.
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