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
                <div class="columns is-desktop">
                    <div class="column">
                        <div class="columns">
                            <div class="column">
                                <div class="card mb-4 service">
                                    <div class="card-image">
                                        <figure class="image is-3by2">
                                            <a href="/services/websites">
                                                <img src="/resources/images/services_websites.png" />
                                            </a>
                                        </figure>
                                    </div>
                                    <div class="card-content">
                                        <div class="content has-text-centered">
                                            <strong><span class="is-size-5"><span class="pipe pr-2">|</span>Websites<span class="pipe pl-2">|</span></span></strong>
                                        </div>
                                    </div>
                                </div>
                                <div class="card service">
                                    <div class="card-image">
                                        <figure class="image is-3by2">
                                            <a href="/services/artificialIntelligence">
                                                <img src="/resources/images/services_artificial_intelligence.png" />
                                            </a>
                                        </figure>
                                    </div>
                                    <div class="card-content">
                                        <div class="content has-text-centered">
                                            <strong><span class="is-size-5"><span class="pipe pr-2">|</span>Artificial Intelligence<span class="pipe pl-2">|</span></span></strong>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="column">
                                <div class="card mb-4 service">
                                    <div class="card-image">
                                        <figure class="image is-3by2">
                                            <a href="/services/webApplications">
                                                <img src="/resources/images/services_web_applications.png" />
                                            </a>
                                        </figure>
                                    </div>
                                    <div class="card-content">
                                        <div class="content has-text-centered">
                                            <strong><span class="is-size-5"><span class="pipe pr-2">|</span>Web Applications<span class="pipe pl-2">|</span></span></strong>
                                        </div>
                                    </div>
                                </div>
                                <div class="card service">
                                    <div class="card-image">
                                        <figure class="image is-3by2">
                                            <a href="/services/fullSystem">
                                                <img src="/resources/images/services_full_systems.png" />
                                            </a>
                                        </figure>
                                    </div>
                                    <div class="card-content">
                                        <div class="content has-text-centered">
                                            <strong><span class="is-size-5"><span class="pipe pr-2">|</span>Full Systems<span class="pipe pl-2">|</span></span></strong>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="column">
                        <div class="columns">
                            <div class="column">
                                <div class="card mb-4 service">
                                    <div class="card-image">
                                        <figure class="image is-3by2">
                                            <a href="/services/mobileApplications">
                                                <img src="/resources/images/services_mobile_applications.png" />
                                            </a>
                                        </figure>
                                    </div>
                                    <div class="card-content">
                                        <div class="content has-text-centered">
                                            <strong><span class="is-size-5"><span class="pipe pr-2">|</span>Mobile Applications<span class="pipe pl-2">|</span></span></strong>
                                        </div>
                                    </div>
                                </div>
                                <div class="card service">
                                    <a href="/services/otherServices">
                                        <div class="card-image" id="other">
                                            <div class="mb-5">
                                                <i class="fa-solid fa-ellipsis is-size-1 has-text-black"></i>
                                            </div>
                                            <p class="">More Services</p>
                                        </div>
                                    </a>
                                    <div class="card-content">
                                        <div class="content has-text-centered">
                                            <strong><span class="is-size-5"><span class="pipe pr-2">|</span>So...much...more!<span class="pipe pl-2">|</span></span></strong>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="column">
                                <div class="card service">
                                    <div class="card-image">
                                        <figure class="image is-3by2">
                                            <a href="/services/desktopApplications">
                                                <img src="/resources/images/services_desktop_applications.png" />
                                            </a>
                                        </figure>
                                    </div>
                                    <div class="card-content">
                                        <div class="content has-text-centered">
                                            <strong><span class="is-size-5"><span class="pipe pr-2">|</span>Desktop Applications<span class="pipe pl-2">|</span></span></strong>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
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