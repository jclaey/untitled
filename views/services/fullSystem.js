import layout from "../layout.js"

const fullSystemServicesPage = (req) => {
    return layout({ template: `
        <main id="websites" class="services">
            <div class="page-title-div">
                <h1 class="title is-size-1">
                    <span class="pipe">|</span> Full System <span class="pipe">|</span>
                </h1>
            </div>
            <section class="container mb-6" id="full-system-section">
                <div class="columns mb-6">
                    <div class="column">
                        <div class="columns">
                            <div class="column logos">
                                <i class="fa-brands fa-node-js" title="Node JS"></i>
                            </div>
                        </div>
                        <div class="columns">
                            <div class="column logos">
                                <i class="fa-brands fa-raspberry-pi" title="Raspberry Pi"></i>
                                <i class="fa-solid fa-plus"></i>
                                <i class="fa-brands fa-react" title="React Native"></i>
                                <i class="fa-solid fa-plus"></i>
                                <img src="/resources/images/electron_logo.png" title="Electron" alt="Electron logo" class="logo" />
                            </div>
                        </div>
                        <div class="columns">
                            <div class="column logos">
                                <i class="fa-solid fa-plus"></i>
                                <img src="/resources/images/tensorflow_js_logo.png" title="Tensorflow JS" alt="Tensorflow JS logo" class="logo" />
                                <i class="fa-solid fa-plus"></i>
                                <img src="/resources/images/webxr_logo.jpg" alt="WebXR logo" class="logo" />
                            </div>
                        </div>
                    </div>
                    <div class="column">
                        <div class="container mt-4">
                            <p class="block has-text-weight-medium is-size-5">
                                We can build your business or enterprise entire systems too! Everything from physical inventory systems, collaboration, 
                                conferencing, and transcription tools, to controlling lighting, sound, or heating and air conditioning. We can do it ALL.
                            </p>
                            <p class="block has-text-weight-medium is-size-5">
                                Leveraging the power, speed, and unmatched flexibility of Node.js, we can create a complete, full, superior system for your business 
                                or enterprise. Because we write it all with the same technologies, you get a consistent product that's easy to use, update, 
                                and scale.
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

export default fullSystemServicesPage