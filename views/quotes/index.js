import layout from "../layout.js"
import { getErrors } from "../../utils/getErrors.js"

const newQuotePage = ({ errors, values = {} }, req) => {
    const date = new Date().toLocaleDateString().split('/')
    let today = [date[2], date[0], date[1]]
    today.forEach((part, index) => {
        if (part.length === 1) {
            today[index] = part.padStart(2, '0')
        }
    })
    today = today.join('-')

    return layout({ template: `
        <main class="container">
            <section>
                <div class="page-title-div">
                    <h1 class="title is-size-1">
                        <span class="pipe">|</span> Get A Free Quote <span class="pipe">|</span>
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
                <div class="mb-6" id="byline">
                    <p class="is-size-4">Free is the best, isn't it? Honestly, why would we charge you for this anyway? Fill out and submit the form below to get a personalized quote!</p>
                </div>
                <div>
                    <form class="box" action="/quotes" method="POST">
                        <div class="mb-3">
                            <small>* denotes a required field</small>
                        </div>
                        <div class="field">
                            <label for="firstName" class="label">
                                First Name*
                            </label>
                            <div class="control">
                                <input class="input" type="text" id="firstName" name="firstName" value="${errors && values.firstName && values.firstName !== '' ? values.firstName : ''}" />
                            </div>
                        </div>
                        <div class="field">
                            <label for="lastName" class="label">
                                Last Name*
                            </label>
                            <div class="control">
                                <input class="input" type="text" id="lastName" name="lastName" value="${errors && values.lastName && values.lastName !== '' ? values.lastName : ''}" />
                            </div>
                        </div>
                        <div class="field">
                            <label for="businessName" class="label">
                                Business Name*
                            </label>
                            <div class="control">
                                <input class="input" type="text" id="businessName" name="businessName" value="${errors && values.businessName && values.businessName !== '' ? values.businessName : ''}" />
                            </div>
                        </div>
                        <div class="field">
                            <label for="streetAddressOne" class="label">
                                Street Address One*
                            </label>
                            <div class="control">
                                <input class="input" type="text" id="streetAddressOne" name="streetAddressOne" value="${errors && values.streetAddressOne && values.streetAddressOne !== '' ? values.streetAddressOne : ''}" />
                            </div>
                        </div>
                        <div class="field">
                            <label for="streetAddressTwo" class="label">
                                Street Address Two
                            </label>
                            <div class="control">
                                <input class="input" type="text" id="streetAddressTwo" name="streetAddressTwo" value="${errors && values.streetAddressTwo && values.streetAddressTwo !== '' ? values.streetAddressTwo : ''}" />
                            </div>
                        </div>
                        <div class="field">
                            <label for="city" class="label">
                                City*
                            </label>
                            <div class="control">
                                <input class="input" type="text" id="city" name="city" value="${errors && values.city && values.city !== '' ? values.city : ''}" />
                            </div>
                        </div>
                        <div class="field">
                            <label for="state" class="label">
                                State*
                            </label>
                            <div class="control">
                                <div class="select">
                                    <select id="state" name="state">
                                        <option selected="${errors && values.state && values.state.toLowerCase() === 'alabama' ? true : false}">Alabama</option>
                                        <option selected="${errors && values.state && values.state.toLowerCase() === 'alaska' ? true : false}">Alaska</option>
                                        <option selected="${errors && values.state && values.state.toLowerCase() === 'arizona' ? true : false}">Arizona</option>
                                        <option selected="${errors && values.state && values.state.toLowerCase() === 'arkansas' ? true : false}">Arkansas</option>
                                        <option selected="${errors && values.state && values.state.toLowerCase() === 'california' ? true : false}">California</option>
                                        <option selected="${errors && values.state && values.state.toLowerCase() === 'colorado' ? true : false}">Colorado</option>
                                        <option selected="${errors && values.state && values.state.toLowerCase() === 'connecticut' ? true : false}">Connecticut</option>
                                        <option selected="${errors && values.state && values.state.toLowerCase() === 'delaware' ? true : false}">Delaware</option>
                                        <option selected="${errors && values.state && values.state.toLowerCase() === 'florida' ? true : false}">Florida</option>
                                        <option selected="${errors && values.state && values.state.toLowerCase() === 'georgia' ? true : false}">Georgia</option>
                                        <option selected="${errors && values.state && values.state.toLowerCase() === 'hawaii' ? true : false}">Hawaii</option>
                                        <option selected="${errors && values.state && values.state.toLowerCase() === 'idaho' ? true : false}">Idaho</option>
                                        <option selected="${errors && values.state && values.state.toLowerCase() === 'illinois' ? true : false}">Illinois</option>
                                        <option selected="${errors && values.state && values.state.toLowerCase() === 'indiana' ? true : false}">Indiana</option>
                                        <option selected="${errors && values.state && values.state.toLowerCase() === 'iowa' ? true : false}">Iowa</option>
                                        <option selected="${errors && values.state && values.state.toLowerCase() === 'kansas' ? true : false}">Kansas</option>
                                        <option selected="${errors && values.state && values.state.toLowerCase() === 'kentucky' ? true : false}">Kentucky</option>
                                        <option selected="${errors && values.state && values.state.toLowerCase() === 'louisiana' ? true : false}">Louisiana</option>
                                        <option selected="${errors && values.state && values.state.toLowerCase() === 'maine' ? true : false}">Maine</option>
                                        <option selected="${errors && values.state && values.state.toLowerCase() === 'maryland' ? true : false}">Maryland</option>
                                        <option selected="${errors && values.state && values.state.toLowerCase() === 'massachussetts' ? true : false}">Massachusetts</option>
                                        <option selected="${errors && values.state && values.state.toLowerCase() === 'michigan' ? true : false}">Michigan</option>
                                        <option selected="${errors && values.state && values.state.toLowerCase() === 'minnesota' ? true : false}">Minnesota</option>
                                        <option selected="${errors && values.state && values.state.toLowerCase() === 'mississippi' ? true : false}">Mississippi</option>
                                        <option selected="${errors && values.state && values.state.toLowerCase() === 'missouri' ? true : false}">Missouri</option>
                                        <option selected="${errors && values.state && values.state.toLowerCase() === 'montana' ? true : false}">Montana</option>
                                        <option selected="${errors && values.state && values.state.toLowerCase() === 'nebraska' ? true : false}">Nebraska</option>
                                        <option selected="${errors && values.state && values.state.toLowerCase() === 'nevada' ? true : false}">Nevada</option>
                                        <option selected="${errors && values.state && values.state.toLowerCase() === 'new hampshire' ? true : false}">New Hampshire</option>
                                        <option selected="${errors && values.state && values.state.toLowerCase() === 'new jersey' ? true : false}">New Jersey</option>
                                        <option selected="${errors && values.state && values.state.toLowerCase() === 'new mexico' ? true : false}">New Mexico</option>
                                        <option selected="${errors && values.state && values.state.toLowerCase() === 'new york' ? true : false}">New York</option>
                                        <option selected="${errors && values.state && values.state.toLowerCase() === 'north carolina' ? true : false}">North Carolina</option>
                                        <option selected="${errors && values.state && values.state.toLowerCase() === 'north dakota' ? true : false}">North Dakota</option>
                                        <option selected="${errors && values.state && values.state.toLowerCase() === 'ohio' ? true : false}">Ohio</option>
                                        <option selected="${errors && values.state && values.state.toLowerCase() === 'oklahoma' ? true : false}">Oklahoma</option>
                                        <option selected="${errors && values.state && values.state.toLowerCase() === 'oregon' ? true : false}">Oregon</option>
                                        <option selected="${errors && values.state && values.state.toLowerCase() === 'pennsylvania' ? true : false}">Pennsylvania</option>
                                        <option selected="${errors && values.state && values.state.toLowerCase() === 'rhode island' ? true : false}">Rhode Island</option>
                                        <option selected="${errors && values.state && values.state.toLowerCase() === 'south carolina' ? true : false}">South Carolina</option>
                                        <option selected="${errors && values.state && values.state.toLowerCase() === 'south dakota' ? true : false}">South Dakota</option>
                                        <option selected="${errors && values.state && values.state.toLowerCase() === 'tennessee' ? true : false}">Tennessee</option>
                                        <option selected="${errors && values.state && values.state.toLowerCase() === 'texas' ? true : false}">Texas</option>
                                        <option selected="${errors && values.state && values.state.toLowerCase() === 'utah' ? true : false}">Utah</option>
                                        <option selected="${errors && values.state && values.state.toLowerCase() === 'vermont' ? true : false}">Vermont</option>
                                        <option selected="${errors && values.state && values.state.toLowerCase() === 'virginia' ? true : false}">Virginia</option>
                                        <option selected="${errors && values.state && values.state.toLowerCase() === 'washington' ? true : false}">Washington</option>
                                        <option selected="${errors && values.state && values.state.toLowerCase() === 'west virginia' ? true : false}">West Virginia</option>
                                        <option selected="${errors && values.state && values.state.toLowerCase() === 'wisconsin' ? true : false}">Wisconsin</option>
                                        <option selected="${errors && values.state && values.state.toLowerCase() === 'wyoming' ? true : false}">Wyoming</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="field">
                            <label for="postalCode" class="label">
                                Zip Code*
                            </label>
                            <div class="control">
                                <input class="input" type="text" id="postalCode" name="postalCode" value="${errors && values.postalCode && values.postalCode !== '' ? values.postalCode : ''}" />
                            </div>
                        </div>
                        <div class="field">
                            <label for="phoneNumber" class="label">
                                Phone Number*
                            </label>
                            <div class="control">
                                <input class="input" type="text" id="phoneNumber" name="phoneNumber"  value="${errors && values.phoneNumber && values.phoneNumber !== '' ? values.phoneNumber : ''}" />
                            </div>
                        </div>
                        <div class="field">
                            <label for="email" class="label">
                                Email*
                            </label>
                            <div class="control">
                                <input class="input" type="email" id="email" name="email" value="${errors && values.email && values.email !== '' ? values.email : ''}" />
                            </div>
                        </div>
                        <div class="field">
                            <label for="projectType" class="label">
                                Project Type*
                            </label>
                            <div class="control">
                                <div class="select">
                                    <select id="projectType" name="projectType">
                                        <option selected="${errors && values.projectType && values.projectType.toLowerCase() === 'web app' ? true : false}">Web App</option>
                                        <option selected="${errors && values.projectType && values.projectType.toLowerCase() === 'website' ? true : false}">Website</option>
                                        <option selected="${errors && values.projectType && values.projectType.toLowerCase() === 'desktop application' ? true : false}">Desktop Application</option>
                                        <option selected="${errors && values.projectType && values.projectType.toLowerCase() === 'mobile application' ? true : false}">Mobile Application</option>
                                        <option selected="${errors && values.projectType && values.projectType.toLowerCase() === 'internet of things' ? true : false}">Internet of Things</option>
                                        <option selected="${errors && values.projectType && values.projectType.toLowerCase() === 'virtual reality' ? true : false}">Virtual Reality</option>
                                        <option selected="${errors && values.projectType && values.projectType.toLowerCase() === 'augmented reality' ? true : false}">Augmented Reality</option>
                                        <option selected="${errors && values.projectType && values.projectType.toLowerCase() === 'artificial intelligence' ? true : false}">Artificial Intelligence</option>
                                        <option selected="${errors && values.projectType && values.projectType.toLowerCase() === 'other' ? true : false}">Other</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="field">
                            <label for="projectDetails" class="label">
                                Project Details*
                            </label>
                            <div class="control">
                                <textarea class="textarea" id="projectDetails" maxlength="1000" name="projectDetails">${errors && values.projectDetails && values.projectDetails !== '' ? values.projectDetails : ''}</textarea>
                            </div>
                        </div>
                        <div class="field mb-6">
                            <label for="budget" class="label">
                                Budget* (USD, ballpark estimation, numbers only)
                            </label>
                            <div class="control">
                                <input class="input" min="1" max="${Infinity}" step="1" type="number" id="budget" name="budget" value="${errors && values.budget && values.budget >= 1 ? values.budget : ''}"" />
                            </div>
                        </div>
                        <div class="field mb-6">
                            <label for="dueDate" class="label">
                                Due Date
                            </label>
                            <div class="control">
                                <input type="date" id="dueDate" name="dueDate" min="${today}" class="input" value="${errors && values.dueDate ? values.dueDate : ''}"" />
                            </div>
                        </div>
                        <button type="submit" class="button mb-3 is-medium is-success">Get Your Free Quote!</button>
                    </form>
                </div>
            </section>
        </main>
    ` }, req)
}

export default newQuotePage