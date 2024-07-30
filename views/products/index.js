import layout from "../layout.js"

const productsIndexPage = ({ products }, req) => {
    let renderedProducts

    if (!products || products.length === 0) {
        renderedProducts = `
            <div class="is-size-4">
                No products yet.
            </div>
        `
    } else {
        renderedProducts = products.map(product => {
            return `
                <div class="card mb-4">
                    <div class="card-image">
                        <figure class="image is-128x128 ml-4 pt-3">
                            <img
                                src="https://drive.google.com/thumbnail?id=${product.imageId}"
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
                        <div class="buttons">
                            <a href="/products/product/${product._id}" class="button">View More</a>
                            ${req && req.session && req.session.userId ? `
                                <form action="/users/user/${req.session.userId}/cart/${product._id}/add" method="POST">
                                    <button type="submit" class="button">Add To Cart</button>
                                </form>
                            ` : ''}
                        </div>
                    </div>
                </div>
            `
        }).join('')
    }

    return layout({ template: `
        <main>
            <section class="container">
                <div class="mb-6 page-title-div">
                    <h1 class="title is-size-1">
                        <span class="pipe">|</span> All Products <span class="pipe">|</span>
                    </h1>
                </div>
                <div id="index-rendered-products-div">
                    ${renderedProducts}
                </div>
            </section>
        </main>
    ` }, req)
}

export default productsIndexPage