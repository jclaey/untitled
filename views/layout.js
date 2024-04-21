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
            <script src="https://cdn.tiny.cloud/1/u7jtsuz1glcmvd4obg3mihkfv74kpuhtx7qhydm5uc9j6u7e/tinymce/7/tinymce.min.js" referrerpolicy="origin"></script>
            <link rel="stylesheet" href="/stylesheets/bulma/css/bulma.min.css">
            <link rel="stylesheet" href="/stylesheets/index.css">
            <title>Untitled Business Project</title>
          </head>
          <body>
            <header>
              ${header(req)}
            </header>
            <div class="mb-6 container">
              ${template}
            </div>
            <footer class="page-footer footer">
              ${footer()}
            </footer>

            <script>
                tinymce.init({
                selector: 'textarea',
                plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount',
                toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat',
              })
            </script>
          </body>
        </html>
    `
  }
  
  export default layout