import layout from "../layout.js"

const newQuotePage = (req) => {
    return layout({ template: `
        <main class="container">
            <section>
                <div class="mb-6 page-title-div">
                    <h1 class="title is-size-1">
                        <span class="pipe">|</span> Get A Free Quote <span class="pipe">|</span>
                    </h1>
                </div>
                <div class="mb-6">
                    <p class="is-size-4">Free is the best, isn't it? Honestly, why would we charge you for this anyway? Fill out and submit the form below to get a personalized quote!</p>
                </div>
                <form class="box" action="/quotes" method="POST">
                    <div class="mb-3">
                        <small>* denotes a required field</small>
                    </div>
                    <div class="field">
                        <label for="firstName" class="label">
                            First Name*
                        </label>
                        <div class="control">
                            <input class="input" type="text" id="firstName" name="firstName" />
                        </div>
                    </div>
                    <div class="field">
                        <label for="lastName" class="label">
                            Last Name*
                        </label>
                        <div class="control">
                            <input class="input" type="text" id="lastName" name="lastName" />
                        </div>
                    </div>
                    <div class="field">
                        <label for="businessName" class="label">
                            Business Name*
                        </label>
                        <div class="control">
                            <input class="input" type="text" id="businessName" name="businessName" />
                        </div>
                    </div>
                    <div class="field">
                        <label for="streetAddressOne" class="label">
                            Street Address One*
                        </label>
                        <div class="control">
                            <input class="input" type="text" id="streetAddressOne" name="streetAddressOne" />
                        </div>
                    </div>
                    <div class="field">
                        <label for="streetAddressTwo" class="label">
                            Street Address Two
                        </label>
                        <div class="control">
                            <input class="input" type="text" id="streetAddressTwo" name="streetAddressTwo" />
                        </div>
                    </div>
                    <div class="field">
                        <label for="city" class="label">
                            City*
                        </label>
                        <div class="control">
                            <input class="input" type="text" id="city" name="city" />
                        </div>
                    </div>
                    <div class="field">
                        <label for="state" class="label">
                            State*
                        </label>
                        <div class="control">
                            <div class="select">
                                <select id="state" name="state">
                                    <option>Alabama</option>
                                    <option>Alaska</option>
                                    <option>Arizona</option>
                                    <option>Arkansas</option>
                                    <option>California</option>
                                    <option>Colorado</option>
                                    <option>Connecticut</option>
                                    <option>Delaware</option>
                                    <option>Florida</option>
                                    <option>Georgia</option>
                                    <option>Hawaii</option>
                                    <option>Idaho</option>
                                    <option>Illinois</option>
                                    <option>Indiana</option>
                                    <option>Iowa</option>
                                    <option>Kansas</option>
                                    <option>Kentucky</option>
                                    <option>Louisiana</option>
                                    <option>Maine</option>
                                    <option>Maryland</option>
                                    <option>Massachusetts</option>
                                    <option>Michigan</option>
                                    <option>Minnesota</option>
                                    <option>Mississippi</option>
                                    <option>Missouri</option>
                                    <option>Montana</option>
                                    <option>Nebraska</option>
                                    <option>Nevada</option>
                                    <option>New Hampshire</option>
                                    <option>New Jersey</option>
                                    <option>New Mexico</option>
                                    <option>New York</option>
                                    <option>North Carolina</option>
                                    <option>North Dakota</option>
                                    <option>Ohio</option>
                                    <option>Oklahoma</option>
                                    <option>Oregon</option>
                                    <option>Pennsylvania</option>
                                    <option>Rhode Island</option>
                                    <option>South Carolina</option>
                                    <option>South Dakota</option>
                                    <option>Tennessee</option>
                                    <option>Texas</option>
                                    <option>Utah</option>
                                    <option>Vermont</option>
                                    <option>Virginia</option>
                                    <option>Washington</option>
                                    <option>West Virginia</option>
                                    <option>Wisconsin</option>
                                    <option>Wyoming</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="field">
                        <label for="zipcode" class="label">
                            Zip Code*
                        </label>
                        <div class="control">
                            <input class="input" type="text" id="zipcode" name="zipcode" />
                        </div>
                    </div>
                    <div class="field">
                        <label for="phoneNumber" class="label">
                            Phone Number*
                        </label>
                        <div class="control">
                            <input class="input" type="text" id="phoneNumber" name="phoneNumber" />
                        </div>
                    </div>
                    <div class="field">
                        <label for="email" class="label">
                            Email*
                        </label>
                        <div class="control">
                            <input class="input" type="email" id="email" name="email" />
                        </div>
                    </div>
                    <div class="field">
                        <label for="projectType" class="label">
                            Project Type*
                        </label>
                        <div class="control">
                            <div class="select">
                                <select id="projectType" name="projectType">
                                    <option>Web App (back end, database, etc.)</option>
                                    <option>Website (front end only)</option>
                                    <option>Desktop Application</option>
                                    <option>Mobile Application (Android, iOS, cross platform)</option>
                                    <option>Internet of Things</option>
                                    <option>Virtual Reality</option>
                                    <option>Augmented Reality</option>
                                    <option>Artificial Intelligence</option>
                                    <option>Other</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="field">
                        <label for="projectDetails" class="label">
                            Project Details*
                        </label>
                        <div class="control">
                            <textarea class="textarea" id="projectDetails" name="projectDetails"></textarea>
                        </div>
                    </div>
                    <div class="field mb-6">
                        <label for="budget" class="label">
                            Budget* (USD, ballpark estimation, numbers only)
                        </label>
                        <div class="control">
                            <input class="input" min="1" max="${Infinity}" step="1" type="number" id="budget" name="budget" />
                        </div>
                    </div>
                    <button type="submit" class="button mb-3 is-medium is-success">Get Your Free Quote!</button>
                </form>                
            </section>
        </main>
    ` }, req)
}

export default newQuotePage