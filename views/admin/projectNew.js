import layout from "../layout.js"

const projectNewPage = ({ errors, values = {} }, req) => {
    return layout({ template: `
        <main class="container">
            <div class="page-title-div">
                <h1 class="title is-size-1">
                    <span class="pipe">|</span> Create A Project <span class="pipe">|</span>
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
            <section id="project-form-section">
                <form action="/admin/projects/new" method="POST" class="box">
                    <div class="field mb-5">
                        <label class="label" for="quoteInfoId">
                            <strong>Quote Info ID</strong>
                        </label>
                        <div class="control">
                            <input type="text" id="quoteInfoId" name="quoteInfoId" placeholder="Enter quote info id number..." class="input" value="${errors && values.quoteInfoId && values.quoteInfoId !== '' ? values.quoteInfoId : req && req.params && req.params.quoteInfoId ? req.params.quoteInfoId : ''}" />
                        </div>
                    </div>
                </form>
            </section>
        </main>    
    ` }, req)
}

export default projectNewPage