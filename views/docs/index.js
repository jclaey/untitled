import layout from "../layout.js"

const indexPage = () => {
    return layout({ template: `
        <main class="container">
            <section>
                <h1>Docs Index Page</h1>
            </section>
        </main>
    ` })
}

export default indexPage