const footer = () => {
    return `
        <div class="mb-3 footer">
            <div class="columns">
                <div class="column">
                    <a href="/">
                        <h1 class="is-size-3">Web Solutions</h1>
                    </a>
                </div>
                <div class="column">
                    <div>
                        <a href="/about" class="has-text-dark is-size-5">About Us</a>
                    </div>
                    <div>
                        <a href="/contact" class="has-text-dark is-size-5">Contact Us</a>
                    </div>
                    <div>
                        <a href="/terms-and-conditions" target="_blank" class="has-text-dark is-size-5">Terms and Conditions</a>
                    </div>
                    <div>
                        <a href="/privacy-policy" target="_blank" class="has-text-dark is-size-5">Privacy Policy</a>
                    </div>
                </div>
            </div>
            <div id="footer-social">
                <div id="social-links">
                    <a href="https://facebook.com">
                        <i class="fa-brands fa-facebook mr-5"></i>
                    </a>
                    <a href="https://threads.com">
                        <i class="fa-brands fa-square-threads mr-5"></i>
                    </a>
                    <a href="https://youtube.com">
                        <i class="fa-brands fa-youtube mr-5"></i>
                    </a>
                </div>
            </div>
            <div id="footer-built-by" class="has-text-centered content">
                <p>
                    Built by <a href="https://claeysdev.com" target="_blank" class="has-text-dark">ClaeysDev</a>
                </p>
            </div>
        </div>
    `
}

export default footer