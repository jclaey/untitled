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
            ${req && req.originalUrl && req.originalUrl === '/docs/new' || req && req.originalUrl && req.originalUrl === '/contact' ? '<script src="https://cdn.tiny.cloud/1/gpcfinmpmsaqqlj61u93b2k1jce8onblj0nybpb9ti64jvmu/tinymce/7/tinymce.min.js" referrerpolicy="origin"></script>' : ''}
            <link rel="stylesheet" href="/stylesheets/bulma/css/bulma.min.css">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A==" crossorigin="anonymous" referrerpolicy="no-referrer" />
            <link rel="stylesheet" href="/stylesheets/index.css">
            <title>Untitled Business Project</title>
          </head>
          <body>
            <header class="header">
              ${header(req)}
            </header>
            <div class="mb-6">
              ${template}
            </div>
            <footer class="page-footer footer">
              ${footer()}
            </footer>

            ${req && req.originalUrl && req.originalUrl === '/products/new' ? '<script src="/javascript/selectToggler.js"></script>' : ''}
            ${req && req.originalUrl && req.originalUrl === '/docs/new' || req && req.originalUrl && req.originalUrl === '/contact' ? '<script src="/javascript/tiny.js"></script>' : ''}
          </body>
        </html>
    `
  }
  
  export default layout