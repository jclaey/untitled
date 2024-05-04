import layout from "./layout.js"

const successPage = () => {
    return layout({ template: `
        <div>
            <p>Success! Your message was sent successfully!</p>
        </div>
    ` })
}

export default successPage