import layout from "../layout.js"

const adminLoginPage = () => {
    return layout({ template: `
        <main>
            <div class="mb-6 page-title-div">
                <h1 class="title is-size-1">
                    <span class="pipe">|</span> Admin Login <span class="pipe">|</span>
                </h1>
            </div>
            <section id="admin-login-section" class="container">
                <form action="/admin/login" method="POST" id="admin-login-form" class="mt-6 box">
                    <div class="field mb-5">
                        <label class="label" for="email">
                            <strong>Email</strong>
                        </label>
                        <div class="control">
                            <input type="email" id="email" name="email" placeholder="Enter email..." class="input" />
                        </div>
                    </div>
                    <div class="field mb-5">
                        <label class="label" for="password">
                            <strong>Password</strong>
                        </label>
                        <div class="control">
                            <input type="password" id="password" name="password" placeholder="Enter password..." class="input" />
                        </div>
                    </div>
                    <button class="button is-medium mb-4" type="submit" id="admin-login-btn">Login</button>
                </form>
            </section>
        </main>
    ` })
}

export default adminLoginPage