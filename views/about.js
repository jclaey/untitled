import layout from "./layout.js"

const aboutPage = (req) => {
    return layout({ template: `
            <main>
                <section class="mb-6 container">
                    <div class="mb-6 page-title-div">
                        <h1 class="title is-size-1">
                            <span class="pipe">|</span> About Us <span class="pipe">|</span>
                        </h1>
                    </div>
                    <p class="is-size-4 block">Hi! We are Web Solutions and we create solutions for the web! Think web sites, web apps, mobile apps, desktop apps, Internet of Things,
                    and some cool AI stuff too. We build for individuals, small businesses, and enterprises as well.</p>
                    <p class="is-size-4 block">Do you have needs in the finance sector? How about retail? Government? Really, any sector, any budget, and any application, we can build for. 
                    If it's web-based, Web Solutions can build it for you. <a href="/quotes">Contact</a> us today for a free quote.</p>
                    <p class="is-size-4 block">Some other stuff about us:</p>
                    <ul class="mb-6">
                        <li class="is-size-4">We are based in the Dallas-Fort Worth area.</li>
                        <li class="is-size-4">We're really nice.</li>
                        <li class="is-size-4">The company's favorite color is pink.*</li>
                    </ul>
                    <p>*I know, hard to tell from this website</p>
                </section>
                <section id="the-crew-section" class="mb-6">
                    <div class="container">
                        <h2 class="subtitle is-size-2 mb-6 pt-6">The Crew</h2>
                        <div class="columns">
                            <div class="column">
                                <div class="card">
                                    <div class="card-image">
                                        <figure class="image is-4x3">
                                            <img src="/resources/images/crew-boss.webp" />
                                        </figure>
                                    </div>
                                    <div class="card-content">
                                        <p>CEO: Veronica Web</p>
                                    </div>
                                </div>
                            </div>
                            <div class="column"></div>
                            <div class="column"></div>
                        </div>
                    </div>
                </section>
            </main>
        ` 
    }, req)
}

export default aboutPage