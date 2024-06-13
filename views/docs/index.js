import layout from "../layout.js"

const indexPage = ({ docs }, req) => {
    const knowledgeBaseArticles = docs.filter(doc => doc.type === 'Knowledge Base Article')
    
    const renderedArticles = knowledgeBaseArticles.length === 0 ? '' : knowledgeBaseArticles.map(article => {
        return `
            <article class="media box">
                <a href="/docs/${article._id}">
                    <figure class="media-left">
                        <p class="image is-128x128">
                            <img src="${article.image.path}" alt="article image" />
                        </p>
                    </figure>
                    <div class="media-content">
                        <div class="content">
                            <p>
                                <strong>${article.title}</strong> by <strong>${String(article.author)}</strong>
                                <br />
                                <small>${article.type}</small> <strong>in</strong> <small>${article.category}</small>
                            </p>
                            <p>
                                ${article.description}
                            </p>
                        </div>
                    </div>
                </a>
            </article>
        `
    }).join('')

    const blogPosts = docs.filter(doc => doc.type === 'Blog Post')
    console.log(blogPosts)

    return layout({ template: `
        <main class="container">
            <section>
                <div class="mb-6 page-title-div">
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
                    </div>
                </div>
            </section>
        </main>
    ` }, req)
}

export default indexPage