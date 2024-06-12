import layout from "../layout.js"

const indexPage = (req) => {
    return layout({ template: `
        <main class="container">
            <div class="mb-6 page-title-div">
                <h1 class="title is-size-1">
                    <span class="pipe">|</span> Services <span class="pipe">|</span>
                </h1>
            </div>
            <section id="services-page-links" class="pb-6">
                <div class="columns">
                    <div class="column">
                        <div class="columns">
                            <div class="column">
                                <div class="card mb-4 service">
                                    <div class="card-image">
                                        <figure class="image is-4by3">
                                            <a href="/services/websites">
                                                <img src="/resources/images/services_websites.png" />
                                            </a>
                                        </figure>
                                    </div>
                                    <div class="card-content">
                                        <div class="content">
                                            Websites
                                        </div>
                                    </div>
                                </div>
                                <div class="card mb-4 service">
                                    <div class="card-image">
                                        <figure class="image is-4by3">
                                            <a href="/services/webApplications">
                                                <img src="/resources/images/services_web_applications.png" />
                                            </a>
                                        </figure>
                                    </div>
                                    <div class="card-content">
                                        <div class="content">
                                            Web Applications
                                        </div>
                                    </div>
                                </div>
                                <div class="card service">
                                    <div class="card-image">
                                        <figure class="image is-4by3">
                                            <img src="/resources/images/full-systems.png" />
                                        </figure>
                                    </div>
                                    <div class="card-content">
                                        <div class="content">
                                            Full Systems
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="column">
                                <div class="card mb-4 service">
                                    <div class="card-image">
                                        <figure class="image is-4by3">
                                            <a href="/services/mobileApplications">
                                                <img src="/resources/images/services_mobile_applications.png" />
                                            </a>
                                        </figure>
                                    </div>
                                    <div class="card-content">
                                        <div class="content">
                                            Mobile Applications
                                        </div>
                                    </div>
                                </div>
                                <div class="card service">
                                    <div class="card-image">
                                        <figure class="image is-4by3">
                                            <img src="/resources/images/services_desktop_applications.png" />
                                        </figure>
                                    </div>
                                    <div class="card-content">
                                        <div class="content">
                                            Desktop Applications
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
                                        <figure class="image is-4by3">
                                            <img src="/resources/images/services_augmented_reality.png" />
                                        </figure>
                                    </div>
                                    <div class="card-content">
                                        <div class="content">
                                            Augmented Reality
                                        </div>
                                    </div>
                                </div>
                                <div class="card service">
                                    <div class="card-image">
                                        <figure class="image is-4by3">
                                            <img src="/resources/images/services_virtual_reality.png" />
                                        </figure>
                                    </div>
                                    <div class="card-content">
                                        <div class="content">
                                            Virtual Reality
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="column">
                                <div class="card mb-4 service">
                                    <div class="card-image">
                                        <figure class="image is-4by3">
                                            <img src="/resources/images/services_blockchain.png" />
                                        </figure>
                                    </div>
                                    <div class="card-content">
                                        <div class="content">
                                            Blockchain
                                        </div>
                                    </div>
                                </div>
                                <div class="card service">
                                    <div class="card-image">
                                        <figure class="image is-4by3">
                                            <img src="/resources/images/services_artificial_intelligence.png" />
                                        </figure>
                                    </div>
                                    <div class="card-content">
                                        <div class="content">
                                            Artificial Intelligence
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