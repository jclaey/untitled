import layout from "./layout.js"

const successPage = () => {
    return layout({ template: `
        <main class="container">
            <div>
                <p>Success! Your message was sent successfully!</p>
            </div>
        </main>
    ` })
}

export default successPage