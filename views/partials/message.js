const message = (type, text) => {
    return `
        <article class="message">
            <div class="message-header">
                <p>${type === 'error' ? 'Error!' : 'Success!'}</p>
                <button class="delete" aria-label="delete"></button>
            </div>
            <div class="message-body">
                ${text}
            </div>
        </article>
    `
}

export default message