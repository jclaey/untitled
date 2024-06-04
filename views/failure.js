import layout from "./layout.js"

const failurePage = (req) => {
    return layout({ template: `
        <main class="container">
            <div>
                <p>Failure! We could not complete the request successfully.</p>
            </div>
        </main>
    ` }, req)
}

export default failurePage