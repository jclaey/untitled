import layout from "./layout.js"

const successPage = (req) => {
    return layout({ template: `
        <main class="container">
            <div>
                <p>Success! Your message was sent successfully!</p>
            </div>
        </main>
    ` }, req)
}

export default successPage