import layout from "../layout.js"

const adminIndexPage = ({ docs }, req) => {
    const recentDocs = []
    const myDocs = []

    docs.map((doc, index) => {
        if (index >= docs.length - 3) {
            recentDocs.push(doc)
        }
        
        // adminId
        if (req && req.session && req.session.adminId === String(doc.author)) {
            myDocs.push(doc)
        }
    })

    const renderedDocs = docs => {
        return docs.map(doc => {
            return `
                <article class="media">
                    <figure class="media-left">
                        <p class="image is-128x128">
                            <img src="${doc.image.path}" />
                        </p>
                    </figure>
                    <div class="media-content">
                        <div class="content">
                            <p>
                                <a href="/docs/doc/${doc._id}"><strong>${doc.title}</strong></a> <br />
                                <small>${doc.type}</small> <strong>in</strong> <small>${doc.category}</small> <br />
                                <strong>${doc.description.slice(0, 50)}${doc.description.length > 50 ? '...' : ''}</strong> <br />
                                <small>Posted ${doc.created_at.toLocaleDateString('en-US')} at ${doc.created_at.toLocaleTimeString('en-US')}</small>
                            </p>
                        </div>
                    </div>
                    <div class="media-righ"></div>
                </article>
            `
        }).join('')
    }

    return layout({ template: `
        <main>
            <section class="container">
                <div class="mb-6 page-title-div">
                    <h1 class="title is-size-1">
                        <span class="pipe">|</span> Admin Area <span class="pipe">|</span>
                    </h1>
                </div>
                <div class="columns">
                    <div class="column">
                        <div id="admin-index-posts-area">
                            <div class="box">
                                <h3 class="is-size-4 mb-5">Most Recent Docs</h3>
                                <div>
                                    ${renderedDocs(recentDocs)}
                                </div>
                            </div>
                            <div class="box">
                                <h3 class="is-size-4 mb-5">Your Docs</h3>
                                <div>
                                    ${renderedDocs(myDocs)}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="column">

                    </div>
                </div>
            </section>
        </main>
    ` }, req)
}

export default adminIndexPage