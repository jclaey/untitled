const signOut = document.querySelector('#modal-btns .is-warning')
const navbarDropdown = document.querySelector('.navbar-dropdown')
const navbarBurgers = document.querySelectorAll('.navbar-burger')

if (signOut) {
    signOut.addEventListener('click', () => {
        let hasType = signOut.getAttribute('data-type')
    
        if (hasType && hasType === 'user') {
            fetch('https://f8e0-173-175-236-109.ngrok-free.app/users/logout')
        } else if (hasType && hasType === 'admin') {
            fetch('https://f8e0-173-175-236-109.ngrok-free.app/admin/logout')
        }
    })
}

navbarBurgers.forEach(el => {
    el.addEventListener('click', () => {
        let target = el.dataset.target
        target = document.querySelector(`#${target}`)
        el.classList.toggle('is-active')
        target.classList.toggle('is-active')
    })
})