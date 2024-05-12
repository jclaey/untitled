import layout from "../layout.js"

const newDocPage = () => {
    return layout({ template: `
        <main class="container">
            <div class="mb-6 page-title-div">
                <h1 class="title is-size-1">
                    <span class="pipe">|</span> Create A New Doc <span class="pipe">|</span>
                </h1>
            </div>
            <section id="new-doc-form">
                <form class="box" action="/docs/new" method="POST">
                    <div class="field">
                        <label class="label" for="type">Type</label>
                        <div class="control">
                            <div class="select">
                                <select id="type" name="type">
                                    <option>Knowledge Base Article</option>
                                    <option>Blog Post</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="field">
                        <label class="label" for="category">Category</label>
                        <div class="control">
                            <div class="select">
                                <select id="category" name="category">
                                    <option>Web Development</option>
                                    <option>Business</option>
                                    <option>Health and Lifestyle</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="field">
                        <label class="label" for="title">Title</label>
                        <div class="control">
                            <input type="text" class="input" id="title" name="title" />
                        </div>
                    </div>
                    <div class="field">
                        <label class="label" for="description">Description</label>
                        <div class="control">
                            <input type="text" class="input" id="description" name="description" />
                        </div>
                    </div>
                    <div class="field">
                        <label class="label" for="content">Content</label>
                        <div class="control">
                            <textarea id="content" name="content" class="textarea"></textarea>
                        </div>
                    </div>
                    <div class="field">
                        <label class="label" for="image">Image</label>
                        <div class="control">
                            <input type="file" class="input" id="image" name="image" />
                        </div>
                    </div>
                    <button class="button" type="submit">Create Post</button>
                </form>
            </section>
        </main>
    ` })
}

export default newDocPage