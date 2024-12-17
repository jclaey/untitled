import layout from "./layout.js"

const termsAndConditionsPage = ({}, req) => {
    return layout({ template: `
        <main class="container">
            <section>
                <div class="page-title-div">
                    <h1 class="title is-size-1">
                        <span class="pipe pr-2">|</span>Terms and Conditions<span class="pipe pl-2">|</span>
                    </h1>
                </div>
                <div class="mb-3">
                    <p class="is-size-3">Effective Date: December 16, 2024</p>
                </div>
                <div>
                    <p class="is-size-5">
                        Welcome to <strong>Summit Web Services</strong>. By accessing or using our website and services, you agree to be bound by these Terms and Conditions. Please read them carefully before using our services. If you do not agree, please refrain from using our services.
                    </p>
                    <hr>
                    <h3 class="is-size-3">1. Acceptance of Terms</h3>
                    <p class="is-size-5 mb-3">
                        By accessing our website or purchasing our services, you agree to comply with these Terms and Conditions and any applicable laws and regulations.
                    </p>
                    <h3 class="is-size-3">2. Services</h3>
                    <p class="is-size-5 mb-3">
                        <strong>Summit Web Services</strong> provides web development, design, and related digital services as described on our website. We reserve the right to modify or discontinue our services without prior notice.
                    </p>
                    <h3 class="is-size-3">3. User Responsibilities</h3>
                    <p class="is-size-5 mb-3">
                        By using our services, you agree to:
                    </p>
                    <div class="mb-3">
                        <p class="is-size-5 pl-5">
                            - Provide accurate, current, and complete information during sign-up or while using our services.
                        </p>
                        <p class="is-size-5 pl-5">
                            - Maintain the confidentiality of your account credentials and notify us immediately of any unauthorized access.
                        </p>
                        <p class="is-size-5 pl-5">
                            - Use our services for lawful purposes only and not engage in activities that harm our company or other users.
                        </p>
                    </div>
                    <h3 class="is-size-3">4. Payments and Billing</h3>
                    <div class="mb-3">
                        <p class="is-size-5 pl-5">
                            - All payments are due as outlined in the agreed-upon project terms or at checkout on our platform.
                        </p>
                        <p class="is-size-5 pl-5">
                            - Failure to complete payment may result in suspension or termination of services.
                        </p>
                        <p class="is-size-5 pl-5">
                            - You are responsible for all applicable taxes unless otherwise specified.
                        </p>
                    </div>
                    <h3 class="is-size-3">5. Intellectual Property</h3>
                    <div class="mb-3">
                        <p class="is-size-5 pl-5">
                            - All content, designs, and code created by UCP are our intellectual property unless otherwise agreed upon.
                        </p>
                        <p class="is-size-5 pl-5">
                            - Upon project completion and payment, we grant you a license to use the deliverables for the intended purpose outlined in the project agreement.
                        </p>
                        <p class="is-size-5 pl-5">
                            - You may not resell, distribute, or modify our deliverables without our express written consent.
                        </p>
                    </div>
                    <h3 class="is-size-3">6. Cancellations and Refunds</h3>
                    <div class="mb-3">
                        <p class="is-size-5 pl-5">
                            - Projects canceled by the client after the commencement of work may incur a cancellation fee based on the work completed.
                        </p>
                        <p class="is-size-5 pl-5">
                            - Refunds for digital products or services are not provided unless otherwise specified in the specific agreement.
                        </p>
                        <p class="is-size-5 pl-5">
                            - Any disputes must be raised within 30 days of project delivery.
                        </p>
                    </div>
                    <h3 class="is-size-3">7. Limitations of Liability</h3>
                    <div class="mb-3">
                        <p class="is-size-5 pl-5">
                            - <strong>Summit Web Services</strong> is not liable for indirect, incidental, or consequential damages resulting from your use of our services.
                        </p>
                        <p class="is-size-5 pl-5">
                            - While we strive for excellence, we do not guarantee that our services will meet all expectations or be error-free.
                        </p>
                        <p class="is-size-5 pl-5">
                            - You agree to indemnify and hold UCP harmless from claims arising from your use of our services.
                        </p>
                    </div>
                    <h3 class="is-size-3">8. Confidentiality</h3>
                    <div class="mb-3">
                        <p class="is-size-5">
                            Both parties agree to maintain the confidentiality of any proprietary or sensitive information shared during the course of the project. This includes, but is not limited to, business plans, client lists, and technical information.
                        </p>
                    </div>
                    <h3 class="is-size-3">9. Termination</h3>
                    <div class="mb-3">
                        <p class="is-size-5">
                            We reserve the right to suspend or terminate your access to our services if you violate these Terms and Conditions. Upon termination, you must cease all use of our deliverables unless agreed otherwise.
                        </p>
                    </div>
                    <h3 class="is-size-3">10. Third-Party Tools and Services</h3>
                    <div class="mb-3">
                        <p class="is-size-5">
                            Our services may integrate with third-party tools or platforms. We are not responsible for the terms, conditions, or performance of third-party services.
                        </p>
                    </div>
                    <h3 class="is-size-3">11. Governing Law</h3>
                    <div class="mb-3">
                        <p class="is-size-5">
                            These Terms and Conditions are governed by the laws of [Insert Jurisdiction]. Any disputes will be resolved in accordance with these laws in the appropriate courts.
                        </p>
                    </div>
                    <h3 class="is-size-3">12. Changes to Terms</h3>
                    <div class="mb-3">
                        <p class="is-size-5">
                            We may update these Terms and Conditions from time to time. Changes will be effective upon posting the updated terms on our website with a new "Effective Date." Your continued use of our services signifies your acceptance of the updated terms.
                        </p>
                    </div>
                    <h3 class="is-size-3">13. Contact Us</h3>
                    <div class="mb-3">
                        <p class="is-size-5 mb-3">
                            If you have questions about these Terms and Conditions, please contact us at:
                        </p>
                        <strong>Summit Web Services</strong><br />
                        Email: contact@handierme.com<br />
                        Address: [Insert Business Address]
                    </div>
                </div>
            </section>
        </main>
    ` }, req)
}

export default termsAndConditionsPage