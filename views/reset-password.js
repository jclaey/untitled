import layout from "./layout.js"
import { getErrors } from "../utils/getErrors.js"

const resetPasswordPage = ({ token, errors }, req) => {
    return layout({ template: `
        <main class="container">
            <section>
                <div class="page-title-div" id="reset-password-page-title-div">
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
                <form action="/reset-password/${token}?_method=PATCH" method="POST">
                    <div class="field mb-4">
                        <label for="newPassword" class="label">Enter New Password</label>
                        <div class="control">
                            <input class="input" type="password" name="newPassword" id="newPassword" placeholder="Enter new password" />
                        </div>
                    </div>
                    <div class="field mb-4">
                        <label for="confirmNewPassword" class="label">Confirm New Password</label>
                        <div class="control">
                            <input class="input" type="password" name="confirmNewPassword" id="confirmNewPassword" placeholder="Confirm new password" />
                        </div>
                    </div>
                </form>
            </section>
        </main>    
    ` }, req)
}

export default resetPasswordPage