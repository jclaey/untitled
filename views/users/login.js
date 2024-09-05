import layout from "../layout.js"
import { getErrors } from "../../utils/getErrors.js"

const userLoginPage = ({ errors, values = {} }, req) => {
    return layout({ template: `
        <main class="container">
            <div class="mb-6 page-title-div">
                <h1 class="title is-size-1">
                    <span class="pipe">|</span> User Login <span class="pipe">|</span>
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
                                </article>
                            </div>
                        </div>
                    `
                : ''}
            </div>
            <section class="login-section">
                <form action="/users/login" method="POST" class="mt-6 box login-form">
                    <div class="field mb-5">
                        <label class="label" for="email">
                            <strong>Email</strong>
                        </label>
                        <div class="control">
                            <input type="email" id="email" name="email" placeholder="Enter email..." class="input" value="${errors && values.email && values.email !== '' ? values.email : ''}" />
                        </div>
                    </div>
                    <div class="field mb-5">
                        <label class="label" for="password">
                            <strong>Password</strong>
                        </label>
                        <div class="control">
                            <input type="password" id="password" name="password" placeholder="Enter password..." class="input" value="${errors && values.password && values.password !== '' ? values.password : ''}" />
                        </div>
                    </div>
                    <button class="button is-medium mb-4 login-btn" type="submit">Login</button>
                    <div>
                        <p class="has-text-centered">Forgot Password? Click <a href="/forgot-password">here</a>.</p>
                    </div>
                    <div>
                        <p class="has-text-centered">Not a member? Click <a href="/users/register">here</a> to register.</p>
                    </div>
                </form>
            </section>
        </main>   
    ` }, req)
}

export default userLoginPage