import layout from "../layout.js"

const indexPage = () => {
    return layout({ template: `
        <main class="container">
            <section>
                <div class="mb-6">
                    <h1 class="title is-size-1">Docs and Stuff</h1>
                </div>
                <div class="columns">
                    <div class="column">
                        <h2 class="is-size-3">Latest Knowledge Base</h2>
                        <hr>
                    </div>
                    <div class="column">
                        <h2 class="is-size-3">Latest Blog Posts</h2>
                        <hr>
                    </div>
                </div>
            </section>
        </main>
    ` })
}

export default indexPage