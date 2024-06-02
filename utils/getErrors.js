export const getErrors = errors => {
    const renderedErrors = () => {
        return errors.array({ onlyFirstError: true }).map(error => {
          return `<span> ${error.msg}</span>`
        }).join('')
      }
  
      return `
        <article class="message" id="message">
          <div class="message-header">
            <p>Error</p>
            <button id="msg-close-btn" class="delete" aria-label="delete"></button>
          </div>
          <div class="message-body">
            <div id="errors" class="has-text-danger is-size-5">
              ${renderedErrors()}
          </div>
          </div>
        </article>
      `
}