const input = document.querySelector('#docs-index-section form #search')
const filter = document.querySelector('#docs-index-section form #filter-btn')
const filters = document.querySelector('#docs-index-section #filters')
let button = document.querySelector('#apply-filters')
let url = `https://f8e0-173-175-236-109.ngrok-free.app/docs/filter-docs?`

if (window.location.href.includes('=')) {
    history.pushState({}, '', '/docs/filter-docs')
}

// console.log(window.location)

button.addEventListener('click', () => {
    url = url += `title=${input.value.toLowerCase()}&description=${input.value.toLowerCase()}&content=${input.value.toLowerCase()}`
    window.location.assign(url)
})

filter.addEventListener('click', () => {
    let filterObj = {
        type: '',
        category: '',
        title: '',
        description: '',
        content: '',
    }

    const panel =  `
        <div>
            <div id="panel" class="mb-2">
                <div class="select mr-3">
                    <select id="type">
                        <option value="">-- Type --</option>
                        <option value="Knowledge Base Article">Knowledge Base Article</option>
                        <option value="Blog Post">Blog Post</option>
                    </select>
                </div>
                <div class="select mr-3" id="category">
                    <select id="category">
                        <option value="">-- Category --</option>
                        <option value="Web Development">Web Development</option>
                        <option value="Cybersecurity">Cybersecurity</option>
                        <option value="Health and Lifestyle">Health and Lifestyle</option>
                        <option value="Business">Business</option>
                    </select>
                </div>
                <div id="checkboxes">
                    <div class="columns">
                        <div class="column">
                            <label class="checkbox">
                                <input type="checkbox" name="title" value="title" />
                                Title
                            </label>
                            <label class="checkbox">
                                <input type="checkbox" name="content" value="content" />
                                Content
                            </label>
                        </div>
                        <div class="column">
                            <label class="checkbox">
                                <input type="checkbox" name="description" value="description" />
                                Description
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            <div class="has-text-danger mb-2">
                <span id="error"></span>
            </div>
            <div>
                <button class="button is-info" type="button" id="apply-filters">Apply Filters</button>
            </div>
        </div>
    `

    if (filters.classList.contains('show')) {
        filters.classList.remove('show')
        filters.style.display = 'none'
        filters.innerHTML = ''
        button.style.display = 'block'
    } else {
        filters.classList.add('show')
        button.style.display = 'none'
        filters.style.display = 'block'
        filters.innerHTML = panel
        button = document.querySelector('#apply-filters')

        const selects = document.querySelectorAll('#docs-search-container select')

        if (selects.length > 0) {
            const checkboxes = document.querySelectorAll('.checkbox input')

            checkboxes.forEach(checkbox => {
                checkbox.addEventListener('click', () => {
                    if (checkbox.classList.contains('checked')) {
                        checkbox.classList.remove('checked')
                    } else {
                        checkbox.classList.add('checked')
                    }
                })
            })

            button.addEventListener('click', e => {
                if (input.value === '') {
                    e.preventDefault()
                    const error = document.querySelector('#error')
                    error.textContent = 'Please enter a search term'

                    setTimeout(() => {
                        error.textContent = ''
                    }, 3000)

                    return
                }

                if (selects.length > 0) {
                    selects.forEach(select => {
                        if (select.value !== '') {
                            let name = select.getAttribute('id')
                            filterObj[name] = select.value
                        }
                    })
                }

                if (checkboxes.length > 0) {
                    checkboxes.forEach(checkbox => {
                        if (checkbox.classList.contains('checked')) {
                            filterObj[checkbox.value] = input.value.toLowerCase()
                        }
                    })
                }

                for (let value in filterObj) {
                    if (value === 'description' && filterObj[value] !== '') {
                        if (url.split('?')[1] !== '') {
                            url += `&`
                        }

                        url += `description=${filterObj[value].replace(' ', '_')}`
                    }

                    if (value === 'type' && filterObj[value] !== '') {
                        if (url.split('?')[1] !== '') {
                            url += `&`
                        }

                        url += `type=${filterObj[value].replace(' ', '_')}`
                    }

                    if (value === 'category' && filterObj[value] !== '') {
                        if (url.split('?')[1] !== '') {
                            url += `&`
                        }

                        url += `category=${filterObj[value].replace(' ', '_')}`
                    }

                    if (value === 'title' && filterObj[value] !== '') {
                        if (url.split('?')[1] !== '') {
                            url += `&`
                        }

                        url += `title=${filterObj[value].replace(' ', '_')}`
                    }

                    if (value === 'content' && filterObj[value] !== '') {
                        if (url.split('?')[1] !== '') {
                            url += `&`
                        }

                        url += `content=${filterObj[value].replace(' ', '_')}`
                    }
                }

                window.location.assign(url)
            })
        }
    }
})