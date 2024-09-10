import layout from "../layout.js"

const productsEditPage = ({ product, errors, values = {} }, req) => {
    return layout({ template: `
        <main>
            <section class="container">
                <div class="page-title-div">
                    <h1 class="title is-size-1">
                        <span class="pipe">|</span> Edit ${product.title} <span class="pipe">|</span>
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
                <form action="/products/product/${product._id}/edit?_method=PATCH" method="POST" enctype="multipart/form-data" class="box">
                    <div class="mb-3">
                        <small>* denotes a required field</small>
                    </div>
                    <div class="field mb-4">
                        <label for="title" class="label">
                            Title
                        </label>
                        <div class="control">
                            <input class="input" type="text" id="title" name="title" value="${product && !errors ? product.title : errors && values.title && values.title !== '' ? values.title : ''}" />
                        </div>
                    </div>
                    <div class="field mb-4">
                        <label for="image" class="label">
                            Product Image
                        </label>
                        <div class="control">
                            <input class="input" type="file" id="image" name="image" accept="image/*" />
                        </div>
                    </div>
                    <div class="field mb-4">
                        <label for="type" class="label">
                            Type
                        </label>
                        <div class="control">
                            <div class="select">
                                <select type="text" id="type" name="type" value="${product && !errors ? product.title : errors && values.title && values.title !== '' ? values.title : ''}">
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
                            <input class="input" type="file" id="product" name="product" accept=".zip" />
                        </div>
                    </div>
                    <div class="field mb-4">
                        <label for="description" class="label">
                            Description
                        </label>
                        <div class="control">
                            <input class="input" type="text" id="description" name="description" value="${product && !errors ? product.description : errors && values.description && values.description !== '' ? values.description : ''}" />
                        </div>
                    </div>
                    <div class="field mb-4">
                        <label for="price" class="label">
                            Price
                        </label>
                        <div class="control">
                            <input class="input" type="number" min="0.01" step="0.01" id="price" name="price" value="${product && !errors ? product.price : errors && values.price && values.price !== '' ? values.price : ''}" />
                        </div>
                    </div>
                    <div class="field mb-6">
                        <label for="countInStock" class="label">
                            Count In Stock
                        </label>
                        <div class="control">
                            <input class="input" type="number" min="0" step="1" id="countInStock" name="countInStock" value="${product && !errors ? product.countInStock : errors && values.countInStock && values.countInStock !== '' ? values.countInStock : ''}" />
                        </div>
                    </div>
                    <button type="submit" class="button mb-3 is-medium">Edit Product</button>
                </form>
            </section>
        </main>
    ` }, req)
}

export default productsEditPage