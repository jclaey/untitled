import layout from "../layout.js"

const websitesServicesPage = () => {
    return layout({ template: `
        <main id="websites">
            <div class="mb-6 page-title-div">
                <h1 class="title is-size-1">
                    <span class="pipe">|</span> Websites <span class="pipe">|</span>
                </h1>
            </div>
            <section class="container">
                <div class="columns">
                    <div class="column">
                        <div class="columns">
                            <div class="column">
                                <i class="fa-brands fa-js"></i>
                                <i class="fa-brands fa-html5"></i>
                                <i class="fa-brands fa-css3"></i>
                            </div>
                        </div>
                        <div class="columns"></div>
                    </div>
                    <div class="column"></div>
                </div>
            </section>
        </main>
    ` })
}

export default websitesServicesPage