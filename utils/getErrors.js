export const getErrors = errors => {
    const renderedErrors = () => {
        return errors.array({ onlyFirstError: true }).map(error => {
          return `<span class=""> ${error.msg}</span>`
        })
      }
  
      return `
        <div>
          <h5>
            <i class="">warning</i>
            Error!
          </h5>
          ${renderedErrors()}
        </div>
      `
}