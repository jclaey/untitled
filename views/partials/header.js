import { decryptStringData } from "../../utils/encrypt.js"
import process from 'node:process'

 const header = (req = null) => {
    const key = process.env.ENCRYPTION_KEY
    let userId

    if (req && req.session && req.session.userId && req.session.userIv) {
        userId = decryptStringData(req.session.userId, key, req.session.userIv)
    } else {
        userId = null
    }

    return `
        <div id="menu-div">
            <div id="burger-div">
                <i class="fa-solid fa-bars p-4 is-size-3"></i>
            </div>
            <aside class="menu ml-4 is-size-5">
                <p class="menu-label is-size-6">General</p>
                <ul class="menu-list">
                    <li>
                        <a href="/"><i class="fa-solid fa-house pr-2 is-theme-1"></i>Home</a>
                    </li>
                </ul>
                <p class="menu-label is-size-6">More</p>
                <ul class="menu-list">
                    <li>
                        <a href="/services">
                            <i class="fa-solid fa-gears pr-2 is-theme-1"></i> Services
                        </a>
                    </li>
                    <li>
                        <a href="/quotes">
                            <i class="fa-regular fa-clipboard pr-2 is-theme-2"></i> Get A Free Quote
                        </a>
                    </li>
                    <li>
                        <a href="/products">
                            <i class="fa-solid fa-bag-shopping pr-2 is-theme-1"></i> Products
                        </a>
                    </li>
                    <li>
                        <a href="/about">
                            <i class="fa-solid fa-circle-question pr-2 is-theme-2"></i> About
                        </a>
                    </li>
                    <li>
                        <a href="/contact">
                            <i class="fa-regular fa-envelope pr-2 is-theme-1"></i> Contact
                        </a>
                    </li>
                    <li>
                        <a href="/docs">
                            <i class="fa-solid fa-book pr-2 is-theme-2"></i> Articles and Posts
                        </a>
                    </li>
                </ul>
            </aside>
        </div>
        <nav class="navbar container" role="navigation" aria-label="main navigation">
            <div class="nav-left navbar-brand nav-label">
                <a href="/" class="navbar-item title-item">
                    <img src="./resources/images/summit_logo_4.png" alt="Summit Web Services mountain peak alternate logo" id="summit-logo" class="mr-3">
                    Summit
                </a>
            </div>
            <div id="navMenu" class="navbar-menu">
                <div class="navbar-start">
                    <a href="/" class="navbar-item nav-label">Home</a>
                    <div class="navbar-item has-dropdown is-hoverable">
                        <a class="navbar-link nav-label">More</a>
                        <div class="navbar-dropdown">
                            <div class="columns">
                                <div class="column">
                                    <a href="/services" class="navbar-item">
                                        <i class="fa-solid fa-gears pr-2 is-theme-1"></i> Services
                                    </a>
                                    <a href="/about" class="navbar-item">
                                        <i class="fa-solid fa-circle-question pr-2 is-theme-2"></i> About
                                    </a>
                                    <a href="/contact" class="navbar-item">
                                        <i class="fa-regular fa-envelope pr-2 is-theme-1"></i> Contact
                                    </a>
                                </div>
                                <div class="column">
                                    <a href="/quotes" class="navbar-item">
                                        <i class="fa-regular fa-clipboard pr-2 is-theme-2"></i> Get A Free Quote
                                    </a>
                                    <a href="/products" class="navbar-item">
                                        <i class="fa-solid fa-bag-shopping pr-2 is-theme-1"></i> Products
                                    </a>
                                    <a href="/docs" class="navbar-item">
                                        <i class="fa-solid fa-book pr-2 is-theme-2"></i> Articles and Posts
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="navbar-end">
                    ${!req || !req.session || !req.session.userId && !req.session.adminId ? `
                        <div class="navbar-item">
                            <div class="buttons">
                                <a href="/users/login" class="button is-medium" id="nav-btn-primary">
                                    <i class="fa-solid fa-right-to-bracket pr-2"></i> Sign In
                                </a>
                                <a href="/users/register" class="button register-menu-btn is-medium" id="nav-btn-secondary">
                                    <i class="fa-solid fa-user-plus pr-2"></i> Register
                                </a>
                            </div>
                        </div>    
                    ` : ''}
                    ${req && req.session && req.session.adminId ? `
                        <div class="navbar-item">
                            <div class="buttons">
                                <a href="/admin/projects/new/-" class="button is-success">
                                    <i class="fa-solid fa-diagram-project pr-2"></i> Create Project
                                </a>
                                <a href="/products/new" class="button is-success">
                                    <i class="fa-solid fa-store pr-2"></i> Create Product
                                </a>
                                <a href="/docs/new" class="button is-success">
                                    <i class="fa-solid fa-scroll pr-2"></i> Create Doc
                                </a>
                                <a href="/admin/logout" class="button is-success" id="nav-btn-secondary">
                                    <i class="fa-solid fa-right-from-bracket pr-2"></i> Logout
                                </a>
                            </div>
                        </div>
                    ` : ''
                    }
                    ${req && req.session && req.session.userId ? `
                        <div class="navbar-item">
                            <div class="buttons level">
                                <a href="/users/user/${userId}/cart" class="button is-success"><i class="fa-solid fa-cart-shopping pr-2"></i> Cart</a>
                                <a href="/users/logout" class="button is-primary mr-4" id="nav-btn-secondary">
                                    <i class="fa-solid fa-right-from-bracket pr-2"></i> Logout
                                </a>
                                <a href="/users/user/${userId}/profile" title="User Profile">
                                    <i class="fa-solid fa-circle-user fa-2x"></i>
                                </a>
                            </div>
                        </div>
                    ` : ''
                    }
                </div>
            </div>
        </nav>
    `
}

export default header