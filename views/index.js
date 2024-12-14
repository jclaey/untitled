import layout from "./layout.js"

const indexPage = (req) => {
    return layout({ template: `
            <main>
                <div id="index-main">
                    <section class="hero container">
                        <div class="hero-body">
                            <div class="columns">
                                <div class="column">
                                    <div id="title-area" data-aos="fade-right" data-aos-anchor-placement="middle-middle" data-aos-duration="1000" data-aos-delay="50">
                                        <img src="./resources/images/summit_logo_4.png" alt="Summit Web Services mountain peak logo" class="mr-3" id="summit-logo">
                                        <h1 class="title is-size-2">
                                            Summit Web Services
                                        </h1>
                                    </div>
                                    <hr id="title-hr">
                                    <p class="subtitle is-size-4">Development and services for the web...</p>
                                </div>
                                <div class="column mt-5">
                                    <div class="column-group mb-6">
                                        <h3 class="is-size-3" data-aos="fade-left" data-aos-anchor-placement="middle-middle" data-aos-duration="1000" data-aos-delay="50">
                                            Platforms
                                        </h3>
                                        <hr>
                                        <div class="icon-group">
                                            <div class="icon icon-first">
                                                <i class="fa-solid fa-mobile pr-2"></i>
                                                <small>Mobile</small>
                                            </div>
                                            <div class="icon icon-mid">
                                                <i class="fa-solid fa-desktop pr-2"></i>
                                                <small>Desktop</small>
                                            </div>
                                            <div class="icon icon-mid">
                                                <i class="fa-solid fa-vr-cardboard pr-2"></i>
                                                <small>Virtual</small>
                                            </div>
                                            <div class="icon icon-last">
                                                <i class="fa-solid fa-lightbulb pr-2"></i>
                                                <small>I.O.T.</small>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="column-group">
                                        <h3 class="is-size-3" data-aos="fade-left" data-aos-anchor-placement="middle-middle" data-aos-duration="1000" data-aos-delay="50">
                                            Sectors
                                        </h3>
                                        <hr>
                                        <div class="icon-group">
                                            <div class="icon icon-first">
                                                <i class="fa-solid fa-barcode pr-2"></i>
                                                <small>Retail</small>
                                            </div>
                                            <div class="icon icon-mid">
                                                <i class="fa-solid fa-credit-card pr-2"></i>
                                                <small>Finance</small>
                                            </div>
                                            <div class="icon icon-mid">
                                                <i class="fa-solid fa-scale-balanced pr-2"></i>
                                                <small>Law</small>
                                            </div>
                                            <div class="icon icon-last">
                                                <i class="fa-solid fa-school pr-2"></i>
                                                <small>Education</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
                <section>
                    <div id="sub-showcase" class="mb-6">
                        <p>We develop for the future.</p>
                    </div>
                    <div id="company-introduction" class="mb-6">
                        <div class="columns is-desktop">
                            <div class="column">
                                <figure class="image">
                                    <img src="/resources/images/web_dev_firm_illustration.webp" alt="Illustration of the inside of a web development firm" />
                                </figure>
                            </div>
                            <div class="column pl-5 pr-5 mt-5">
                                <div class="mb-6">
                                    <h2 class="subtitle is-size-2">Welcome to Summit Web Services!</h2>
                                </div>
                                <div class="block is-size-5">
                                    At Summit Web Services, we develop with the future in mind. Everything we build is built to scale and built to work.
                                </div>
                                <div class="block is-size-5">
                                    We excel at all things development. If you can dream it, we can build it. Our imaginations are our only limitations.
                                </div>
                                <div class="block is-size-5">
                                    We build mobile apps, desktop apps, websites, Internet of Things apps, web apps, Web3 apps, apps using artificial intelligence, and so much more. We build more apps than a five star restaurant.
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section class="container" id="why-us">
                    <div class="columns mb-5">
                        <div class="column">
                            <div class="section-title mb-6">
                                <h2 class="subtitle is-size-2">Why Choose Summit?</h2>
                            </div>
                            <ul>
                                <li class="is-size-4 mb-3">
                                    <i class="fa-solid fa-pencil pr-3"></i> Customization <br />
                                    <p>
                                        <span class="is-size-5">- We offer full customization of all of your web projects. If you want to add, change, or delete anything, just let us know, and your wish is our command.</span>
                                    </p>
                                </li>
                                <li class="is-size-4 mb-3">
                                    <i class="fa-solid fa-users-rectangle pr-3"></i> Transparency <br />
                                    <p>
                                        <span class="is-size-5">- We give daily project updates straight to your profile whenever a change is made.</span>
                                    </p>
                                </li>
                                <li class="is-size-4 mb-3">
                                    <i class="fa-solid fa-bell-concierge pr-3"></i> Service <br />
                                    <p>
                                        <span class="is-size-5">- We pride ourselves on offering THE best customer service in the business. We're with you every single step of the way, throughout the duration of your project and beyond. We don't hide from you like the other guys.</span>
                                    </p>
                                </li>
                                <li class="is-size-4 mb-3">
                                    <i class="fa-solid fa-code pr-3"></i> The Tech!!! <br />
                                    <p>
                                        <span class="is-size-5">- And of course, the tech! We've been specializing in developing for the web for close to 10 years now, and we continue to improve and innovate!</span>
                                    </p>
                                </li>
                            </ul>
                        </div>
                        <div class="column">
                            <figure class="image">
                                <img src="/resources/images/why-us.webp" alt="Illustration of a man and woman shaking hands" />
                            </figure>
                        </div>
                    </div>
                </section>
                <section id="testimonial-carousel">
                    <div id="carousel-container">
                        <div class="slides">
                            <q>I like this. This is good.</q>
                            <div class="star-ratings mt-1 mb-1">
                                <div>
                                    <i class="fa-solid fa-star pr-1"></i>
                                </div>
                                <div>
                                    <i class="fa-solid fa-star pr-1"></i>
                                </div>
                                <div>
                                    <i class="fa-solid fa-star pr-1"></i>
                                </div>
                                <div>
                                    <i class="fa-solid fa-star pr-1"></i>
                                </div>
                                <div>
                                    <i class="fa-solid fa-star-half"></i>
                                </div>
                            </div>
                            <p class="author">- Some Person</p>
                        </div>
                        <div class="slides">
                            <q>Keep up the good work.</q>
                            <div class="star-ratings mt-1 mb-1">
                                <div>
                                    <i class="fa-solid fa-star pr-1"></i>
                                </div>
                                <div>
                                    <i class="fa-solid fa-star pr-1"></i>
                                </div>
                                <div>
                                    <i class="fa-solid fa-star pr-1"></i>
                                </div>
                                <div>
                                    <i class="fa-solid fa-star pr-1"></i>
                                </div>
                                <div>
                                    <i class="fa-solid fa-star pr-1"></i>
                                </div>
                            </div>
                            <p class="author">- Someone Else</p>
                        </div>
                        <div class="slides">
                            <q>Hell yes.</q>
                            <div class="star-ratings mt-1 mb-1">
                                <div>
                                    <i class="fa-solid fa-star pr-1"></i>
                                </div>
                                <div>
                                    <i class="fa-solid fa-star pr-1"></i>
                                </div>
                                <div>
                                    <i class="fa-solid fa-star pr-1"></i>
                                </div>
                                <div>
                                    <i class="fa-solid fa-star pr-1"></i>
                                </div>
                                <div>
                                    <i class="fa-solid fa-star pr-1"></i>
                                </div>
                            </div>
                            <p class="author">- My Neighbor</p>
                        </div>
                        <a id="prev"><i class="fa-solid fa-arrow-left"></i></a>
                        <a id="next"><i class="fa-solid fa-arrow-right"></i></a>
                    </div>
                    <div class="dot-container">
                        <div class="dot"></div>
                        <div class="dot"></div>
                        <div class="dot"></div>
                    </div>
                </section>
                <section>
                    <div id="simple-website-package-action">
                        <h2 class="is-size-2">$99 Websites!</h2>
                        <p>Get a website, domain, and a basic hosting package for only $99!</p>
                        <p>Click <a href="">here</a> for more details.</p>
                    </div>
                </section>
            </main>
        `,
        meta: {
            seo: {
                description: 'Your neighborhood web development and web services firm, serving individuals, small businesses, and enterprises. Specializing in website and web applications, but offering mobile, desktop, and IOT apps, AI integrations, as well as superior customer service. Based in Dallas-Fort Worth, USA.',
                keywords: ''
            }
        }
    }, req)
}

export default indexPage