import layout from "./layout.js"
import { getErrors } from "../utils/getErrors.js"

const contactPage = ({errors, values = {}}, req) => {
    return layout({ template: `
            <main class="container">
                <section class="login-section">
                    <div class="page-title-div">
                        <h1 class="title is-size-1">
                            <span class="pipe">|</span> Contact Us <span class="pipe">|</span>
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
                    <form class="box login-form" id="contact-form" action="/contact" method="POST">
                        <div class="field mb-4">
                            <label for="name" class="label">Name</label>
                            <div class="control">
                                <input class="input" type="text" name="name" value="${errors && values.name && values.name !== '' ? values.name : ''}" placeholder="Enter name" />
                            </div>
                        </div>
                        <div class="field mb-4">
                            <label for="email" class="label">Email</label>
                            <div class="control">
                                <input class="input" type="email" name="email" value="${errors && values.email && values.email !== '' ? values.email : ''}" placeholder="Enter email address" />
                            </div>
                        </div>
                        <div class="field mb-4">
                            <label for="email" class="label">Subject</label>
                            <div class="control">
                                <input class="input" type="text" name="subject" value="${errors && values.subject && values.subject !== '' ? values.subject : ''}" placeholder="Enter subject line" />
                            </div>
                        </div>
                        <div class="field mb-6">
                            <label for="content" class="label">Question or Comment</label>
                            <div class="control">
                                <textarea id="content" name="content" class="textarea" value="${errors && values.content && values.content !== '' ? values.content : ''}" placeholder="Enter question or comment"></textarea>
                            </div>
                        </div>
                        <div class="field">
                            <div class="control">
                                <button class="button is-medium is-info" type="submit">Send Message</button>
                            </div>
                        </div>
                    </form>
                </section>
            </main>    
        `, meta: {
            seo: {
                description: 'We are always available to answer your questions or comments. Contact us today. We would love to hear from you.',
                keywords: ''
            },
            title: 'Contact Us'
        } 
    }, req)
}

export default contactPage