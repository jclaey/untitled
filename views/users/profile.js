import layout from "../layout.js"

const userProfilePage = ({ user }, req) => {
    return layout({ template: `
        <main class="container">
            <section>
                <h1 class="title is-size-1 mb-6">Hello, ${user.firstName} ${user.lastName}</h1>
                <div class="mb-6 is-size-5">
                    <strong>Email:</strong> ${user.email} <br />
                    <strong>Date Joined:</strong> ${user.createdAt.toLocaleDateString('en-US')} at ${user.createdAt.toLocaleTimeString('en-US')}
                </div>
                <div>
                    <a href="/users/user/${user._id}/profile/edit" class="button is-warning">
                        Edit Profile
                    </a>
                    <a href="/users/user/${user._id}/profile/change-password" class="button is-warning">
                        Change Password
                    </a>
                </div>
            </section>
        </main>
    ` }, req)
}

export default userProfilePage