import { decode } from 'html-entities'
import layout from "../layout.js"

const showDocPage = ({ doc }, req) => {
    return layout({ template: `
        <main class="container">
            <section>
                <div class="page-title-div">
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
                        <img src="${doc.image.path}" alt="Featured image" />
                    </figure>
                </div>
            </section>
            <section class="section" id="doc-content-show">
                <div class="mb-6" id="doc-content">
                    ${decode(doc.content)}
                </div>
                <div>
                    ${req && req.session && req.session.adminId ? `
                        <div>
                            <a href="/docs/doc/${doc._id}/edit" class="button is-warning">Edit Doc</a>
                            <a href="/docs/doc/${doc._id}/delete" class="button is-danger">Delete Doc</a>
                        </div>
                    ` : ''}
                </div>
            </section>
        </main>
    `, meta: {
        seo: {
            description: `${doc.description.length > 160 ? doc.description.slice(0, 159) : doc.description}`,
            keywords: `${doc.keywords ? doc.keywords : ''}`
        },
        title: `${doc.title}`
    }, }, req)
}

export default showDocPage