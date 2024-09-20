import layout from "./layout.js"
import { getErrors } from "../utils/getErrors.js"

const verifyMobilePage = ({ user, errors, values = {} }, req) => {
    return layout({ template: `
        <main class="container">
            <div class="page-title-div mb-6" id="verify-mobile-page-title-div">
                <h1 class="title is-size-1">
                    <span class="pipe">|</span> Verify Phone Number <span class="pipe">|</span>
                </h1>
            </div>
            <div>
                ${errors && errors.length > 0 ? 
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
            <section>
                <form action="/verify-mobile" method="POST">
                    <div class="field mb-4">
                        <label for="code" class="label">Verify Phone</label>
                        <div class="control">
                            <input class="input" type="text" name="code" id="code" value="${errors && values.code && values.code !== '' ? values.code : ''}" placeholder="Enter code..." />
                        </div>
                    </div>
                    <div>
                        <button type="submit" class="button">Verify</button>
                    </div>
                </form>
            </section>
        </main>    
    ` }, req)
}

export default verifyMobilePage