const buildCart = productsArray => {
    let cartItems = []
    let subtotal = 0
    let needsShipping = false

    productsArray.forEach(item => {
        if (item.type.toLowerCase() === 'physical') {
            needsShipping = true
        }

        const dupIndex = cartItems.findIndex(el => item._id === el._id)

        if (dupIndex !== -1) {
            orderItems[dupIndex].qty += 1
        } else {
            orderItems.push({ qty: 1, product: item })
        }

        subtotal += item.price
    })

    return {
        cartItems,
        needsShipping,
        subtotal
    }
}

export default buildCart