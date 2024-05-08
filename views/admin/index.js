import layout from "../layout.js"

const indexPage = () => {
    return layout({ template: `
        <main>
            <section class="container">
                <h1 class="title is-size-1 mb-6">Admin Area</h1>
                <div class="columns">
                    <div class="column">
                        <div id="admin-index-posts-area" class="level">
                            <div class="level-item">
                                <div class="box">
                                    <h3 class="is-size-4 mb-3">Most Recent Docs</h3>
                                    <div>
                                        <article class="media">
                                            <div class="media-content">
                                                <div class="content">
                                                    I need content
                                                </div>
                                            </div>
                                        </article>
                                    </div>
                                </div>
                            </div>
                            <div class="level-item">
                                <div class="box">
                                    <h3 class="is-size-4 mb-3">Your Docs</h3>
                                    <div>
                                        <article class="media">
                                            <div class="media-content">
                                                <div class="content">
                                                    I need content
                                                </div>
                                            </div>
                                        </article>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="column">

                    </div>
                </div>
            </section>
        </main>
    ` })
}

export default indexPage