import layout from "../layout.js"

const newProductPage = ({}, req) => {
    return layout({ template: `
        <main>
            <section class="container">
                <div class="mb-6 page-title-div">
                    <h1 class="title is-size-1">
                        <span class="pipe">|</span> Add A New Product <span class="pipe">|</span>
                    </h1>
                </div>
                <form class="box" action="/products/new" method="POST">
                    <div class="mb-3">
                        <small>* denotes a required field</small>
                    </div>
                    <div class="field mb-4">
                        <label for="title" class="label">
                            Title
                        </label>
                        <div class="control">
                            <input class="input" type="text" id="title" name="title" />
                        </div>
                    </div>
                    <div class="field mb-4">
                        <label for="image" class="label">
                            Product Image
                        </label>
                        <div class="control">
                            <input class="input" type="file" id="image" name="image" />
                        </div>
                    </div>
                    <div class="field mb-4">
                        <label for="type" class="label">
                            Type
                        </label>
                        <div class="control">
                            <div class="select">
                                <select type="text" id="type" name="type">
                                    <option>Physical</option>
                                    <option>Digital</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="field mb-4" id="new-product-upload">
                        <label for="product" class="label">
                            Upload Digital Product
                        </label>
                        <div class="control">
                            <input class="input" type="file" id="product" name="product" accept="" />
                        </div>
                    </div>
                    <div class="field mb-4">
                        <label for="description" class="label">
                            Description
                        </label>
                        <div class="control">
                            <input class="input" type="text" id="description" name="description" />
                        </div>
                    </div>
                    <div class="field mb-4">
                        <label for="rating" class="label">
                            Rating
                        </label>
                        <div class="control">
                            <input class="input" type="number" min="0" max="0" step="0.5" id="rating" name="rating" />
                        </div>
                    </div>
                    <div class="field mb-4">
                        <label for="price" class="label">
                            Price
                        </label>
                        <div class="control">
                            <input class="input" type="number" min="0.01" step="0.01" id="price" name="price" />
                        </div>
                    </div>
                    <div class="field mb-4">
                        <label for="countInStock" class="label">
                            Count In Stock
                        </label>
                        <div class="control">
                            <input class="input" type="number" min="0" step="1" id="countInStock" name="countInStock" />
                        </div>
                    </div>
                    <button type="submit" class="button mb-3 is-medium">Add Product</button>
                </form>
            </section>
        </main>
    ` }, req)
}

export default newProductPage