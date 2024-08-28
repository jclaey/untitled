const dots = document.querySelectorAll('.dot')
const prevBtn = document.querySelector('#prev')
const nextBtn = document.querySelector('#next')
const slides = document.querySelectorAll('.slides')
let slideId = 1

slides[slideId - 1].style.display = 'block'

const showSlides = () => {
    if (slideId > slides.length) {
        slideId = 1
    }

    if (slideId < 1) {
        slideId = slides.length
    }

    slides.forEach((slide, index) => {
        if (slideId - 1 === index) {
            slide.style.display = 'block'
        } else {
            slide.style.display = 'none'
        }
    })
}

dots.forEach((dot, dotIndex) => {
    dot.addEventListener('click', e => {
        slides.forEach((slide, slideIndex) => {
            if (dotIndex !== slideIndex) {
                slide.style.display = 'none'
            } else {
                slide.style.display = 'block'
            }
        })

        dots.forEach(dot => {
            dot.style.backgroundColor = '#bbb'
        })

        e.target.style.backgroundColor = '#717171'
    })
})

nextBtn.addEventListener('click', () => {
    slideId += 1
    showSlides()
})

prevBtn.addEventListener('click', () => {
    slideId -= 1
    showSlides()
})