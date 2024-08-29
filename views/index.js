import layout from "./layout.js"

const indexPage = (req) => {
    return layout({ template: `
            <main>
                <section id="showcase-area" class="hero container">
                    <div class="hero-body">
                        <div class="columns">
                            <div class="column">
                                <h1 class="title" data-aos="fade-right" data-aos-anchor-placement="middle-middle" data-aos-duration="1000" data-aos-delay="50">Web Solutions</h1>
                                <hr id="title-hr">
                                <p class="subtitle">Solutions for the web...</p>
                            </div>
                            <div class="column mt-5">
                                <div class="column-group">
                                    <h3 class="is-size-3" data-aos="fade-left" data-aos-anchor-placement="middle-middle" data-aos-duration="1000" data-aos-delay="50">Platforms</h3>
                                    <hr>
                                    <div class="icon-group">
                                        <div class="icon icon-first">
                                            <i class="fa-solid fa-mobile pr-2"></i>
                                            <small>Mobile</small>
                                        </div>
                                        <div class="icon icon-mid">
                                            <i class="fa-solid fa-desktop pr-2"></i>
                                            <small>Desktop</small>
                                        </div>
                                        <div class="icon icon-mid">
                                            <i class="fa-solid fa-vr-cardboard pr-2"></i>
                                            <small>Virtual</small>
                                        </div>
                                        <div class="icon icon-last">
                                            <i class="fa-solid fa-lightbulb pr-2"></i>
                                            <small>I.O.T.</small>
                                        </div>
                                    </div>
                                </div>
                                <div class="column-group">
                                    <h3 class="is-size-3" data-aos="fade-left" data-aos-anchor-placement="middle-middle" data-aos-duration="1000" data-aos-delay="50">Fields</h3>
                                    <hr>
                                    <div class="icon-group">
                                        <div class="icon icon-first">
                                            <i class="fa-solid fa-barcode pr-2"></i>
                                            <small>Retail</small>
                                        </div>
                                        <div class="icon icon-mid">
                                            <i class="fa-solid fa-credit-card pr-2"></i>
                                            <small>Finance</small>
                                        </div>
                                        <div class="icon icon-mid">
                                            <i class="fa-solid fa-scale-balanced pr-2"></i>
                                            <small>Law</small>
                                        </div>
                                        <div class="icon icon-last">
                                            <i class="fa-solid fa-school pr-2"></i>
                                            <small>Education</small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section class="mb-6">
                    <div id="sub-showcase" class="mb-6">
                        <p>We develop for the future.</p>
                    </div>
                    <div id="simple-website-package-action">
                        <h2 class="is-size-2">$99 Websites!</h2>
                        <p>Get a website, domain, and a basic hosting package for only $99!</p>
                        <p>Click <a href="">here</a> for more details.</p>
                    </div>
                </section>
                <section id="testimonial-carousel">
                    <div id="carousel-container">
                        <div class="slides">
                            <q>I like this. This is a good place.</q>
                            <div class="star-ratings mt-1 mb-1">
                                <div>
                                    <i class="fa-solid fa-star pr-1"></i>
                                </div>
                                <div>
                                    <i class="fa-solid fa-star pr-1"></i>
                                </div>
                                <div>
                                    <i class="fa-solid fa-star pr-1"></i>
                                </div>
                                <div>
                                    <i class="fa-solid fa-star pr-1"></i>
                                </div>
                                <div>
                                    <i class="fa-solid fa-star-half"></i>
                                </div>
                            </div>
                            <p class="author">- Some Person</p>
                        </div>
                        <div class="slides">
                            <q>Keep up the good work.</q>
                            <div class="star-ratings mt-1 mb-1">
                                <div>
                                    <i class="fa-solid fa-star pr-1"></i>
                                </div>
                                <div>
                                    <i class="fa-solid fa-star pr-1"></i>
                                </div>
                                <div>
                                    <i class="fa-solid fa-star pr-1"></i>
                                </div>
                                <div>
                                    <i class="fa-solid fa-star pr-1"></i>
                                </div>
                                <div>
                                    <i class="fa-solid fa-star pr-1"></i>
                                </div>
                            </div>
                            <p class="author">- Someone Else</p>
                        </div>
                        <div class="slides">
                            <q>Hell yes.</q>
                            <div class="star-ratings mt-1 mb-1">
                                <div>
                                    <i class="fa-solid fa-star pr-1"></i>
                                </div>
                                <div>
                                    <i class="fa-solid fa-star pr-1"></i>
                                </div>
                                <div>
                                    <i class="fa-solid fa-star pr-1"></i>
                                </div>
                                <div>
                                    <i class="fa-solid fa-star pr-1"></i>
                                </div>
                                <div>
                                    <i class="fa-solid fa-star pr-1"></i>
                                </div>
                            </div>
                            <p class="author">- My Neighbor</p>
                        </div>
                        <a id="prev"><i class="fa-solid fa-arrow-left"></i></a>
                        <a id="next"><i class="fa-solid fa-arrow-right"></i></a>
                    </div>
                    <div class="dot-container">
                        <div class="dot"></div>
                        <div class="dot"></div>
                        <div class="dot"></div>
                    </div>
                </section>
            </main>
        `
    }, req)
}

export default indexPage