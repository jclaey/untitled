import layout from "../layout.js"

const projectUpdateShowPage = ({ project, update }, req) => {
    console.log(update.images)
    const renderedImages = update.images.map(image => {
        return `
            <figure class="image update-image box">
                <img src="${image.path}" />
            </figure>
        `
    }).join('')

    return layout({ template: `
        <main>
            <section class="mb-6">
                <div class="page-title-div mb-6">
                    <h1 class="title is-size-1">
                        <div class="mb-4">
                            ${project.title}
                        </div>
                        <div>
                            <span class="pipe pr-2">|</span>${update.title}<span class="pipe pl-2">|</span>
                        </div>
                    </h1>
                </div>
                <div class="container" id="update-details-container">
                    <article class="media box">
                        <div class="media-content">
                            <div class="content is-size-5">
                                <p>${update.description}</p>
                                <p><strong>Version:</strong> ${update.version}</p>
                                <p><strong>Type:</strong> ${update.type}</p>
                            </div>
                        </div>
                    </article>
                </div>
            </section>
            <section id="update-show-images" class="container">
                ${renderedImages}
            </section>
        </main>
    ` }, req)
}

export default projectUpdateShowPage