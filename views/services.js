import layout from "./layout.js"

const servicesPage = () => {
    return layout({ template: `
        <main class="container">
            <div>
                <h1 class="title is-size-1 mb-6">Services</h1>
            </div>
            <div class="columns">
                <div class="column">
                    <div class="columns">
                        <div class="column">
                            <div class="card mb-4">
                                <div class="card-image">
                                    <figure class="image is-4by3">
                                        <img src="/resources/images/services_websites.png" />
                                    </figure>
                                </div>
                                <div class="card-content">
                                    <div class="content">
                                        Websites
                                    </div>
                                </div>
                            </div>
                            <div class="card">
                                <div class="card-image">
                                    <figure class="image is-4by3">
                                        <img src="/resources/images/services_web_applications.png" />
                                    </figure>
                                </div>
                                <div class="card-content">
                                    <div class="content">
                                        Web Applications
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="column">
                            <div class="card mb-4">
                                <div class="card-image">
                                    <figure class="image is-4by3">
                                        <img src="/resources/images/services_mobile_applications.png" />
                                    </figure>
                                </div>
                                <div class="card-content">
                                    <div class="content">
                                        Mobile Applications
                                    </div>
                                </div>
                            </div>
                            <div class="card">
                                <div class="card-image">
                                    <figure class="image is-4by3">
                                        <img src="/resources/images/services_desktop_applications.png" />
                                    </figure>
                                </div>
                                <div class="card-content">
                                    <div class="content">
                                        Desktop Applications
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="column">
                    <div class="columns">
                        <div class="column">
                            <div class="card mb-4">
                                <div class="card-image">
                                    <figure class="image is-4by3">
                                        <img src="/resources/images/services_augmented_reality.png" />
                                    </figure>
                                </div>
                                <div class="card-content">
                                    <div class="content">
                                        Augmented Reality
                                    </div>
                                </div>
                            </div>
                            <div class="card">
                                <div class="card-image">
                                    <figure class="image is-4by3">
                                        <img src="/resources/images/services_virtual_reality.png" />
                                    </figure>
                                </div>
                                <div class="card-content">
                                    <div class="content">
                                        Virtual Reality
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="column">
                            <div class="card mb-4">
                                <div class="card-image">
                                    <figure class="image is-4by3">
                                        <img src="/resources/images/services_blockchain.png" />
                                    </figure>
                                </div>
                                <div class="card-content">
                                    <div class="content">
                                        Blockchain
                                    </div>
                                </div>
                            </div>
                            <div class="card">
                                <div class="card-image">
                                    <figure class="image is-4by3">
                                        <img src="/resources/images/services_artificial_intelligence.png" />
                                    </figure>
                                </div>
                                <div class="card-content">
                                    <div class="content">
                                        Artificial Intelligence
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    ` })
}

export default servicesPage