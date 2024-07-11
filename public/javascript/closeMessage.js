const close = document.querySelector('#msg-close-btn')
const msg = document.querySelector('#message')

if (msg) {
    close.addEventListener('click', e => {
        msg.style.display = 'none'
    })
}