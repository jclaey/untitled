import layout from "./layout.js"

const demoPage = () => {
    return layout({ template: `
        <main class="container">
            <div class="mb-6 page-title-div">
                <h1 class="title is-size-1">
                    <span class="pipe">|</span> Demos <span class="pipe">|</span>
                </h1>
            </div>
            <section id="demos">
                <div id="retail-demos" class="mb-6">
                    <div class="mb-5">
                        <h2 class="subtitle is-size-2 mb-2">Retail</h2>
                        <hr class="title-underline">
                    </div>
                    <div class="columns">
                        <div class="column">
                            <div class="card">
                                <div class="card-image">
                                    <figure class="image is-4by3">
                                        <img src="/resources/images/services_web_applications.png" />
                                    </figure>
                                </div>
                                <div class="card-content">
                                    <div class="content">
                                        Barcode Scanner
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="column">
                            <div class="card">
                                <div class="card-image">
                                    <figure class="image is-4by3">
                                        <img src="/resources/images/services_web_applications.png" />
                                    </figure>
                                </div>
                                <div class="card-content">
                                    <div class="content">
                                        Barcode Scanner
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="column"></div>
                        <div class="column"></div>
                    </div>
                </div>
                <div id="retail-demos" class="mb-6">
                    <div class="mb-5">
                        <h2 class="subtitle is-size-2 mb-2">Coming Soon</h2>
                        <hr class="title-underline">
                    </div>
                    <div class="columns">
                        <div class="column">
                            <div class="card">
                                <div class="card-image">
                                    <figure class="image is-4by3">
                                        <img src="/resources/images/services_web_applications.png" />
                                    </figure>
                                </div>
                                <div class="card-content">
                                    <div class="content">
                                        Barcode Scanner
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="column"></div>
                        <div class="column"></div>
                        <div class="column"></div>
                    </div>
                </div>
            </section>
        </main>
    ` })
}

export default demoPage