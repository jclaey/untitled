import layout from "../layout.js"

const adminIndexPage = ({ docs, products }, req) => {
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

    const renderedProducts = products => {
        return products.map(product => {
            return `
                <article class="media">
                    <figure class="media-left">
                        <p class="image is-128x128">
                            <img src="https://drive.google.com/thumbnail?id=${product.imageId}" />
                        </p>
                    </figure>
                    <div class="media-content">
                        <div class="content">
                            <p>
                                <a href="/docs/doc/${product._id}"><strong>${product.title}</strong></a> <br />
                                <small>${product.description}</small> <br />
                                <strong>${product.description.slice(0, 50)}${product.description.length > 50 ? '...' : ''}</strong> <br />
                                <small>Posted ${product.created_at.toLocaleDateString('en-US')} at ${product.created_at.toLocaleTimeString('en-US')}</small>
                            </p>
                        </div>
                    </div>
                    <div class="media-right"></div>
                </article>
            `
        })
    }

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
                    <div class="media-right"></div>
                </article>
            `
        }).join('')
    }

    return layout({ template: `
        <main>
            <section class="container">
                <div class="page-title-div" id="admin-index-page-title">
                    <h1 class="title is-size-1">
                        <span class="pipe">|</span> Admin Area <span class="pipe">|</span>
                    </h1>
                </div>
                <div id="admin-index-sub-nav">
                    <div class="level ml-2">
                        <button class="button is-link level-item">
                            <a href="#my-docs" class="has-text-white">My Posts</a>
                        </button>
                        <button class="button is-link level-item">
                            <a href="#my-products" class="has-text-white">My Products</a>
                        </button>
                    </div>
                </div>
                <div class="columns">
                    <div class="column">
                        <div id="admin-index-posts-area">
                            <div class="box" id="recent-docs">
                                <h3 class="is-size-4 mb-5">Most Recent Docs</h3>
                                <div>
                                    ${renderedDocs(recentDocs)}
                                </div>
                            </div>
                            <div class="box" id="my-docs">
                                <h3 class="is-size-4 mb-5">Your Docs</h3>
                                <div>
                                    ${renderedDocs(myDocs)}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="column">
                        <div id="admin-index-posts-area">
                            <div class="box">
                                <h3 class="is-size-4 mb-5">Your Products</h3>
                                <div id="my-products">
                                    ${renderedProducts(products)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    ` }, req)
}

export default adminIndexPage