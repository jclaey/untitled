import layout from "../layout.js"

const userEditProfilePage = ({ userInfo, errors, values }, req) => {
    return layout({ template: `
        <main class="container">
            <div class="page-title-div">
                <h1 class="title is-size-1">
                    <span class="pipe">|</span> Edit Profile <span class="pipe">|</span>
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
                <form action="/users/user/${userInfo.id}/profile/edit" method="POST" class="login-form box">
                    <div class="field mb-5">
                        <label class="label" for="firstName">
                            <strong>First Name</strong>
                        </label>
                        <div class="control">
                            <input type="text" id="firstName" name="firstName" placeholder="Enter first name..." class="input" value="${userInfo.firstName && !errors ? userInfo.firstName : errors && values.firstName && values.firstName !== '' ? values.firstName : ''}" />
                        </div>
                    </div>
                    <div class="field mb-5">
                        <label class="label" for="lastName">
                            <strong>Last Name</strong>
                        </label>
                        <div class="control">
                            <input type="text" id="lastName" name="lastName" placeholder="Enter last name..." class="input" value="${userInfo.lastName && !errors ? userInfo.lastName : errors && values.lastName && values.lastName !== '' ? values.lastName : ''}" />
                        </div>
                    </div>
                    <div class="field mb-5">
                        <label class="label" for="email">
                            <strong>Email</strong>
                        </label>
                        <div class="control">
                            <input type="text" id="email" name="email" placeholder="Enter email..." class="input" value="${userInfo.email && !errors ? userInfo.email : errors && values.email && values.email !== '' ? values.email : ''}" />
                        </div>
                    </div>
                    <div class="mb-6" id="checkbox-area">
                        <h3 class="is-size-5 mb-1">Account Verification Methods</h3>
                        <label class="checkbox pr-3" for="verifyPassword">
                            Password
                            <input type="checkbox" id="verifyPassword" name="verifyPassword" value="" checked disabled />
                        </label>
                        <label class="checkbox pr-3" for="verifyEmail">
                            Email
                            <input type="checkbox" id="verifyEmail" name="verifyEmail" value="" />
                        </label>
                        <label class="checkbox" for="verifySMS">
                            Text (SMS)
                            <input type="checkbox" id="verifySMS" name="verifySMS" value="" />
                        </label>
                    </div>
                    <div id="user-edit-profile-btns">
                        <button class="button mb-4 is-warning" type="submit">Edit Profile</button>
                        <a href="/users/user/${userInfo.id}/profile" class="button mb-4 is-link">Back to Profile</a>
                    </div>
                </form>
            </section>
        </main>    
    ` }, req)
}

export default userEditProfilePage