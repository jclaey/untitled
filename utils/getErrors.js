export const getErrors = errors => {
    const renderedErrors = () => {
        return errors.array({ onlyFirstError: true }).map(error => {
          return `<span> ${error.msg}</span>`
        }).join('')
      }
  
      return `
        <div id="errors" class="has-text-danger is-size-5">
          <h5>
            <i class="fa-solid fa-triangle-exclamation">WARNING: </i>
            Error!
          </h5>
          ${renderedErrors()}
        </div>
      `
}