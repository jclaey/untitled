import layout from "../layout.js"

const productsShowPage = ({ product }, req) => {
    return layout({ template: `
        <main>
            <section class="container">
                <div class="mb-6 page-title-div">
                    <h1 class="title is-size-1">
                        <span class="pipe">|</span> ${product.title} <span class="pipe">|</span>
                    </h1>
                </div>
                <div id="product-show-area">
                    <div id="product-image" class="mb-6">
                        <figure class="image ml-4 pt-3">
                            <img
                                src="https://drive.google.com/thumbnail?id=${product.imageId}"
                                alt="Placeholder image"
                            />
                        </figure>
                    </div>
                    <div>
                        <p class="is-size-5">Description: ${product.description}</p>
                        <p class="is=size-5">Rating: ${product.rating}</p>
                        <p class="is-size-5">Number of Reviews: ${product.numReviews}</p>
                        <p class="is-size-5">Price: $${product.price}</p>
                        <p class="is-size-5">Number In Stock: ${product.countInStock}</p>
                    </div>
                </div>
            </section>
        </main>
    ` }, req)
}

export default productsShowPage