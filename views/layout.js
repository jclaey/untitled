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
            ${req && req.originalUrl && req.originalUrl === '/docs/new' || req && req.originalUrl && req.originalUrl.includes('/edit') || req && req.originalUrl && req.originalUrl === '/contact' ? '<script src="https://cdn.tiny.cloud/1/gpcfinmpmsaqqlj61u93b2k1jce8onblj0nybpb9ti64jvmu/tinymce/7/tinymce.min.js" referrerpolicy="origin"></script>' : ''}
            ${req && req.originalUrl && req.originalUrl === '/' ? '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.css" integrity="sha512-1cK78a1o+ht2JcaW6g8OXYwqpev9+6GqOkz9xmBN9iUUhIndKtxwILGWYOSibOKjLsEdjyjZvYDq/cZwNeak0w==" crossorigin="anonymous" referrerpolicy="no-referrer">' : ''}
            ${req && req.originalUrl && req.originalUrl.includes('/checkout') ? '<link rel="stylesheet" href="/stylesheets/checkout.css">' : ''}
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
              <div id="session-modal"></div>
            </div>
            <footer class="page-footer footer">
              ${footer()}
            </footer>

            
            ${req && req.originalUrl && req.originalUrl.includes('/checkout') ? '<script src="https://js.stripe.com/v3/"></script><br /><script src="/javascript/checkout.js"></script>' : ''}
            ${req && req.originalUrl && req.originalUrl === '/users/user/billing-shipping' ? '<script src="/javascript/toggleShipping.js"></script>' : ''}
            ${req && req.originalUrl && req.originalUrl === '/' ? '<script src="https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.js" integrity="sha512-A7AYk1fGKX6S2SsHywmPkrnzTZHrgiVT7GcQkLGDe2ev0aWb8zejytzS8wjo7PGEXKqJOrjQ4oORtnimIRZBtw==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>' : ''}
            ${req && req.originalUrl && req.originalUrl.includes('/product') ? '<script src="/javascript/selectToggler.js"></script>' : ''}
            ${req && req.originalUrl && req.originalUrl === '/docs/new' || req && req.originalUrl && req.originalUrl.includes('/edit') ? '<script src="/javascript/tiny-admin-facing.js"></script>' : ''}
            ${req && req.originalUrl && req.originalUrl === '/users/register' || req && req.originalUrl && req.originalUrl.includes('/reset-password') ? '<script src="/javascript/noMatch.js"></script>' : ''}
            ${req && req.originalUrl && req.originalUrl === '/contact' ? '<script src="/javascript/tiny-user-facing.js"></script><script src="/javascript/closeMessage.js"></script>"' : ''}
            ${req && req.originalUrl && req.originalUrl === '/' ? `<script>AOS.init()</script>` : ''}
            ${template.includes('<form') ? '<script src="/javascript/closeMessage.js"></script>' : ''}
          </body>
        </html>
    `
  }
  
  export default layout