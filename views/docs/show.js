import layout from "../layout.js"

const showDocPage = ({ doc }, req) => {
    return layout({ template: `
        <main class="container">
            <section>
                <div class="mb-6 page-title-div">
                    <h1 class="title is-size-1">
                        <span class="pipe">|</span> ${doc.title} <span class="pipe">|</span>
                    </h1>
                </div>
                <div class="mb-6">
                    <p class="has-text-centered">
                        <span>By: <strong>${doc.author.email}</strong></span>
                    </p>
                    <p class="has-text-centered">
                        <span><small>${doc.type}</small> <strong>in</strong> <small>${doc.category}</small></span>
                    </p>
                </div>
                <div class="mb-6" id="doc-featured-image">
                    <figure class="image">
                        <img src="${doc.image.path}" alt="" />
                    </figure>
                </div>
            </section>
            <section class="section">
                ${doc.content}
            </section>
        </main>
    ` })
}

export default showDocPage