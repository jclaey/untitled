import layout from "../layout.js"

const websiteServicesPage = (req) => {
    return layout({ template: `
        <main id="websites" class="services">
            <div class="page-title-div">
                <h1 class="title is-size-1">
                    <span class="pipe">|</span> Websites <span class="pipe">|</span>
                </h1>
            </div>
            <section class="container mb-6">
                <div class="columns mb-6">
                    <div class="column">
                        <div class="columns">
                            <div class="column logos">
                                <i class="fa-brands fa-js" title="JavaScript"></i>
                                <i class="fa-brands fa-html5" title="HTML5"></i>
                                <i class="fa-brands fa-css3" title="CSS3"></i>
                            </div>
                        </div>
                        <div class="columns">
                            <div class="column logos">
                                <i class="fa-brands fa-wordpress" title="Wordpress"></i>
                            </div>
                        </div>
                    </div>
                    <div class="column">
                        <div class="container mt-4">
                            <p class="block has-text-weight-medium is-size-5">
                                We would love to build your new website! Looking for something less complex than a web app? We've got you covered! 
                                We can build you a site from scratch using HTML, CSS, and JavaScript or using a CMS, such as Wordpress.
                            </p>
                            <p class="block has-text-weight-medium is-size-5">
                                Need a front end application? We can build those too! Written completely from scratch, or using the assistance of 
                                libraries and APIs, we can build you something truly unique.
                            </p>
                            <div>
                                <a href="/websites-demos"><span class="tag has-text-white is-large" id="demos-tag">Demos</span></a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section class="mb-6">
                <a href="/quotes">
                    <div id="services-demos">
                        <h2 class="subtitle is-size-2">Get A Free Quote</h2>
                    </div>
                </a>
            </section>
            <section class="container" id="pricing">
                <h2 class="is-size-2">Website Services</h2>
                <hr>
                <div class="columns">
                    <div class="column">
                        <div class="card">
                            <div class="card-content">
                                <div class="content">
                                    <div>
                                        <div class="table-price">
                                            <strong><span class="is-size-2 has-text-info">$99</span></strong>
                                            <br />
                                            <span class="is-size-3 has-text-info">Informational Website</span>
                                        </div>
                                        <div class="has-text-center is-size-5 table-pricing-feature">
                                            <i class="fa-solid fa-check pr-3 is-size-3 has-text-success"></i> Basic, informational website
                                        </div>
                                        <div class="has-text-center is-size-5 table-pricing-feature">
                                            <i class="fa-solid fa-check pr-3 is-size-3 has-text-success"></i> 3 pages: Home, about, contact
                                        </div>
                                        <div class="has-text-center is-size-5 table-pricing-feature">
                                            <i class="fa-solid fa-check pr-3 is-size-3 has-text-success"></i> Domain name of your choice*
                                        </div>
                                        <div class="has-text-center is-size-5 table-pricing-feature mb-5">
                                            <i class="fa-solid fa-check pr-3 is-size-3 has-text-success"></i> Website published
                                        </div>
                                        <div class="pricing-btn mb-5">
                                            <a href="" class="button is-info is-medium">Select Option</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="column">
                        <div class="card">
                            <div class="card-content">
                                <div class="content">
                                    <div>
                                        <div class="table-price">
                                            <strong><span class="is-size-2 has-text-info">$99</span></strong>
                                            <br />
                                            <span class="is-size-3 has-text-info">Informational Website</span>
                                        </div>
                                        <div class="has-text-center is-size-5 website-pricing-feature">
                                            <i class="fa-solid fa-check pr-3 is-size-3 has-text-success"></i> Basic, informational site
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="column">
                        <div class="card">
                            <div class="card-content">
                                <div class="content">
                                    <div>
                                        <div class="table-price">
                                            <strong><span class="is-size-2 has-text-info">$99</span></strong>
                                            <br />
                                            <span class="is-size-3 has-text-info">Informational Website</span>
                                        </div>
                                        <div class="has-text-center is-size-5 website-pricing-feature">
                                            <i class="fa-solid fa-check pr-3 is-size-3 has-text-success"></i> Basic, informational site
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    ` }, req)
}

export default websiteServicesPage