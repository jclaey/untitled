import layout from "../layout.js"

const websitesDemoPage = (req) => {
    return layout({ template: `
        <main class="container">
            <div class="page-title-div">
                <h1 class="title is-size-1">
                    <span class="pipe">|</span> Website Demos <span class="pipe">|</span>
                </h1>
            </div>
            <section>
                <div class="columns">
                    <div class="column">
                        <div class="card mb-4">
                            <div class="card-image">
                                <figure class="image demo-card-image">
                                    <a href="/websites-demos/toy-stash">
                                        <img src="/resources/images/demos/websites_toy_stash.png" alt="Toy Stash home page" />
                                    </a>
                                </figure>
                            </div>
                            <div class="card-content">
                                <div class="content">
                                    <h2 class="subtitle is-size-3">Website</h1>
                                    <p>A nice website.</p>
                                </div>
                            </div>
                        </div>
                        <div class="card mb-4">
                            <div class="card-image">
                                <figure class="image demo-card-image">
                                    <img src="/resources/images/demos/websites_toy_stash.png" />
                                </figure>
                            </div>
                            <div class="card-content">
                                <div class="content">
                                    <h2 class="subtitle is-size-3">Website</h1>
                                    <p>A nice website.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="column">
                        <div class="card mb-4">
                            <div class="card-image">
                                <figure class="image demo-card-image">
                                    <img src="/resources/images/demos/websites_toy_stash.png" />
                                </figure>
                            </div>
                            <div class="card-content">
                                <div class="content">
                                    <h2 class="subtitle is-size-3">Website</h1>
                                    <p>A nice website.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="column">
                        <div class="card mb-4">
                            <div class="card-image">
                                <figure class="image demo-card-image">
                                    <img src="/resources/images/demos/websites_toy_stash.png" />
                                </figure>
                            </div>
                            <div class="card-content">
                                <div class="content">
                                    <h2 class="subtitle is-size-3">Website</h1>
                                    <p>A nice website.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> 
            </section>
        </main>    
    ` }, req)
}

export default websitesDemoPage