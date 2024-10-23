import layout from "../layout.js"

const artficialIntelligenceServicesPage = ({}, req) => {
    return layout({ template: `
        <main>
            <div class="mb-2 is-size-5 ml-5">
                <a href="/services">
                    <i class="fa-solid fa-left-long pr-1"></i> Back to services
                </a>
            </div>
            <div class="page-title-div">
                <h1 class="title is-size-1">
                    <span class="pipe">|</span> Artificial Intelligence <span class="pipe">|</span>
                </h1>
            </div>
            <section class="container mb-6">
                <div class="columns mb-6">
                    <div class="column">
                        <img src="/resources/images/tensorflow_js_logo.png" alt="Tensorflow JS logo" class="service-logo mr-6" />
                        <img src="/resources/images/openai-logo.webp" alt="OpenAI logo" class="service-logo" />
                    </div>
                    <div class="column">
                        <div class="container mt-4">
                            <p class="block has-text-weight-medium is-size-5">
                                 We would love to build you a website or web application stuffed with AI tech! From natural language 
                                processing and advanced chatbots to spam detection, we can build you the AI app of your dreams.
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

export default artficialIntelligenceServicesPage