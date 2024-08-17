import layout from "./layout.js"
import { getErrors } from "../utils/getErrors.js"

const forgotPasswordPage = ({ errors, values = {} }, req) => {
    return layout({ template: `
        <main class="container">
            <section>
                <div class="page-title-div" id="forgot-password-page-title-div">
                    <h1 class="title is-size-1">
                        <span class="pipe">|</span> Forgot Password <span class="pipe">|</span>
                    </h1>
                </div>
                <div>
                    ${errors ? 
                        `
                            <div>
                                <div>
                                    ${getErrors(errors)}
                                </div>
                            </div>
                        `
                    : ''}
                </div>
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
                <div id="forgot-password-form">
                    <form action="/forgot-password?_method=PATCH" method="POST" class="login-form box">
                        <div class="field mb-4">
                            <label for="email" class="label">Enter Your Email</label>
                            <div class="control">
                                <input class="input" type="email" name="email" id="email" value="${errors && values.email && values.email !== '' ? values.email : ''}" placeholder="Enter email" />
                            </div>
                        </div>
                        <div class="mb-4">
                            <small>If your email is registered with us, you will receive a password reset link in an email</small>
                        </div>
                        <div>
                            <button type="submit" class="button">Get Link</button>
                        </div>
                    </form>
                </div>
            </section>
        </main>
    ` }, req)
}

export default forgotPasswordPage