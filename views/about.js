import layout from "./layout.js"

const aboutPage = () => {
    return layout({ template: `
            <main>
                <section id="">
                    <h1 class="title is-size-1">About Us</h2>
                    <p></p>
                </section>
            </main>
        ` 
    })
}

export default aboutPage