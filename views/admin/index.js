import layout from "../layout.js"

const indexPage = (req) => {
    return layout({ template: `
        <main>
            <section class="container">
                <div class="mb-6 page-title-div">
                    <h1 class="title is-size-1">
                        <span class="pipe">|</span> Admin Area <span class="pipe">|</span>
                    </h1>
                </div>
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
    ` }, req)
}

export default indexPage