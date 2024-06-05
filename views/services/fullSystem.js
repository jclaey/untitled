import layout from "../layout.js"

const fullSystemServicesPage = (req) => {
    return layout({ template: `
        <main id="websites" class="services">
            <div class="mb-6 page-title-div">
                <h1 class="title is-size-1">
                    <span class="pipe">|</span> Full System <span class="pipe">|</span>
                </h1>
            </div>
            <section class="container mb-6">
                <div class="columns mb-6">
                    <div class="column">
                        <div class="columns">
                            <div class="column logos">
                                <div id="popover6" class="popover" popover>Node JS</div>
                                <i class="fa-brands fa-node-js" id="popover-target6"></i>
                            </div>
                        </div>
                        <div class="columns">
                            <div class="column logos">
                                <div id="popover1" class="popover" popover>Raspberry Pi - Internet of Things</div>
                                <i class="fa-brands fa-raspberry-pi" id="popover-target1"></i>
                                <i class="fa-solid fa-plus"></i>
                                <div id="popover2" class="popover" popover>React Native - Mobile Apps</div>
                                <i class="fa-brands fa-react" id="popover-target2"></i>
                                <i class="fa-solid fa-plus"></i>
                                <div id="popover3" class="popover" popover>Electron - Desktop Applications</div>
                                <img src="/resources/images/electron_logo.png" alt="Electron logo" id="popover-target3" class="logo" />
                            </div>
                        </div>
                        <div class="columns">
                            <div class="column logos">
                                <i class="fa-solid fa-plus"></i>
                                <div id="popover4" class="popover" popover>Tensorflow - Artificial Intelligence</div>
                                <img src="/resources/images/tensorflow_js_logo.png" alt="Tensorflow JS logo" id="popover-target4" class="logo" />
                                <i class="fa-solid fa-plus"></i>
                                <div id="popover5" class="popover" popover>WebXR - Augmented and Virtual Reality</div>
                                <img src="/resources/images/webxr_logo.jpg" alt="WebXR logo" id="popover-target5" class="logo" />
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