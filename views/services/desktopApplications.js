import layout from "../layout.js"

const desktopApplicationServicesPage = ({}, req) => {
    return layout({ template: `
        <main>
            <div class="mb-2 is-size-5 ml-5">
                <a href="/services">
                    <i class="fa-solid fa-left-long pr-1"></i> Back to services
                </a>
            </div>
            <div class="page-title-div">
                <h1 class="title is-size-1">
                    <span class="pipe">|</span> Desktop Applications <span class="pipe">|</span>
                </h1>
            </div>
            <section class="container mb-6">
                <div class="columns mb-6">
                    <div class="column">
                        <div class="columns">
                            <div class="column logos">
                                <img src="/resources/images/electron_logo.png" class="service-logo mr-6" />
                                <i class="fa-brands fa-node-js"></i>
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
                                 Let's go ahead and build you that desktop application of your dreams! By harnessing the power of 
                                 Node and Electron, we can do just that!
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

export default desktopApplicationServicesPage