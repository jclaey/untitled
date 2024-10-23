const tabs = Array.from(document.querySelectorAll('.tabs li'))
const contentDivs = Array.from(document.querySelectorAll('.tab-content'))

tabs.forEach(tab => {
    let contentDiv
    
    Array.from(tab.classList).forEach(clas => {
        if (clas.includes('tab')) {
            contentDiv = clas
        }
    })

    if (tab.classList.contains('is-active')) {
        contentDivs.forEach(div => {
            if (div.classList.contains(contentDiv)) {
                div.style.display = 'block'
            } else {
                div.style.display = 'none'
            }
        })
    }

    tab.addEventListener('click', e => {
        tab.classList.add('is-active')

        let tabType = Array.from(tab.classList).find(clas => clas.includes('tab'))

        tabs.forEach(el => {
            if (el === tab) {
                contentDivs.forEach(div => {
                    if (Array.from(div.classList).includes(tabType)) {
                        div.style.display = 'block'
                    }
                })
            } else {
                el.classList.remove('is-active')

                contentDivs.forEach(div => {
                    if (!Array.from(div.classList).includes(tabType)) {
                        div.style.display = 'none'
                    }
                })
            }
        })
    })
})

