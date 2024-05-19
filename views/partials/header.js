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
                            <div class="columns">
                                <div class="column">
                                    <div class="level">
                                        <a href="/services" class="navbar-item"><i class="fa-solid fa-gears pr-2"></i> Services</a>
                                    </div>
                                    <div class="level">
                                        <a href="/quotes" class="navbar-item"><i class="fa-regular fa-clipboard pr-2"></i> Get A Free Quote</a>
                                    </div>
                                </div>
                                <div class="column">
                                    <div class="level">
                                        <a href="/about" class="navbar-item"><i class="fa-solid fa-circle-question pr-2"></i> About</a>
                                    </div>
                                    <div class="level">
                                        <a href="/contact" class="navbar-item"><i class="fa-regular fa-envelope pr-2"></i> Contact</a>
                                    </div>
                                </div>
                            </div>
                    </div>
                </div>
            </div>
        </nav>
    `
}

export default header