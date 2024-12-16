import layout from "../layout.js"
import { getErrors } from "../../utils/getErrors.js"

const projectShowPage = ({ project, errors, values = {} }, req) => {
    let renderUpdatesList

    if (project && project.updates && project.updates.length === 0) {
        renderUpdatesList = '<span class="is-size-5">There are no published updates yet</span>'
    } else if (project && project.updates) {
        renderUpdatesList = project.updates.map(update => {
            return `
                <div class="box">
                    <a href="" class="is-size-3">${update.title}</a>
                    <p class="is-size-5">${update.description}</p>
                </div>
            `
        }).join('')
    } else {
        renderUpdatesList = ''
    }

    return layout({ template: `
        <main class="container">
            <div class="page-title-div" id="admin-index-page-title">
                <h1 class="title is-size-1">
                    <span class="pipe pr-2">|</span>${project.title}<span class="pipe pl-2">|</span>
                </h1>
            </div>
            <div>
                ${errors ? 
                    `
                        <div>
                            <div>
                                ${getErrors(errors)}
                            </div>
                        </div>
                    `
                : ''}
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
                                        <div class="mb-3">
                                            <span class="is-size-4">
                                                ${project.title}
                                            </span>
                                        </div>
                                        <div class="mb-3">
                                            <span class="is-size-5 mb-2">
                                                <strong>Project details:</strong> ${project.quoteInfoItem.projectDetails}
                                            </span>
                                        </div>
                                    </div>
                                    <div class="mb-2 box">
                                        <h4>Project User Details</h4>
                                        <span class="is-size-5">${project.quoteInfoItem.firstName}</span><br />
                                        <span class="is-size-5">${project.quoteInfoItem.lastName}</span>
                                    </div>
                                </div>
                            </div>
                        </article>
                        <article class="media box">
                            <div class="media-content">
                                <div class="content">
                                    <div class="mb-4">
                                        <h3 class="subtitle is-size-3">Project Updates</h3>
                                    </div>
                                    <div id="project-updates-list">
                                        ${renderUpdatesList}
                                    </div>
                                </div>
                            </div>
                        </article>
                    </div>
                    <div class="column">
                        <article class="media box">
                            <div class="media-content">
                                <div class="content">
                                    <div class="mb-5">
                                        <h3 class="is-size-3">Update Project</h3>
                                    </div>
                                    <form action="/admin/project/${project.id}" method="POST" id="project-update-form">
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
                                            <label for="version" class="label">
                                                Version
                                            </label>
                                            <div class="control">
                                                <input type="text" id="version" name="version" class="input" />
                                            </div>
                                        </div>
                                        <div class="field mb-6">
                                            <label for="type" class="label">
                                                Type
                                            </label>
                                            <div class="control">
                                                <input type="text" id="type" name="type" class="input" />
                                            </div>
                                        </div>
                                        <div id="update-btns">
                                            <button class="button is-info" type="submit">Publish Update</button>
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