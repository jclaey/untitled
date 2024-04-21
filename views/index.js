import layout from "./layout.js"

const indexPage = () => {
    return layout({ template: `
            <main>
                <h1 class="title is-size-1">Untitled Project</h1>
            </main>
        `
    })
}

export default indexPage