import layout from "../layout.js"

const productsShowPage = ({ product }, req) => {
    // Can we pass in a boolean instead? Like 'isSignedIn'? Would this be safer than passing the entire request body into this 
    // function/HTML document? Which parts of the request do we need for each page? I bet we can pass in just the important bits we need.

    return layout({ template: `
        <main>
            <section class="container">
                <div class="page-title-div">
                    <h1 class="title is-size-1">
                        <span class="pipe">|</span> ${product.title} <span class="pipe">|</span>
                    </h1>
                </div>
                <div id="product-show-area">
                    <div id="product-image" class="mb-6">
                        <figure class="image ml-4 pt-3">
                            <img
                                src="https://drive.google.com/thumbnail?id=${product.imageId}"
                                alt="Product image"
                            />
                        </figure>
                    </div>
                    <div>
                        <div class="mb-4">
                            <p class="is-size-5 mb-2"><strong>Description:</strong> ${product.description}</p>
                            <p class="is-size-5 mb-2"><strong>Rating:</strong> ${product.rating}</p>
                            <p class="is-size-5 mb-2"><strong>Number of Reviews:</strong> ${product.numReviews}</p>
                            <p class="is-size-5 mb-2"><strong>Price:</strong> $${product.price}</p>
                            ${product.countInStock && product.countInStock > 0 ? `
                                <p class="is-size-5"><strong>Number In Stock:</strong> ${product.countInStock}</p>
                            ` : ''}
                        </div>

                        ${req && req.session && req.session.adminId ? `
                            <div>
                                <a href="/products/product/${product._id}/edit" class="button is-warning">Edit Product</a>
                                <a href="/products/product/${product._id}/delete" class="button is-danger">Delete Product</a>
                            </div>
                        ` : ''}
                    </div>
                </div>
            </section>
        </main>
    ` }, req)
}

export default productsShowPage