import { decryptStringData } from "../../utils/encrypt.js"
import layout from "../layout.js"

const adminIndexPage = ({ docs, products, projects }, req) => {
    const key = process.env.ENCRYPTION_KEY
    const recentDocs = []
    const myDocs = []

    docs.map((doc, index) => {
        if (index >= docs.length - 3) {
            recentDocs.push(doc)
        }
        
        // adminId
        if (req && req.session && decryptStringData(req.session.adminId, key, req.session.adminIv) === String(doc.author._id)) {
            myDocs.push(doc)
        }
    })

    let renderedProducts

    products ? renderedProducts = products => {
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
    } : ''

    let renderedDocs

    docs ? renderedDocs = docs => {
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
    } : ''

    let renderedProjects 

    projects ? renderedProjects = projects => { 
        return projects.map(project => {

            let user = {
                firstName: decryptStringData(project.user.firstName.split('.')[0], key, project.user.firstName.split('.')[1]),
                lastName: decryptStringData(project.user.lastName.split('.')[0], key, project.user.lastName.split('.')[1])
            }

            const nowDate = Date.now()
            let dueDate = Date.parse(project.quoteInfoItem.dueDate)
            let level
            if (dueDate - nowDate < 604800000) {
                level = 'yellow'
            } else if (dueDate - nowDate < 1209600000) {
                level = 'orange'
            } else if ((dueDate - nowDate) < 2592000000) {
                level = 'yellow'
            } else {
                level = 'green'
            }

            return `
                <article class="media">
                    <div class="media-content">
                        <div class="content">
                            <div class="mb-3">
                                <strong>User:</strong> ${user.firstName} ${user.lastName}
                            </div>
                            <div class="mb-3">
                                <strong>Project Title:</strong> <span id="project-title">${project.title}</span>
                            </div>
                            <div class="mb-3">
                                <strong>Date Quote Created:</strong> ${project.quoteInfoItem.submitted_at.toLocaleDateString()}
                            </div>
                            <div class="mb-3">
                                <strong>Date Project Created:</strong> ${project.created_at.toLocaleDateString()}
                            </div>
                            <div class="mb-3">
                                <strong>Date Due:</strong> <span id="quote-due-date" style="color: ${level}">${project.quoteInfoItem.dueDate.toLocaleDateString()}</span>
                            </div>
                            <div class="mb-3">
                                <strong>Last Update:</strong> <span>There are no updates</span>
                            </div>
                        </div>
                    </div>
                </article>
            `
        }).join('')
    } : ''

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
                                    ${docs ? renderedDocs(recentDocs) : 'There are no docs right now'}
                                </div>
                            </div>
                            <div class="box" id="my-docs">
                                <h3 class="is-size-4 mb-5">Your Docs</h3>
                                <div>
                                    ${docs ? renderedDocs(myDocs) : 'There are no docs right now'}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="column">
                        <div id="admin-index-products-area" class="mb-5">
                            <div class="box">
                                <h3 class="is-size-4 mb-5">Your Products</h3>
                                <div id="my-products">
                                    ${products ? renderedProducts(products) : 'There are no products right now'}
                                </div>
                            </div>
                        </div>
                        <div id="admin-index-projects-area" class="mb-5 is-size-5">
                            <div class="box">
                                <h3 class="is-size-4 mb-5">Active Projects</h3>
                                <div id="my-projects" class="mb-6">
                                    <div id="projects">
                                        ${projects ? renderedProjects(projects) : 'There are no projects right now'}
                                    </div>
                                </div>
                                <div id="project-due-key">
                                    <div>
                                        <label for="moreThanOneMonth">Due date is more than a month away</label>
                                        <div id="moreThanOneMonth" class="colorLevel"></div>
                                    </div>
                                    <div>
                                        <label for="moreThanTwoWeeks">Due date is more than two weeks away</label>
                                        <div id="moreThanTwoWeeks" class="colorLevel"></div>
                                    </div>
                                    <div>
                                        <label for="moreThanOneWeek">Due date is more than one week away</label>
                                        <div id="moreThanOneWeek" class="colorLevel"></div>
                                    </div>
                                    <div>
                                        <label for="lessThanOneWeek">Due date is less than one week away</label>
                                        <div id="lessThanOneWeek" class="colorLevel"></div>
                                    </div>
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