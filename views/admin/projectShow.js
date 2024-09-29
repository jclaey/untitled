import layout from "../layout.js"

const projectShowPage = ({ project }, req) => {
    return layout({ template: `
        <main class="container">
            <div class="page-title-div" id="admin-index-page-title">
                <h1 class="title is-size-1">
                    <span class="pipe pr-2">|</span>${project.title}<span class="pipe pl-2">|</span>
                </h1>
            </div>
            <section>
                <div class="columns">
                    <div class="column">
                        <article class="media box">
                            <div class="media-content">
                                <div class="content">
                                    <div class="mb-4">
                                        <h3 class="subtitle is-size-3">Project Details</h3>
                                    </div>
                                    <div class="mb-4">
                                        <span class="is-size-4">${project.title}</span>
                                    </div>
                                    <div class="mb-2 box">
                                        <h4>Project User Details</h4>
                                        <span class="is-size-5">${project.user.firstName}</span><br />
                                        <span class="is-size-5">${project.user.lastName}</span>
                                    </div>
                                </div>
                            </div>
                        </article>
                    </div>
                    <div class="column">
                        <article class="media box">
                            <div class="media-content">
                                <div class="content">

                                </div>
                            </div>
                        </article>
                    </div>
                </div>
            </section>
        </main>    
    ` }, req)
}

export default projectShowPage