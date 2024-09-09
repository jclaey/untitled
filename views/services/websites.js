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
                                <a href="/demos"><span class="tag has-text-white is-large" id="demos-tag">Demos</span></a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section>
                <a href="/quotes">
                    <div id="services-demos">
                        <h2 class="subtitle is-size-2">Get A Free Quote</h2>
                    </div>
                </a>
            </section>
        </main>
    ` }, req)
}

export default websiteServicesPage