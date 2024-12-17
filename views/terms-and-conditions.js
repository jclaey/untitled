import layout from "./layout.js"

const termsAndConditionsPage = ({}, req) => {
    return layout({ template: `
        <main>
            <section>
                <div class="page-title-div">
                    <h1 class="title is-size-1">
                        <span class="pipe pr-2">|</span>Terms and Conditions<span class="pipe pl-2">|</span>
                    </h1>
                </div>
            </section>
        </main>
    ` }, req)
}

export default termsAndConditionsPage