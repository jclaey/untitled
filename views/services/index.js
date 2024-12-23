import layout from "../layout.js"

const indexPage = (req) => {
    return layout({ template: `
        <main class="container">
            <div class="page-title-div" id="services-title">
                <h1 class="title is-size-1">
                    <span class="pipe">|</span> Our Services <span class="pipe">|</span>
                </h1>
            </div>
            <section id="services-page-links" class="pb-6">
                <div class="service mb-6">
                    <div class="icon mb-2">
                        <i class="fa-solid fa-laptop-code is-size-2"></i>
                    </div>
                    <h3 class="is-size-3">Websites</h3>
                    <p class="is-size-5 mb-3">Check out our options for websites</p>
                    <a href="/services/websites" class="button is-info is-outlined">View Page</a>
                </div>
                <div class="service mb-6">
                    <div class="icon mb-2">
                        <i class="fa-solid fa-server is-size-2"></i>
                    </div>
                    <h3 class="is-size-3">Web Apps</h3>
                    <p class="is-size-5 mb-3">Check out our options for web applications</p>
                    <a href="/services/webApplications" class="button is-info is-outlined">View Page</a>
                </div>
                <div class="service mb-6">
                    <div class="icon mb-2">
                        <i class="fa-solid fa-mobile-screen-button is-size-2"></i>
                    </div>
                    <h3 class="is-size-3">Mobile Applications</h3>
                    <p class="is-size-5 mb-3">Check out our options for mobile applications</p>
                    <a href="/services/mobileApplications" class="button is-info is-outlined">View Page</a>
                </div>
                <div class="service mb-6">
                    <div class="icon mb-2">
                        <i class="fa-solid fa-mobile-screen-button is-size-2"></i>
                    </div>
                    <h3 class="is-size-3">Desktop Applications</h3>
                    <p class="is-size-5 mb-3">Check out our options for desktop applications</p>
                    <a href="/services/desktopApplications" class="button is-info is-outlined">View Page</a>
                </div>
                <div class="service mb-6">
                    <div class="icon mb-2">
                        <i class="fa-solid fa-brain is-size-2"></i>
                    </div>
                    <h3 class="is-size-3">Artificial Intelligence</h3>
                    <p class="is-size-5 mb-3">Check out our options for artifical intelligence</p>
                    <a href="/services/artificialIntelligence" class="button is-info is-outlined">View Page</a>
                </div>
                <div class="service mb-6">
                    <div class="icon mb-2">
                        <i class="fa-solid fa-gears is-size-2"></i>
                    </div>
                    <h3 class="is-size-3">Full Systems</h3>
                    <p class="is-size-5 mb-3">Check out our options for full systems</p>
                    <a href="/services/fullSystem" class="button is-info is-outlined">View Page</a>
                </div>
                <div class="service mb-6">
                    <div class="icon mb-2">
                        <i class="fa-solid fa-gears is-size-2"></i>
                    </div>
                    <h3 class="is-size-3">More Services</h3>
                    <p class="is-size-5 mb-3">Check out everything else we have to offer. There's so much more.</p>
                    <a href="/services/otherServices" class="button is-info is-outlined">View Page</a>
                </div>
            </section>
            <section>
                <a href="/demos">
                    <div id="services-demos">
                        <h2 class="subtitle is-size-2">View Demos</h2>
                    </div>
                </a>
            </section>
        </main>
    ` }, req)
}

export default indexPage