const header = (req = null) => {
    return `
        <nav class="navbar container">
            <div class="nav-left navbar-brand">
                <a href="/" class="navbar-item title-item">Web Solutions</a>
                <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>
            <div id="navbarBasicExample" class="navbar-menu">
                <div class="navbar-start">
                    <a href="/" class="navbar-item">Home</a>
                    <div class="navbar-item has-dropdown is-hoverable">
                        <a class="navbar-link">More</a>
                        <div class="navbar-dropdown">
                            <a href="/about" class="navbar-item">About</a>
                            <a href="/contact" class="navbar-item">Contact</a>
                            <a href="/quotes" class="navbar-item">Get A Free Quote</a>
                    </div>
                </div>
            </div>
        </nav>
    `
}

export default header