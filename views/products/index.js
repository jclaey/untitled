import { decryptStringData } from "../../utils/encrypt.js"
import layout from "../layout.js"

const productsIndexPage = ({ products }, req) => {
    const key = process.env.ENCRYPTION_KEY
    let userId = req && req.session && req.session.userId ? decryptStringData(req.session.userId, key, req.session.userIv) : null

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
                            <p class="is-size-5"><strong>Description:</strong> ${product.description}</p>
                            <p class="is-size-5"><strong>Rating:</strong> ${product.rating}</p>
                            <p class="is-size-5"><strong>Number of Reviews:</strong> ${product.numReviews}</p>
                            <p class="is-size-5"><strong>Price:</strong> $${product.price}</p>
                            ${product.countInStock && product.countInStock > 0 ? `
                                <p class="is-size-5"><strong>Count In Stock:</strong> ${product.countInStock}</p>
                            ` : ''}
                        </div>
                        <div class="buttons">
                            <a href="/products/product/${product._id}" class="button is-info mr-5">View More</a>
                            ${req && req.session && userId ? `
                                <form action="/users/user/${userId}/cart/${product._id}/add" method="POST">
                                    <button type="submit" class="button">Add To Cart</button>
                                </form>
                            ` : `
                                <p class="has-text-danger">Please <a href="/users/login">sign in</a> or <a href="/users/register">sign up</a> to add items to a 
                                cart</p>
                            `}
                        </div>
                    </div>
                </div>
            `
        }).join('')
    }

    return layout({ template: `
        <main>
            <section class="container">
                <div class="page-title-div">
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