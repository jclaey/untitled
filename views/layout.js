import header from "./partials/header.js"
import footer from "./partials/footer.js"

const layout = ({ template }, req) => {
    return `
      <!DOCTYPE html>
        <html>
          <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link rel="stylesheet" href="/stylesheets/bulma/css/bulma.min.css">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A==" crossorigin="anonymous" referrerpolicy="no-referrer" />
            <link rel="stylesheet" href="/stylesheets/index.css">
            <title>Untitled Business Project</title>
          </head>
          <body>
            <header class="header">
              ${header(req)}
            </header>
            <div class="mb-6 container">
              ${template}
            </div>
            <footer class="page-footer footer">
              ${footer()}
            </footer>
          </body>
        </html>
    `
  }
  
  export default layout