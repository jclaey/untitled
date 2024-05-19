import layout from "./layout.js"

const contactPage = ({}, req) => {
    return layout({ template: `
            <main class="container">
                <section id="">
                    <div class="mb-6 page-title-div">
                        <h1 class="title is-size-1">
                            <span class="pipe">|</span> Contact Us <span class="pipe">|</span>
                        </h1>
                    </div>
                    <form class="box" id="contact-form" action="/contact" method="POST">
                        <div class="field mb-4">
                            <label for="name" class="label">Name</label>
                            <div class="control">
                                <input class="input" type="text" name="name" placeholder="Enter name" />
                            </div>
                        </div>
                        <div class="field mb-4">
                            <label for="email" class="label">Email</label>
                            <div class="control">
                                <input class="input" type="email" name="email" placeholder="Enter email address" />
                            </div>
                        </div>
                        <div class="field mb-4">
                            <label for="email" class="label">Subject</label>
                            <div class="control">
                                <input class="input" type="text" name="subject" placeholder="Enter subject line" />
                            </div>
                        </div>
                        <div class="field mb-6">
                            <label for="content" class="label">Question or Comment</label>
                            <div class="control">
                                <textarea id="content" name="content" class="textarea" placeholder="Enter question or comment"></textarea>
                            </div>
                        </div>
                        <div class="field">
                            <div class="control">
                                <button class="button is-medium" type="submit">Send Message</button>
                            </div>
                        </div>
                    </form>
                </section>
            </main>    
        ` 
    }, req)
}

export default contactPage