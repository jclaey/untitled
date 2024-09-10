import layout from "../layout.js"

const docsIndexPage = ({ docs }, req) => {
    const knowledgeBaseArticles = docs.filter(doc => doc.type === 'Knowledge Base Article')
    
    const renderedArticles = knowledgeBaseArticles.length === 0 ? '' : knowledgeBaseArticles.map(article => {
        return `
            <article class="media box">
                <figure class="media-left">
                    <p class="image is-128x128">
                        <img src="${article.image.path}" alt="article image" />
                    </p>
                </figure>
                <div class="media-content">
                    <div class="content">
                        <p>
                            <a href="/docs/doc/${article._id}"><strong>${article.title}</strong></a>
                            <br />
                            by <strong>${article.author.email}</strong>
                            <br />
                            <small>${article.type}</small> <strong>in</strong> <small>${article.category}</small>
                        </p>
                        <p>
                            ${article.description}
                        </p>
                        <p>
                            <small>Posted ${article.created_at.toLocaleDateString('en-US')} at ${article.created_at.toLocaleTimeString('en-US')}</small>
                        </p>
                    </div>
                </div>
            </article>
        `
    }).join('')

    const blogPosts = docs.filter(doc => doc.type === 'Blog Post')

    const renderedBlogPosts = blogPosts.length === 0 ? '' : blogPosts.map(post => {
        return `
            <article class="media box">
                <figure class="media-left">
                    <p class="image is-128x128">
                        <img src="${post.image.path}" alt="article image" />
                    </p>
                </figure>
                <div class="media-content">
                    <div class="content">
                        <p>
                            <a href="/docs/doc/${post._id}"><strong>${post.title}</strong></a>
                            <br />
                            by <strong>${post.author.email}</strong>
                            <br />
                            <small>${post.type}</small> <strong>in</strong> <small>${post.category}</small>
                        </p>
                        <p>
                            ${post.description}
                        </p>
                        <p>
                            <small>Posted ${post.created_at.toLocaleDateString('en-US')} at ${post.created_at.toLocaleTimeString('en-US')}</small>
                        </p>
                    </div>
                </div>
            </article>
        `
    }).join('')

    return layout({ template: `
        <main class="container">
            <section id="docs-index-section">
                <div class="page-title-div">
                    <h1 class="title is-size-1">
                        <span class="pipe">|</span> Docs and Stuff <span class="pipe">|</span>
                    </h1>
                </div>
                <div class="columns mt-6">
                    <div class="column mt-6">
                        <h2 class="is-size-3">Latest Knowledge Base Articles</h2>
                        <hr>
                        ${renderedArticles}
                    </div>
                    <div class="column mt-6">
                        <h2 class="is-size-3">Latest Blog Posts</h2>
                        <hr>
                        ${renderedBlogPosts}
                    </div>
                </div>
            </section>
        </main>
    ` }, req)
}

export default docsIndexPage