const select = document.querySelector('select#type')
const upload = document.querySelector('#new-product-upload')

select.addEventListener('change', e => {
    if (select.value.toLowerCase() === 'digital') {
        upload.style.display = 'block'
    } else {
        upload.style.display = 'none'
    }
})