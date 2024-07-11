const password = document.querySelector('#password')
const passwordLabel = document.querySelector('#password-label')
const confirmPassword = document.querySelector('#confirmPassword')
const confirmPasswordLabel = document.querySelector('#confirmPassword-label')
const passwordMatch = document.querySelectorAll('.password-match')
const formBtn = document.querySelector('#form-btn')

password.addEventListener('input', () => {
    if (password.value !== confirmPassword.value) {
        passwordLabel.style.color = 'red'
        confirmPasswordLabel.style.color = 'red'
        passwordMatch.forEach(el => {
            el.textContent = 'Passwords do not match'
            el.style.color = 'red'
        })
        formBtn.setAttribute('disabled', '')

    } else {
        passwordLabel.style.color = 'green'
        confirmPasswordLabel.style.color = 'green'
        passwordMatch.forEach(el => {
            el.textContent = 'Passwords match'
            el.style.color = 'green'
        })
        formBtn.removeAttribute('disabled')
    }
})

confirmPassword.addEventListener('input', () => {
    if (password.value !== confirmPassword.value) {
        passwordLabel.style.color = 'red'
        confirmPasswordLabel.style.color = 'red'
        passwordMatch.forEach(el => {
            el.textContent = 'Passwords do not match'
            el.style.color = 'red'
        })
        formBtn.setAttribute('disabled', '')

    } else {
        passwordLabel.style.color = 'green'
        confirmPasswordLabel.style.color = 'green'
        passwordMatch.forEach(el => {
            el.textContent = 'Passwords match'
            el.style.color = 'green'
        })
        formBtn.removeAttribute('disabled')
    }
})