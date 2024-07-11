import layout from "../layout.js"
import { getErrors } from "../../utils/getErrors.js"

const newDocPage = ({ errors, values = {} }, req) => {
    return layout({ template: `
        <main class="container">
            <div class="mb-6 page-title-div">
                <h1 class="title is-size-1">
                    <span class="pipe">|</span> Create A New Doc <span class="pipe">|</span>
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
            <section id="new-doc-form">
                <form class="box" action="/docs/new" method="POST" enctype="multipart/form-data">
                    <div class="mb-3">
                        <small>* denotes a required field</small>
                    </div>
                    <div class="field mb-4">
                        <label class="label" for="type">Type*</label>
                        <div class="control">
                            <div class="select">
                                <select id="type" name="type" value="${errors && values.type && values.type !== '' ? values.type : ''}">
                                    <option>Knowledge Base Article</option>
                                    <option>Blog Post</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="field mb-4">
                        <label class="label" for="category">Category*</label>
                        <div class="control">
                            <div class="select">
                                <select id="category" name="category" value="${errors && values.category && values.category !== '' ? values.category : ''}">
                                    <option>Web Development</option>
                                    <option>Cybersecurity</option>
                                    <option>Business</option>
                                    <option>Health and Lifestyle</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="field mb-4">
                        <label class="label" for="title">Title*</label>
                        <div class="control">
                            <input type="text" class="input" id="title" name="title" value="${errors && values.title && values.title !== '' ? values.title : ''}" />
                        </div>
                    </div>
                    <div class="field mb-4">
                        <label class="label" for="description">Description*</label>
                        <div class="control">
                            <input type="text" class="input" id="description" name="description" value="${errors && values.description && values.description !== '' ? values.description : ''}" />
                        </div>
                    </div>
                    <div class="field mb-4">
                        <label class="label" for="content">Content*</label>
                        <div class="control">
                            <textarea id="content" name="content" class="textarea" value="${errors && values.content && values.content !== '' ? values.content : ''}"></textarea>
                        </div>
                    </div>
                    <div class="field mb-6">
                        <label class="label" for="image">Image*</label>
                        <div class="control">
                            <input type="file" class="input" id="image" name="image" accept="images/*" />
                        </div>
                    </div>
                    <button class="button is-medium" type="submit">Create Post</button>
                </form>
            </section>
        </main>
    ` }, req)
}

export default newDocPage