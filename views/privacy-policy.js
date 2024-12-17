import layout from "./layout.js"

const privacyPolicyPage = ({}, req) => {
    return layout({ template: `
        <main class="container">
            <section>
                <div class="page-title-div">
                    <h1 class="title is-size-1">
                        <span class="pipe pr-2">|</span>Privacy Policy<span class="pipe pl-2">|</span>
                    </h1>
                </div>
                <div class="mb-3">
                    <p class="is-size-3">Effective Date: December 16, 2024</p>
                </div>
                <div>
                    <p class="is-size-5">
                        <strong>Summit Web Services</strong> is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, use our services, or interact with us.
                    </p>
                    <p class="is-size-5">
                        By using our website or services, you agree to the terms outlined in this Privacy Policy.
                    </p>
                    <hr>
                    <h3 class="is-size-3">1. Information We Collect</h3>
                    <p class="is-size-5 mb-3">
                        We may collect the following types of information:
                    </p>
                    <div class="mb-3">
                        <p class="is-size-5">
                            a. <strong>Personal Information</strong>
                        </p>
                        <p class="is-size-5 pl-5">
                            - Name, email address, phone number, billing address, and payment details when you make a purchase or sign up for our services.
                        </p>
                        <p class="is-size-5 pl-5">
                            - Account information, such as username and password, for access to our platform.
                        </p>
                    </div>
                    <div class="mb-3">
                        <p class="is-size-5">
                            b. <strong>Non-Personal Information</strong>
                        </p>
                        <p class="is-size-5 pl-5">
                            - IP address, browser type, device information, and operating system.
                        </p>
                        <p class="is-size-5 pl-5">
                            - Usage data, such as pages visited, time spent on our website, and other diagnostic data.
                        </p>
                    </div>
                    <div class="mb-3">
                        <p class="is-size-5">
                            c. <strong>Cookies and Tracking Technologies</strong>
                        </p>
                        <p class="is-size-5 pl-5">
                            - Cookies and similar technologies for improving user experience, analytics, and targeted advertising. You can manage your cookie preferences through your browser settings.
                        </p>
                    </div>
                    <h3 class="is-size-3">2. How We Use Your Information</h3>
                    <p class="is-size-5 mb-3">
                        We use your information for the following purposes:
                    </p>
                    <div class="mb-3">
                        <p class="is-size-5 pl-5">
                            - To provide, manage, and improve our services.
                        </p>
                        <p class="is-size-5 pl-5">
                            - To process transactions and send confirmation emails.
                        </p>
                        <p class="is-size-5 pl-5">
                            - Account information, such as username and password, for access to our platform.To communicate with you, including sending updates, promotional offers, or responding to inquiries.
                        </p>
                        <p class="is-size-5 pl-5">
                            - To ensure security and prevent fraudulent activities.
                        </p>
                        <p class="is-size-5 pl-5">
                            - To comply with legal obligations.
                        </p>
                    </div>
                    <h3 class="is-size-3">3. How We Share Your Information</h3>
                    <p class="is-size-5 mb-3">
                        We do not sell or rent your personal information to third parties. However, we may share your information in the following circumstances:
                    </p>
                    <div class="mb-3">
                        <p class="is-size-5 pl-5">
                            - <strong>With Service Providers:</strong> Trusted third-party vendors for hosting, payment processing, email services, and analytics.
                        </p>
                        <p class="is-size-5 pl-5">
                            - <strong>Legal Compliance:</strong> When required by law or to protect our rights, property, or safety.
                        </p>
                        <p class="is-size-5 pl-5">
                            - <strong>Business Transfers:</strong> In the event of a merger, sale, or acquisition of all or part of our business.
                        </p>
                    </div>
                    <h3 class="is-size-3">4. Your Choices and Rights</h3>
                    <p class="is-size-5 mb-3">
                        You have the following rights regarding your information:
                    </p>
                    <div class="mb-3">
                        <p class="is-size-5 pl-5">
                            - <strong>Access and Update:</strong> Request access to your personal information and update or correct inaccuracies.
                        </p>
                        <p class="is-size-5 pl-5">
                            - <strong>Opt-Out:</strong> Unsubscribe from marketing communications at any time by following the opt-out link in our emails.
                        </p>
                        <p class="is-size-5 pl-5 mb-3">
                            - <strong>Data Deletion:</strong> Request deletion of your personal data, subject to legal and contractual obligations.
                        </p>
                        <p class="is-size-5">
                            To exercise these rights, contact us at contact@handierme.com.
                        </p>
                    </div>
                    <h3 class="is-size-3">5. Security of Your Information</h3>
                    <p class="is-size-5 mb-3">
                        We implement industry-standard security measures to protect your personal information. However, no system is completely secure, and we cannot guarantee the absolute security of your data.
                    </p>
                    <h3 class="is-size-3">6. Third-Party Links</h3>
                    <p class="is-size-5 mb-3">
                        Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of these websites. Please review their privacy policies before providing any personal information.
                    </p>
                    <h3 class="is-size-3">7. Children’s Privacy</h3>
                    <p class="is-size-5 mb-3">
                        Our services are not intended for individuals under the age of 13. We do not knowingly collect personal information from children under 13. If you believe we have collected such data, please contact us to request deletion.
                    </p>
                    <h3 class="is-size-3">8. Changes to This Privacy Policy</h3>
                    <p class="is-size-5 mb-3">
                        We may update this Privacy Policy from time to time. Changes will be effective upon posting the revised policy on our website with a new "Effective Date." Your continued use of our services signifies your acceptance of the updated policy.
                    </p>
                    <h3 class="is-size-3">9. Contact Us</h3>
                    <p class="is-size-5 mb-3">
                        If you have questions or concerns about this Privacy Policy or how we handle your information, please contact us at:
                    </p>
                    <strong>Summit Web Services</strong><br />
                    Email: contact@handierme.com<br />
                    Address: [Insert Business Address]
                </div>
            </section>
        </main>
    ` }, req)
}

export default privacyPolicyPage