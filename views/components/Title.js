(function() {
    class Title extends HTMLElement {
        constructor() {
            // establish prototype chain
            super()

            // attaches shadow tree and returns shadow root reference
            // https://developer.mozilla.org/en-US/docs/Web/API/Element/attachShadow
            const shadow = this.attachShadow({ mode: 'open' })

            // creating a container for the editable-list component
            const titleContainer = document.createElement('div')

            
        }
    }
})