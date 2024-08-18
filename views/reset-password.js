import layout from "./layout.js"
import { getErrors } from "../utils/getErrors.js"

const resetPasswordPage = ({ token, errors }, req) => {
    return layout({ template: `
        <main class="container">
            <section>
                <div class="page-title-div mb-6" id="reset-password-page-title-div">
                    <h1 class="title is-size-1">
                        <span class="pipe">|</span> Reset Password <span class="pipe">|</span>
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
                <div id="reset-password-form-div">
                    <form action="/reset-password/${token}?_method=PATCH" method="POST" class="login-form box">
                        <div class="field mb-4">
                            <label for="password" class="label" id="password-label">Enter New Password</label>
                            <div class="control">
                                <input class="input" type="password" name="password" id="password" placeholder="Enter new password" required />
                                <small class="password-match"></small>
                            </div>
                        </div>
                        <div class="field mb-4">
                            <label for="confirmPassword" class="label" id="confirmPassword-label">Confirm New Password</label>
                            <div class="control">
                                <input class="input" type="password" name="confirmPassword" id="confirmPassword" placeholder="Confirm new password" required />
                                <small class="password-match"></small>
                            </div>
                        </div>
                        <button type="submit" class="button" id="form-btn">Reset Password</button>
                    </form>
                </div>
            </section>
        </main>    
    ` }, req)
}

export default resetPasswordPage