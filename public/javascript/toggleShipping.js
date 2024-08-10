const checkbox = document.querySelector('#shipping-checkbox')
const shippingSection = document.querySelector('#shipping-info')

if (checkbox) {
    checkbox.addEventListener('change', e => {
        if (checkbox.checked) {
            shippingSection.style.display = 'none'
        } else {
            shippingSection.style.display = 'block'
        }
    })
}