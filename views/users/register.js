import layout from "../layout.js"
import { getErrors } from "../../utils/getErrors.js"

const userRegisterPage = ({ errors, values = {} }, req) => {
    return layout({ template: `
        <main class="container">
            <div class="page-title-div">
                <h1 class="title is-size-1">
                    <span class="pipe">|</span> Create An Account <span class="pipe">|</span>
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
            <section class="login-section" id="register-section">
                <form action="/users/register" method="POST" class="box login-form">
                    <div id="fields">
                        <div class="mb-3">
                            <small>* denotes a required field</small>
                        </div>
                        <div class="field mb-5">
                            <label class="label" for="firstName">
                                <strong>First Name*</strong>
                            </label>
                            <div class="control">
                                <input type="text" id="firstName" name="firstName" placeholder="Enter first name..." class="input" value="${errors && values.firstName && values.firstName !== '' ? values.firstName : ''}" required />
                            </div>
                        </div>
                        <div class="field mb-5">
                            <label class="label" for="lastName">
                                <strong>Last Name*</strong>
                            </label>
                            <div class="control">
                                <input type="text" id="lastName" name="lastName" placeholder="Enter last name..." class="input" value="${errors && values.lastName && values.lastName !== '' ? values.lastName : ''}" required />
                            </div>
                        </div>
                        <div class="field mb-5">
                            <label class="label" for="email">
                                <strong>Email*</strong>
                            </label>
                            <div class="control">
                                <input type="email" id="email" name="email" placeholder="Enter email..." class="input" value="${errors && values.email && values.email !== '' ? values.email : ''}" required />
                            </div>
                        </div>
                        <div class="field mb-5">
                            <label class="label" for="phoneNumber">
                                <strong>Phone Number*</strong>
                            </label>
                            <div class="control">
                                <input type="text" id="phoneNumber" name="phoneNumber" placeholder="Enter phone number..." class="input" value="${errors && values.phoneNumber && values.phoneNumber !== '' ? values.phoneNumber : ''}" required />
                            </div>
                        </div>
                        <div class="field mb-5">
                            <label class="label" for="password">
                                <strong id="password-label">Password*</strong>
                            </label>
                            <div class="control">
                                <input type="password" id="password" name="password" placeholder="Enter password..." class="input" minLength="8" value="${errors && values.password && values.password !== '' ? values.password : ''}" required />
                                <small class="password-match"></small>
                            </div>
                        </div>
                        <div class="field mb-5">
                            <label class="label" for="confirmPassword">
                                <strong id="confirmPassword-label">Confirm Password*</strong>
                            </label>
                            <div class="control">
                                <input type="password" id="confirmPassword" name="confirmPassword" placeholder="Confirm password..." class="input" minLength="8" required />
                                <small class="password-match"></small>
                            </div>
                        </div>
                        <div id="checkbox-group" class="checkboxes mb-4">
                            <div class="is-size-6 mb-1">
                                <strong>Verification Methods</strong>
                            </div>
                            <label class="checkbox mr-2">
                                <input name="verificationMethod" value="email" type="checkbox" checked disabled />
                                Email
                            </label>
                            <label class="checkbox">
                                <input name="verificationMethod" value="sms" type="checkbox" />
                                Text Message (SMS)
                            </label>
                        </div>
                        <div id="newsletter-subscribe" class="mb-6">
                            <div class="is-size-6 mb-1">
                                <strong>Subscribe</strong>
                            </div>
                            <label class="checkbox">
                                <input name="isNewsLetterSubscriber" value="true" type="checkbox" />
                                Subscribe to our weekly newsletter :)
                            </label>
                        </div>
                        <button class="button is-medium mb-5 register-btn" id="form-btn" type="submit" disabled>Register</button>
                        <div class="mb-5">
                            <p class="has-text-centered">Already have an account? Click <a href="/users/login">here</a> to sign in.</p>
                        </div>
                        <div>
                            <p class="has-text-centered">By creating an account, you are agreeing to our <a href="/terms-of-service">terms of service</a> and to receiving a one time verification email from us.</p>
                        </div>
                    </div>
                </form>
            </section>
        </main>
    ` }, req)
}

export default userRegisterPage