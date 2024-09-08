const signOut = document.querySelector('#modal-btns .is-warning')

if (signOut) {
    signOut.addEventListener('click', () => {
        let hasType = signOut.getAttribute('data-type')
    
        if (hasType && hasType === 'user') {
            fetch('https://40fa-173-175-236-109.ngrok-free.app/users/logout')
        }
    
        if (hasType && hasType === 'admin') {
            fetch('https://40fa-173-175-236-109.ngrok-free.app/admin/logout')
        }
    })
}