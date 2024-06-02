const close = document.querySelector('#msg-close-btn')
const msg = document.querySelector('#message')

close.addEventListener('click', e => {
    msg.style.display = 'none'
})