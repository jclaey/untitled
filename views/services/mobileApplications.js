import layout from "../layout.js"

const mobileApplicationServicesPage = (req) => {
    return layout({ template: `
        <main id="mobile-applications" class="services">
            <div class="mb-2 is-size-5 ml-5">
                <a href="/services">
                    <i class="fa-solid fa-left-long pr-1"></i> Back to services
                </a>
            </div>
            <div class="page-title-div">
                <h1 class="title is-size-1">
                    <span class="pipe">|</span> Mobile Applications <span class="pipe">|</span>
                </h1>
            </div>
            <section class="container mb-6">
                <div class="columns mb-6">
                    <div class="column">
                        <div class="columns">
                            <div class="column">
                                <i class="fa-brands fa-android"></i>
                                <i class="fa-brands fa-apple"></i>
                                <i class="fa-brands fa-react"></i>
                            </div>
                        </div>
                        <div class="columns">
                            <div class="column">
                                <img src="/resources/images/flutter_logo.png" id="flutter" />
                                <img src="/resources/images/unity_logo.png" id="unity" />
                            </div>
                        </div>
                    </div>
                    <div class="column">
                        <div class="container mt-4">
                            <p class="block has-text-weight-medium is-size-5">
                                We love to build new mobile applications! Whether you're looking for something native on Android or iOS or 
                                cross-platform, using Flutter and Dart, we can create the perfect mobile application for your use case.
                            </p>
                            <p class="block has-text-weight-medium is-size-5">
                                We can now build mobile games with Unity! Get a <a href="/quotes">free quote</a> today! 
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

export default mobileApplicationServicesPage