import layout from "../layout.js"

const webApplicationServicesPage = (req) => {
    return layout({ template: `
        <main id="web-applications" class="services">
            <div class="mb-2 is-size-5 ml-5">
                <a href="/services">
                    <i class="fa-solid fa-left-long pr-1"></i> Back to services
                </a>
            </div>
            <div class="page-title-div">
                <h1 class="title is-size-1">
                    <span class="pipe">|</span> Web Applications <span class="pipe">|</span>
                </h1>
            </div>
            <section class="container mb-6">
                <div class="columns mb-6">
                    <div class="column">
                        <div class="columns">
                            <div class="column">
                                <i class="fa-brands fa-node ml-6"></i>
                            </div>
                        </div>
                        <div class="columns">
                            <div class="column">
                            </div>
                        </div>
                    </div>
                    <div class="column">
                        <div class="container mt-4">
                            <p class="block has-text-weight-medium is-size-5">
                               Need a blog app? How about an eCommerce site? A site like this one? Literally any kind of front 
                               end web app or full stack web app you can think of, we can build for you. The web app might just 
                               be our favorite thing to build!
                            </p>
                            <p class="block has-text-weight-medium is-size-5">
                               
                            </p>
                            <p class="block has-text-weight-medium is-size-5">
                               
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

export default webApplicationServicesPage