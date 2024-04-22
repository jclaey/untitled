import layout from "./layout.js"

const indexPage = () => {
    return layout({ template: `
            <main>
                <section id="showcase-area" class="hero">
                    <div class="hero-body">
                        <div class="columns">
                            <div class="column">
                                <p class="title">Web Solutions</p>
                                <p class="subtitle">Solutions for the web...</p>
                            </div>
                            <div class="column mt-5">
                                <div class="column-group">
                                    <h3 class="is-size-3">Platforms</h3>
                                    <hr>
                                    <div class="icon-group">
                                        <div class="icon icon-first">
                                            <i class="fa-solid fa-mobile pr-2"></i>
                                            <small>Mobile</small>
                                        </div>
                                        <div class="icon icon-mid">
                                            <i class="fa-solid fa-desktop pr-2"></i>
                                            <small>Desktop</small>
                                        </div>
                                        <div class="icon icon-mid">
                                            <i class="fa-solid fa-vr-cardboard pr-2"></i>
                                            <small>Virtual</small>
                                        </div>
                                        <div class="icon icon-last">
                                            <i class="fa-solid fa-lightbulb pr-2"></i>
                                            <small>I.O.T.</small>
                                        </div>
                                    </div>
                                </div>
                                <div class="column-group">
                                    <h3 class="is-size-3">Fields</h3>
                                    <hr>
                                    <div class="icon-group">
                                        <div class="icon icon-first">
                                            <i class="fa-solid fa-barcode pr-2"></i>
                                            <small>Retail</small>
                                        </div>
                                        <div class="icon icon-mid">
                                            <i class="fa-solid fa-credit-card pr-2"></i>
                                            <small>Finance</small>
                                        </div>
                                        <div class="icon icon-mid">
                                            <i class="fa-solid fa-scale-balanced pr-2"></i>
                                            <small>Law</small>
                                        </div>
                                        <div class="icon icon-last">
                                            <i class="fa-solid fa-school pr-2"></i>
                                            <small>Education</small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        `
    })
}

export default indexPage