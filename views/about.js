import layout from "./layout.js"

const aboutPage = (req) => {
    return layout({ template: `
            <main>
                <section class="mb-6 container" id="about-section">
                    <div class="page-title-div">
                        <h1 class="title is-size-1">
                            <span class="pipe">|</span> About Us <span class="pipe">|</span>
                        </h1>
                    </div>
                    <div>
                        <div class="mb-6">
                            <h2 class="subtotal is-size-2 mb-5">
                                <i class="fa-solid fa-gears has-text-info"></i>
                                What We Do
                            </h2>
                            <p class="is-size-4 block">
                                Hi! We are Web Solutions and we create solutions for the web! Think web sites, web apps, mobile apps, desktop apps, Internet of Things,
                                and some cool AI stuff too. We build for individuals, small businesses, and enterprises as well.
                            </p>
                            <p class="is-size-4 block">
                                Do you have needs in the finance sector? How about retail? Government? Insurance? Really, any sector, any budget, and any application, we can build for. If it's web-based, Web Solutions can build it for you. <a href="/users/register">Register</a> today for a free quote! Already have an account with us? Contact us <a href="/quotes">here</a>.
                            </p>
                        </div>
                        <div class="mb-6">
                            <h2 class="is-size-2 mb-5">
                                <i class="fa-solid fa-shield"></i>
                                Security
                            </h2>
                            <p class="is-size-4 block">
                                With today's threat landscape, it's more important than ever to focus on the security of your websites, applications,
                                and the underlying infrastructure. At Web Solutions, we keep it top of mind and take a security-first approach to development.
                                For every platform or application we build, we:
                            </p>
                                <ul class="is-size-4">
                                    <li>
                                        <i class="fa-regular fa-circle-check has-text-success pr-2"></i>
                                        Sanitize and escape all input values to prevent XSS attacks
                                    </li>
                                    <li>
                                        <i class="fa-regular fa-circle-check has-text-success pr-2"></i>
                                        All sensitive and personally identifiable information is encrypted at every stage of transit and at rest
                                    </li>
                                    <li>
                                        <i class="fa-regular fa-circle-check has-text-success pr-2"></i>
                                        All passwords are hashed and salted
                                    </li>
                                    <li>
                                        <i class="fa-regular fa-circle-check has-text-success pr-2"></i>
                                        Use HTTP security headers to protect information in transit
                                    </li>
                                    <li>
                                        <i class="fa-regular fa-circle-check has-text-success pr-2"></i>
                                        Encrypt information used in tamper resistant cookies
                                    </li>
                                    <li>
                                        <i class="fa-regular fa-circle-check has-text-success pr-2"></i>
                                        Use HTTPS and SSL
                                    </li>
                                    <li>
                                        <i class="fa-regular fa-circle-check has-text-success pr-2"></i>
                                        Limit log in attempts to prevent brute force attacks
                                    </li>
                                    <li>
                                        <i class="fa-regular fa-circle-check has-text-success pr-2"></i>
                                        Keep libraries and packages up-to-date with the latest security features
                                    </li>
                                    <li>
                                        <i class="fa-regular fa-circle-check has-text-success pr-2"></i>
                                        Regularly scan software for vulnerabilities
                                    </li>
                                </ul>
                        </div>
                        <div class="mb-6">
                            <h2 class="is-size-2 mb-5">
                                <i class="fa-solid fa-handshake has-text-info"></i>
                                Trust
                            </h2>
                            <p class="is-size-4">
                                Web Solutions is all about trust, transparency, and integrity. We believe that customer service in the tech industry
                                is severely lacking, which is exactly why we put so much of a focus on it. A good product is not just the product
                                itself, but the service given around that product.
                            </p>
                        </div>
                        <div class="mb-6">
                            <h2 class="is-size-2 mb-5">Trivia!</h2>
                            <ul class="mb-6">
                                <li class="is-size-4">We are based in the Dallas-Fort Worth area.</li>
                                <li class="is-size-4">We're really nice.</li>
                                <li class="is-size-4">The company's favorite color is pink.*</li>
                            </ul>
                            <p>*I know, hard to tell from this website</p>
                        </div>
                    </div>
                </section>
            </main>
        ` 
    }, req)
}

export default aboutPage