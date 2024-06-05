const popover1 = document.querySelector('#popover1') ? document.querySelector('#popover1') : null
const target1 = document.querySelector('#popover-target1') ? document.querySelector('#popover-target1') : null

const popover2 = document.querySelector('#popover2') ? document.querySelector('#popover2') : null
const target2 = document.querySelector('#popover-target2') ? document.querySelector('#popover-target2') : null

const popover3 = document.querySelector('#popover3') ? document.querySelector('#popover3') : null
const target3 = document.querySelector('#popover-target3') ? document.querySelector('#popover-target3') : null

const popover4 = document.querySelector('#popover4') ? document.querySelector('#popover4') : null
const target4 = document.querySelector('#popover-target4') ? document.querySelector('#popover-target4') : null

const popover5 = document.querySelector('#popover5') ? document.querySelector('#popover5') : null
const target5 = document.querySelector('#popover-target5') ? document.querySelector('#popover-target5') : null

const popover6 = document.querySelector('#popover6') ? document.querySelector('#popover6') : null
const target6 = document.querySelector('#popover-target6') ? document.querySelector('#popover-target6') : null

if (popover1) {
    target1.addEventListener('mouseenter', () => {
        popover1.style.display = 'block'
    })
    target1.addEventListener('mouseleave', () => {
        popover1.style.display = 'none'
    })
}

if (popover2) {
    target2.addEventListener('mouseenter', () => {
        popover2.style.display = 'block'
    })
    target2.addEventListener('mouseleave', () => {
        popover2.style.display = 'none'
    })
}

if (popover3) {
    target3.addEventListener('mouseenter', () => {
        popover3.style.display = 'block'
    })
    target3.addEventListener('mouseleave', () => {
        popover3.style.display = 'none'
    })
}

if (popover4) {
    target4.addEventListener('mouseenter', () => {
        popover4.style.display = 'block'
    })
    target4.addEventListener('mouseleave', () => {
        popover4.style.display = 'none'
    })
}

if (popover5) {
    target5.addEventListener('mouseenter', () => {
        popover5.style.display = 'block'
    })
    target5.addEventListener('mouseleave', () => {
        popover5.style.display = 'none'
    })
}

if (popover6) {
    target6.addEventListener('mouseenter', () => {
        popover6.style.display = 'block'
    })
    target6.addEventListener('mouseleave', () => {
        popover6.style.display = 'none'
    })
}