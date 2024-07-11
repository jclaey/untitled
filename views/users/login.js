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
                </form>
            </section>
        </main>   
    ` }, req)
}

export default userLoginPage