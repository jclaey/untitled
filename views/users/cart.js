import layout from "../layout.js"

const userCartPage = ({ cartItems, firstName }, req) => {
    let renderedItems

    if (!cartItems || cartItems.length === 0) {
        renderedItems = `
            <div class="is-size-4">
                No products yet.
            </div>
        `
    } else {
        renderedItems = cartItems.map(item => {
            return `
                <div class="card">
                    <div class="card-content">
                        <div class="content">
                            <strong><span class="is-size-4">${item.title}</span></strong><br />
                            <strong>$${item.price}</strong><br />
                            <strong>Qty:${''}</strong>
                        </div>
                    </div>
                </div>
            `
        }).join('')
    }

    return layout({ template: `
            <main class="container">
                <section>
                    <div class="mb-6 page-title-div">
                        <h1 class="title is-size-1 mb-4">
                            <span class="pipe">|</span> ${firstName}'s Cart <span class="pipe">|</span>
                        </h1>
                        <div id="items">
                            ${renderedItems}
                        </div>
                    </div>
                </section>
            </main>
        ` }, req)
}

export default userCartPage