import layout from "../layout.js"

const projectShowPage = ({ project, errors, values = {} }, req) => {
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
                                    <div>
                                        <h3 class="is-size-3">Update Project</h3>
                                    </div>
                                    <form action="/admin/projects/new/" method="" enctype="multipart/form-data" id="project-update-form">
                                        <div class="field mb-4">
                                            <label for="title" class="label">
                                                Title*
                                            </label>
                                            <div class="control">
                                                <input class="input" type="text" id="title" name="title" value="${errors && values.title && values.title !== '' ? values.title : ''}" />
                                            </div>
                                        </div>
                                        <div class="field mb-4">
                                            <label for="description" class="label">
                                                Description*
                                            </label>
                                            <div class="control">
                                                <input class="input" type="text" id="description" name="description" value="${errors && values.description && values.description !== '' ? values.description : ''}" />
                                            </div>
                                        </div>
                                        <div class="field mb-4">
                                            <label for="images" class="label">
                                                Images
                                            </label>
                                            <div class="control">
                                                <input class="input" type="file" accept="images/*" id="images" name="images" />
                                            </div>
                                        </div>
                                        <div class="field mb-4">
                                            <label for="videos" class="label">
                                                Videos
                                            </label>
                                            <div class="control">
                                                <input class="input" type="file" accept="video/*" id="images" name="images" multiple />
                                            </div>
                                        </div>
                                        <div class="field mb-6">
                                            <label for="version" class="label">
                                                Progress
                                            </label>
                                            <div class="control">
                                                <input type="range" id="version" name="version" />
                                            </div>
                                        </div>
                                        <div id="update-btns">
                                            <button class="button is-info" type="submit">Push Update</button>
                                            <button class="button is-warning" type="submit">Save Update For Later</button>
                                        </div>
                                    </form>
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