import layout from "../layout.js"

const otherServicesPage = ({}, req) => {
    return layout({ template: `
        <main>
            <div class="mb-2 is-size-5 ml-5">
                <a href="/services">
                    <i class="fa-solid fa-left-long pr-1"></i> Back to services
                </a>
            </div>
            <div class="page-title-div">
                <h1 class="title is-size-1">
                    <span class="pipe">|</span> Other Services <span class="pipe">|</span>
                </h1>
            </div>
            <section class="container mb-6">
                <div class="mb-6">
                    <div class="mt-4">
                        <div class="tabs">
                            <ul>
                                <li class="is-active consultations-tab is-size-5">
                                    <a>
                                        <i class="fa-solid fa-people-arrows pr-2"></i> Consultations
                                    </a>
                                </li>
                                <li class="web-management-tab is-size-5">
                                    <a>
                                        <i class="fa-solid fa-laptop-code pr-2"></i> Website Management
                                    </a>
                                </li>
                                <li class="tutorials-tab is-size-5">
                                    <a>
                                        <i class="fa-solid fa-person-chalkboard pr-2"></i> Tutorials
                                    </a>
                                </li>
                                <li class="web-hosting-tab is-size-5">
                                    <a>
                                        <i class="fa-solid fa-server pr-2"></i> Web Hosting
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <div class="consultations-tab tab-content">
                                <div class="mb-6">
                                    <h2 class="title is-size-2">Consultations</h2>
                                </div>
                                <div class="container-width">
                                    <p class="block has-text-weight-medium is-size-5 ml-3">
                                        We offer consultations! Having trouble with your code? Just can't get your website to work? 
                                        We can help! We offer video, phone, text, email (however you like to connect) consultations at an extremely 
                                        reasonable price!
                                    </p>
                                </div>
                            </div>
                            <div class="web-management-tab tab-content">
                                <div class="mb-6">
                                    <h2 class="title is-size-2">Website Management</h2>
                                </div>
                                <div class="columns">
                                    <div class="column services-logos">
                                        <i class="fa-brands fa-cpanel pr-5"></i>
                                        <i class="fa-brands fa-aws"></i>
                                    </div>
                                    <div class="column">
                                        <div class="container">
                                            <p class="block has-text-weight-medium is-size-5">
                                                We offer website management!
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="tutorials-tab tab-content">
                                <div class="mb-6">
                                    <h2 class="title is-size-2">Tutorials</h2>
                                </div>
                                <div class="container-width">
                                    <p class="block has-text-weight-medium is-size-5 ml-3">
                                        Want to learn HTML? CSS? JavaScript? We can teach you! We can teach a variety of topics 
                                        related to technology and web development. Below is a list of topics we currently teach:
                                    </p>
                                    <div id="tags" class="mb-5 ml-3">
                                        <span class="tag is-medium is-primary">HTML</span>
                                        <span class="tag is-medium is-warning">CSS</span>
                                        <span class="tag is-medium is-danger">JavaScript</span>
                                        <span class="tag is-medium is-info">Building Web Pages</span>
                                        <span class="tag is-medium is-dark">Deploying Web Sites</span>
                                    </div>
                                    <div>
                                        <p class="block has-text-weight-medium is-size-5 ml-3">
                                            We also offer FREE blog posts and articles to read about many of these topics in our <a href="/docs">Docs</a> section!
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div class="web-hosting-tab tab-content">
                                <div class="mb-6">
                                    <h2 class="title is-size-2">Web Hosting</h2>
                                </div>
                                <div class="container-width">
                                    <p class="block has-text-weight-medium is-size-5 ml-3">
                                        We also offer comprehensive web hosting!
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <a href="/demos"><span class="tag has-text-white is-large" id="demos-tag">Demos</span></a>
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

export default otherServicesPage