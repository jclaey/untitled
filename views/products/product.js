import layout from "../layout.js"

const productPage = (req) => {
    return layout({ template: `
        <main>
            <section></section>
        </main>
    ` }, req)
}

export default productPage