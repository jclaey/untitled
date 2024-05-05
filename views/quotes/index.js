import layout from "../layout.js"

const newQuotePage = () => {
    return layout({ template: `
        <main>
            <section>
                <h1 class="title is-size-1">Get A Free Quote</h1>
            </section>
        </main>
    ` })
}

export default newQuotePage