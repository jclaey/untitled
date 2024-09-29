const message = (type, text) => {
    let labelCap = type.split('')
    const first = labelCap[0].toUpperCase()
    labelCap.splice(0, 1, first)
    labelCap = labelCap.join('')

    return `
        <article class="message" id="message">
          <div class="message-header">
            <p>${labelCap}</p>
            <button id="msg-close-btn" class="delete" aria-label="delete"></button>
          </div>
          <div class="message-body">
            <div id="errors" class="has-text-danger is-size-5">
              ${text}
          </div>
        </article>
    `
}

message('warning')

export default message