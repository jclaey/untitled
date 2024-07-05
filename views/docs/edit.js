import layout from "../layout.js"

const docsEditPage = ({ doc, errors, values = {} }, req) => {
    return layout({ template: `
        <main>
            <section>
                
            </section>
        </main>    
    ` })
}

export default docsEditPage