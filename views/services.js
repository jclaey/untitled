import layout from "./layout.js"

const servicesPage = () => {
    return layout({ template: `
        <main class="container">
            <div class="columns">
                <div class="column">
                    <div class="columns">
                        <div class="column">
                            <div class="card mb-4">
                                <div class="card-image">
                                    <figure class="image is-4by3">
                                        <img src="" />
                                    </figure>
                                </div>
                                <div class="card-content">
                                    <div class="content">
                                        Service 1
                                    </div>
                                </div>
                            </div>
                            <div class="card">
                                <div class="card-image">
                                    <figure class="image is-4by3">
                                        <img src="" />
                                    </figure>
                                </div>
                                <div class="card-content">
                                    <div class="content">
                                        Service 2
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="column">
                            <div class="card mb-4">
                                <div class="card-image">
                                    <figure class="image is-4by3">
                                        <img src="" />
                                    </figure>
                                </div>
                                <div class="card-content">
                                    <div class="content">
                                        Service 3
                                    </div>
                                </div>
                            </div>
                            <div class="card">
                                <div class="card-image">
                                    <figure class="image is-4by3">
                                        <img src="" />
                                    </figure>
                                </div>
                                <div class="card-content">
                                    <div class="content">
                                        Service 4
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
                                        <img src="" />
                                    </figure>
                                </div>
                                <div class="card-content">
                                    <div class="content">
                                        Service 5
                                    </div>
                                </div>
                            </div>
                            <div class="card">
                                <div class="card-image">
                                    <figure class="image is-4by3">
                                        <img src="" />
                                    </figure>
                                </div>
                                <div class="card-content">
                                    <div class="content">
                                        Service 6
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="column">
                            <div class="card mb-4">
                                <div class="card-image">
                                    <figure class="image is-4by3">
                                        <img src="" />
                                    </figure>
                                </div>
                                <div class="card-content">
                                    <div class="content">
                                        Service 7
                                    </div>
                                </div>
                            </div>
                            <div class="card">
                                <div class="card-image">
                                    <figure class="image is-4by3">
                                        <img src="" />
                                    </figure>
                                </div>
                                <div class="card-content">
                                    <div class="content">
                                        Service 8
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