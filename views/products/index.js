import layout from "../layout.js"

const productsIndexPage = ({ products }, req) => {
    const renderedProducts = products.map(product => {
        return `
            <div class="card">
                <div class="card-image">
                    <figure class="image is-4by3">
                        <img
                            src="${product.image.path}"
                            alt="Placeholder image"
                        />
                     </figure>
                </div>
                <div class="card-content">
                    <div class="media">
                        <div class="media-left">
                            <p class="title is-size-2">
                                ${product.title}
                            </p>
                        </div>
                    </div>
                    <div class="content">
                        <p class="is-size-5">Description: ${product.description}</p>
                        <p class="is=size-5">Rating: ${product.rating}</p>
                        <p class="is-size-5">Number of Reviews: ${product.numReviews}</p>
                        <p class="is-size-5">Price: $${product.price}</p>
                        <p class="is-size-5">Number In Stock: ${product.countInStock}</p>
                    </div>
                </div>
            </div>
        `
    }).join('')

    return layout({ template: `
        <main>
            <section class="container">
                <div class="mb-6 page-title-div">
                    <h1 class="title is-size-1">
                        <span class="pipe">|</span> All Products <span class="pipe">|</span>
                    </h1>
                </div>

            </section>
        </main>
    ` }, req)
}

export default productsIndexPage