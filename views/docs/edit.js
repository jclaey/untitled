import layout from "../layout.js"

const docsEditPage = ({ doc, errors, values = {} }, req) => {
    return layout({ template: `
        <main class="container">
            <div class="mb-6 page-title-div">
                <h1 class="title is-size-1">
                    <span class="pipe">|</span> Edit ${doc.title} <span class="pipe">|</span>
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
            <section class="form-section">
                <form action="/docs/doc/${doc._id}/edit?_method=PATCH" method="POST" enctype="multipart/form-data" class="box resource-form" >
                    <div class="field mb-4">
                        <label class="label" for="type">Type</label>
                        <div class="control">
                            <div class="select">
                                <select id="type" name="type" value="${doc && !errors ? doc.type : errors && values.type && values.type !== '' ? values.type : ''}">
                                    <option>Knowledge Base Article</option>
                                    <option>Blog Post</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="field mb-4">
                        <label class="label" for="category">Category</label>
                        <div class="control">
                            <div class="select">
                                <select id="category" name="category" value="${doc && !errors ? doc.category : errors && values.category && values.category !== '' ? values.category : ''}">
                                    <option>Web Development</option>
                                    <option>Cybersecurity</option>
                                    <option>Business</option>
                                    <option>Health and Lifestyle</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="field mb-4">
                        <label class="label" for="title">Title</label>
                        <div class="control">
                            <input type="text" class="input" id="title" name="title" value="${doc && !errors ? doc.title : errors && values.title && values.title !== '' ? values.title : ''}" />
                        </div>
                    </div>
                    <div class="field mb-4">
                        <label class="label" for="description">Description</label>
                        <div class="control">
                            <input type="text" class="input" id="description" name="description" value="${doc && !errors ? doc.description : errors && values.description && values.description !== '' ? values.description : ''}" />
                        </div>
                    </div>
                    <div class="field mb-4">
                        <label class="label" for="content">Content</label>
                        <div class="control">
                            <textarea id="content" name="content" class="textarea">${doc && !errors ? doc.content : errors && values.content && values.content !== '' ? values.content : ''}</textarea>
                        </div>
                    </div>
                    <div class="field mb-6">
                        <label class="label" for="image">Image</label>
                        <div class="control">
                            <input type="file" class="input" id="image" name="image" accept="images/*" />
                        </div>
                    </div>
                    <button type="submit" class="button is-medium">Edit Post</button>
                </form>
            </section>
        </main>    
    ` }, req)
}

export default docsEditPage