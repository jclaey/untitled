import layout from "../layout.js"

const docsIndexPage = ({ docs }, req) => {
    let filteredDocs
    let knowledgeBaseArticles
    let renderedArticles
    let blogPosts
    let renderedBlogPosts

    if (docs.isFiltered) {    
        if (docs.docs.length > 0) {
            filteredDocs = docs.docs.map(doc => {
                let boldTitle
                let boldDescription
                let boldContent

                if (doc.title.toLowerCase().includes(docs.inputValue)) {
                    let index = doc.title.toLowerCase().indexOf(docs.inputValue)
                    let titleArr = doc.title.split('')
                    titleArr.splice(index, 0, '<strong class="has-text-info">')
                    titleArr.splice(index + docs.inputValue.length + 1, 0, '</strong>')
                    boldTitle = titleArr.join('')
                }

                if (boldTitle) {
                    doc.title = boldTitle
                }

                if (doc.description.toLowerCase().includes(docs.inputValue)) {
                    let index = doc.description.toLowerCase().indexOf(docs.inputValue)
                    let descArr = doc.description.split('')
                    descArr.splice(index, 0, '<strong class="has-text-info">')
                    descArr.splice(index + docs.inputValue.length + 1, 0, '</strong>')
                    boldDescription = descArr.join('')
                }

                if (boldDescription) {
                    doc.description = boldDescription
                }

                if (doc.content.toLowerCase().includes(docs.inputValue)) {
                    let index = doc.content.toLowerCase().indexOf(docs.inputValue)
                    let contentArr = doc.content.split('')
                    contentArr.splice(index, 0, '<strong class="has-text-info">')
                    contentArr.splice(index + docs.inputValue.length + 1, 0, '</strong>')
                    boldContent = contentArr.join('')
                }

                if (boldContent) {
                    doc.content = boldContent
                }

                return `
                    <article class="media box">
                        <figure class="media-left">
                            <p class="image is-128x128">
                                <img src="${doc.image.path}" alt="article image" />
                            </p>
                        </figure>
                        <div class="media-content">
                            <div class="content">
                                <p>
                                    <a href="/docs/doc/${doc._id}">${doc.title}</a>
                                    <br />
                                    by <strong>
                                        ${doc.author.email} 
                                    </strong>
                                    <br />
                                    <small>${doc.type}</small> <strong>in</strong> <small>${doc.category}</small>
                                </p>
                                <p>
                                    ${doc.description}
                                </p>
                                <p>
                                    <small>Posted ${doc.created_at.toLocaleDateString('en-US')} at ${doc.created_at.toLocaleTimeString('en-US')}</small>
                                </p>
                            </div>
                        </div>
                    </article>
                `
            }).join('')
        } else {
            filteredDocs = ''
        }
    } else {
        knowledgeBaseArticles = docs.filter(doc => doc.type === 'Knowledge Base Article')
    
        renderedArticles = knowledgeBaseArticles.length === 0 ? '' : knowledgeBaseArticles.map(article => {
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

        blogPosts = docs.filter(doc => doc.type === 'Blog Post')

        renderedBlogPosts = blogPosts.length === 0 ? '' : blogPosts.map(post => {
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
    }

    return layout({ template: `
        <main class="container">
            <section id="docs-index-section">
                <div class="page-title-div">
                    <h1 class="title is-size-1">
                        <span class="pipe">|</span> Docs and Stuff <span class="pipe">|</span>
                    </h1>
                </div>
                <div id="docs-search-container">
                    <div class="login-section mb-6">
                        <form class="login-form">
                            <div class="field">
                                <label for="search">
                                    <h3 class="is-size-3">Search Docs</h3>
                                </label>
                                <div class="search-group">
                                    <input type="search" class="input" id="search" name="search" placeholder="Start typing..." />
                                    <button type="button" class="button is-medium mr-3" id="filter-btn">
                                        <i class="fa-solid fa-sliders pr-2"></i> Filter
                                    </button>
                                    <button class="button is-info" type="button" id="apply-filters">Search</button>
                                </div>
                            </div>
                            <div id="filters"></div>
                        </form>
                    </div>
                </div>
                <div class="columns mt-6">
                    ${filteredDocs !== undefined && filteredDocs === '' ? `<div class="column"><p class="is-size-4 has-text-centered">No docs found.</p></div>` : filteredDocs !== undefined && filteredDocs !== '' ? `
                            <div class="column mt-6">
                                <h2 class="is-size-3">Search Results: </h2><br />
                                ${filteredDocs}
                            </div>
                        ` : `
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
                    `}
                </div>
            </section>
        </main>
    ` }, req)
}

export default docsIndexPage