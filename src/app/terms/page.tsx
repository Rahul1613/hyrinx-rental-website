import Navbar from '@/components/Navbar'

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-900">
      <Navbar />
      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-2">
          HYRINX — Terms &amp; Conditions, User Agreement &amp; Rules of Usage
        </h1>
        <p className="text-sm text-slate-500 mb-2">Last Updated: 21 September 2026</p>
        <p className="text-sm text-slate-500 mb-8">Effective Date: 21 September 2026</p>

        <div className="prose prose-slate max-w-none text-slate-700 space-y-6 text-sm leading-relaxed">
          <p>
            These Terms &amp; Conditions (&ldquo;Terms&rdquo;) govern access to and use of the HYRINX website, digital services, website-rental services, and related services provided through hyrinx.in.
          </p>
          <p>
            By accessing HYRINX, placing an order, making a payment, requesting customisation, or using a website provided by HYRINX, you acknowledge that you have read and agree to these Terms, subject to mandatory rights available under applicable law.
          </p>

          {/* Section 1 */}
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-2">1. About HYRINX</h2>
            <p>HYRINX provides website design, website development, website customisation, and temporary website-rental services.</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Website: hyrinx.in</li>
              <li>Email: hyrinxofficial@gmail.com</li>
              <li>Country: India</li>
            </ul>
            <p>HYRINX may offer ready-made, customised, event-specific, business, project, or other websites for specified periods and service packages.</p>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-2">2. Eligibility</h2>
            <p>You must be 18 years or older to independently purchase HYRINX services.</p>
            <p>If you are below 18, you may use or purchase HYRINX services only with the involvement and consent of a parent or legal guardian, where applicable.</p>
            <p>By placing an order, you confirm that the information you provide is accurate and that you have authority to enter into the transaction.</p>
            <p>HYRINX may request reasonable information where necessary to verify an order, payment, age, or authorisation.</p>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-2">3. HYRINX Website-Rental Model</h2>
            <p>HYRINX primarily provides websites through a temporary rental model.</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Ready-made websites</li>
              <li>Customised websites</li>
              <li>Birthday or wishing websites</li>
              <li>Invitation or event websites</li>
              <li>Startup or business websites</li>
              <li>College, project, or demo websites</li>
              <li>Other website services offered by HYRINX</li>
            </ul>
            <p>The exact features, price, customisation, rental duration, and deliverables applicable to an order will be displayed or communicated before purchase.</p>
            <p>A website rental does not constitute a permanent sale or transfer of ownership of HYRINX&apos;s underlying website template, source code, design system, software, or technology.</p>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-2">4. Rental Period and Expiration</h2>
            <h3 className="text-lg font-semibold text-slate-800 mt-4 mb-1">4.1 Fixed Rental Period</h3>
            <p>Each rental website is provided for the specific period selected by the customer and accepted by HYRINX. Available periods may include 1 day, 3 days, 7 days, 15 days, 1 month, or other periods specified by HYRINX.</p>
            <h3 className="text-lg font-semibold text-slate-800 mt-4 mb-1">4.2 Automatic Expiration</h3>
            <p>At the end of the applicable rental period, HYRINX may deactivate the website, disable public access, remove it from public availability, or otherwise terminate temporary access.</p>
            <h3 className="text-lg font-semibold text-slate-800 mt-4 mb-1">4.3 After Expiration</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>The website is not guaranteed to remain publicly accessible.</li>
              <li>HYRINX is not required to maintain the website as an active public website after expiration.</li>
              <li>Continued access is not guaranteed.</li>
              <li>The customer may need to place a new order to obtain another website service.</li>
              <li>HYRINX does not guarantee an immediate renewal or extension of an expired rental.</li>
            </ul>
            <h3 className="text-lg font-semibold text-slate-800 mt-4 mb-1">4.4 Unused Rental Period</h3>
            <p>The customer is responsible for selecting an appropriate rental period. Failure to use the website during some or all of the purchased rental period does not automatically extend the rental period or create a right to a refund, subject to mandatory consumer rights.</p>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-2">5. Prices and Pre-Purchase Information</h2>
            <p>Before completing an order, HYRINX will make reasonable efforts to provide relevant information necessary to understand the service, including where applicable:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Service description</li>
              <li>Rental period</li>
              <li>Price</li>
              <li>Included features</li>
              <li>Customisation scope</li>
              <li>Applicable additional charges</li>
              <li>Expected delivery or activation information</li>
              <li>Refund and cancellation terms</li>
              <li>Relevant restrictions</li>
              <li>Contact and grievance information</li>
            </ul>
            <p>Customers should review the applicable service information before making payment. HYRINX will not intentionally provide materially misleading information about its services.</p>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-2">6. Orders and Acceptance</h2>
            <p>An order is submitted when the customer completes the applicable ordering process.</p>
            <p>Payment alone does not require HYRINX to accept an order that cannot lawfully or technically be fulfilled.</p>
            <p>HYRINX may decline or cancel an order for legitimate reasons including fraud or suspected fraud, unauthorised payment, prohibited content, illegal intended use, technical impossibility, material pricing or service-information errors, or violation of these Terms.</p>
            <p>Where HYRINX cancels an accepted order and a refund is due, HYRINX will process the applicable refund in accordance with applicable law and its stated refund policy.</p>
          </section>

          {/* Section 7 */}
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-2">7. Payments</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>Customers must provide accurate payment and contact information.</li>
              <li>Payment must be made using payment methods made available by HYRINX.</li>
              <li>Customers must not use stolen, fraudulent, unauthorised, or otherwise unlawful payment methods.</li>
              <li>HYRINX may suspend work where payment is unsuccessful, reversed, disputed, or reasonably suspected to be fraudulent.</li>
              <li>Where third-party payment providers are used, the provider&apos;s applicable terms may also apply.</li>
              <li>Applicable taxes, third-party charges, domain charges, or other charges will be disclosed where applicable.</li>
            </ul>
          </section>

          {/* Section 8 */}
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-2">8. Cancellation and Refunds</h2>
            <p>Refunds will be determined with reference to the stage of work completed and services actually performed, subject to applicable law.</p>
            <h3 className="text-lg font-semibold text-slate-800 mt-4 mb-1">8.1 Before Customisation Begins</h3>
            <p>HYRINX may retain 10% of the amount paid for reserved service capacity, processing, and associated work; the remaining 90% may be refunded, subject to applicable law.</p>
            <h3 className="text-lg font-semibold text-slate-800 mt-4 mb-1">8.2 Customisation Approximately Half Completed</h3>
            <p>HYRINX may retain 30% of the amount paid in respect of work and service resources already committed; the remaining 70% may be refunded, subject to applicable law.</p>
            <h3 className="text-lg font-semibold text-slate-800 mt-4 mb-1">8.3 Customisation Completed</h3>
            <p>HYRINX may retain 45% of the amount paid in respect of work and services performed; the remaining 55% may be refunded, subject to applicable law.</p>
            <h3 className="text-lg font-semibold text-slate-800 mt-4 mb-1">8.4 Consumer-Law Safeguard</h3>
            <p>Nothing in this refund policy is intended to impose a cancellation charge prohibited by applicable consumer-protection law. The Consumer Protection (E-Commerce) Rules, 2020 contain restrictions concerning cancellation charges imposed on consumers after a purchase has been confirmed. The applicable refund will therefore be determined consistently with mandatory legal requirements.</p>
            <h3 className="text-lg font-semibold text-slate-800 mt-4 mb-1">8.5 Refund Processing</h3>
            <p>Where a refund has been approved, HYRINX will initiate it within a reasonable period and in accordance with applicable law and the relevant payment system. Bank or payment-provider processing times may vary.</p>
            <h3 className="text-lg font-semibold text-slate-800 mt-4 mb-1">8.6 Expired Rentals</h3>
            <p>Payment for a rental period does not automatically create a right to a refund because the customer did not use the website, used it less than expected, forgot to use it, or allowed the rental period to expire. This does not limit statutory consumer rights.</p>
          </section>

          {/* Section 9 */}
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-2">9. Customisation</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>Customisation will be performed according to the agreed service package and requirements.</li>
              <li>Customers must provide required content, information, approvals, and instructions within a reasonable time.</li>
              <li>Delays caused by missing or late customer information may affect delivery.</li>
              <li>Changes outside the agreed scope may require additional charges or may be declined.</li>
              <li>HYRINX may use reasonable technical and design judgment where instructions are incomplete or ambiguous.</li>
              <li>HYRINX may request confirmation before implementing material changes where reasonably necessary.</li>
            </ul>
          </section>

          {/* Section 10 */}
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-2">10. Customer-Provided Content</h2>
            <p>Customers may provide names, photographs, videos, logos, text, messages, social-media links, business information, event information, and other materials required to create a website.</p>
            <p>The customer represents that they have the necessary rights, permissions, licences, or authority to provide and use such material.</p>
            <p>Customers must not knowingly provide material that infringes intellectual-property rights, violates privacy or publicity rights, is fraudulent or deceptive, is unlawful, contains malicious code, impersonates another person or organisation, or is intended to facilitate prohibited activity.</p>
            <p>HYRINX may refuse, remove, or decline to publish content that it reasonably believes violates these Terms or applicable law.</p>
          </section>

          {/* Section 11 */}
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-2">11. Intellectual Property</h2>
            <p>HYRINX retains rights in its website templates, source code, reusable components, design systems, frameworks, technical systems, general layouts and structures, HYRINX branding, reusable assets, and other proprietary technology.</p>
            <p>The customer receives a limited, temporary, non-exclusive right to use the applicable customised website during the paid rental period and subject to these Terms.</p>
            <p>The customer does not automatically receive ownership of HYRINX&apos;s underlying source code, templates, technology, or reusable systems.</p>
            <p>Customer-owned material supplied by the customer remains subject to the customer&apos;s applicable rights.</p>
          </section>

          {/* Section 12 */}
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-2">12. User Agreement</h2>
            <p>This section forms the User Agreement between HYRINX and the customer.</p>
            <h3 className="text-lg font-semibold text-slate-800 mt-4 mb-1">12.1 Grant of Use</h3>
            <p>Subject to payment, compliance with these Terms, and the applicable rental period, HYRINX grants the customer a limited, non-exclusive, non-transferable, temporary right to access and use the applicable website for its intended lawful purpose.</p>
            <h3 className="text-lg font-semibold text-slate-800 mt-4 mb-1">12.2 No Ownership Transfer</h3>
            <p>The customer&apos;s right to use a rented website does not transfer ownership of HYRINX templates, source code, software, design systems, infrastructure, or other proprietary materials.</p>
            <h3 className="text-lg font-semibold text-slate-800 mt-4 mb-1">12.3 No Unauthorised Redistribution</h3>
            <p>The customer must not copy, reproduce, resell, sublicense, redistribute, extract, reverse engineer, or commercially exploit HYRINX&apos;s underlying templates, source code, systems, or proprietary technology unless expressly authorised in writing.</p>
            <h3 className="text-lg font-semibold text-slate-800 mt-4 mb-1">12.4 Website Access</h3>
            <p>Access is limited to the applicable rental period and service scope. Attempts to bypass, defeat, or interfere with the expiration mechanism are prohibited.</p>
            <h3 className="text-lg font-semibold text-slate-800 mt-4 mb-1">12.5 Acceptance</h3>
            <p>By placing an order or using the rented website, the customer agrees to comply with this User Agreement, the Rules of Usage below, and all other applicable provisions of these Terms.</p>
          </section>

          {/* Section 13 */}
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-2">13. Rules of Usage / Acceptable Use Policy</h2>
            <p>These rules apply to every HYRINX service, rented website, account, system, and related infrastructure.</p>
            <h3 className="text-lg font-semibold text-slate-800 mt-4 mb-1">13.1 Prohibited Uses</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>Fraud, scams, or deceptive schemes</li>
              <li>Phishing or credential theft</li>
              <li>Malware, ransomware, malicious scripts, or harmful code</li>
              <li>Hacking, unauthorised access, or attempts to compromise systems</li>
              <li>Identity theft or impersonation</li>
              <li>Fake government, official, banking, financial, or institutional websites</li>
              <li>Unauthorised collection or misuse of personal information</li>
              <li>Copyright, trademark, or other intellectual-property infringement</li>
              <li>Threats, harassment, or unlawful abuse</li>
              <li>Illegal activities or facilitation of illegal activities</li>
              <li>Distribution of content that violates applicable law</li>
              <li>Activities intended to damage HYRINX, its infrastructure, customers, or third parties</li>
              <li>Attempts to bypass website expiration or access controls</li>
              <li>Reverse engineering or unauthorised extraction of HYRINX source code or proprietary systems</li>
              <li>Reselling or redistributing HYRINX templates or services without authorisation</li>
              <li>Using HYRINX infrastructure to send spam or conduct abusive automated activity</li>
              <li>Any other activity prohibited by applicable law</li>
            </ul>
            <h3 className="text-lg font-semibold text-slate-800 mt-4 mb-1">13.2 Security</h3>
            <p>Customers must not attempt to access another customer&apos;s data, HYRINX administrative systems, hosting infrastructure, source repositories, payment systems, or other restricted resources.</p>
            <h3 className="text-lg font-semibold text-slate-800 mt-4 mb-1">13.3 Content Standards</h3>
            <p>Customers are responsible for ensuring that content submitted for publication is lawful, accurate, and appropriately authorised.</p>
            <h3 className="text-lg font-semibold text-slate-800 mt-4 mb-1">13.4 Enforcement</h3>
            <p>HYRINX may investigate suspected violations and may suspend, restrict, disable, or terminate access where reasonably necessary to protect users, infrastructure, legal rights, or comply with law.</p>
            <h3 className="text-lg font-semibold text-slate-800 mt-4 mb-1">13.5 No Circumvention</h3>
            <p>Customers must not attempt to bypass technical controls, rental expiry, access restrictions, security mechanisms, or other safeguards used by HYRINX.</p>
          </section>

          {/* Section 14 */}
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-2">14. Suspension and Termination</h2>
            <p>HYRINX may suspend, restrict, or terminate a service where reasonably necessary because the customer violates these Terms, the website is used for unlawful or prohibited activity, materially false or fraudulent information is provided, payment is fraudulent or unauthorised, the website presents a significant security, legal, or technical risk, or HYRINX is required to act by law or a competent authority.</p>
            <p>Where reasonably practicable, HYRINX may provide notice before suspension.</p>
            <p>Immediate action may be taken where necessary to address serious legal, security, or operational risks.</p>
            <p>Any refund arising from suspension or termination will be determined according to the circumstances and applicable law.</p>
          </section>

          {/* Section 15 */}
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-2">15. Website Availability</h2>
            <p>HYRINX will make reasonable efforts to provide reliable services, but continuous or uninterrupted availability cannot be guaranteed. This includes but is not limited to: hosting failures, domain problems, network failures, maintenance, software errors, cybersecurity incidents, third-party outages, power or telecommunications failures, and other circumstances outside HYRINX&apos;s reasonable control.</p>
          </section>

          {/* Section 16 */}
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-2">16. Third-Party Services</h2>
            <p>HYRINX may use third-party providers for hosting, domains, payments, email, cloud storage, security, analytics, and other technical infrastructure. Third-party providers may have separate terms, privacy policies, fees, and availability conditions. HYRINX cannot guarantee uninterrupted availability of services controlled by independent third parties.</p>
          </section>

          {/* Section 17 */}
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-2">17. Customer Responsibilities</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>Provide accurate information.</li>
              <li>Provide required content on time.</li>
              <li>Review the website and supplied information.</li>
              <li>Check names, dates, prices, links, contact details, and other information.</li>
              <li>Ensure supplied content is lawful.</li>
              <li>Ensure intended use complies with applicable law.</li>
              <li>Protect credentials or account information supplied to the customer.</li>
              <li>Inform HYRINX promptly about material problems.</li>
            </ul>
            <p>HYRINX is not responsible for errors resulting solely from inaccurate information supplied or approved by the customer.</p>
          </section>

          {/* Section 18 */}
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-2">18. Backups and Website Data</h2>
            <p>HYRINX may retain backups or copies of website-related information for legitimate operational purposes including recovery, security, troubleshooting, dispute resolution, and legal compliance.</p>
            <p>Website expiration does not necessarily mean immediate deletion of all associated data. Data retention and processing are also governed by the HYRINX Privacy Policy.</p>
          </section>

          {/* Section 19 */}
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-2">19. Disclaimer</h2>
            <p>HYRINX provides services using reasonable care appropriate to the service provided. However, HYRINX does not guarantee continuous availability, identical operation on every device or browser, uninterrupted third-party services, particular business, financial, academic, marketing, social, or personal results, or continued access after the rental period expires.</p>
            <p>Nothing in these Terms excludes or restricts any consumer right or liability that cannot legally be excluded or restricted.</p>
          </section>

          {/* Section 20 */}
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-2">20. Limitation of Liability</h2>
            <p>To the maximum extent permitted by applicable law, HYRINX will not be liable for indirect, incidental, special, consequential, or unforeseeable losses arising from use of its services, including loss of revenue, profits, business opportunities, data, reputation, expected results, or temporary website availability.</p>
            <p>Nothing in this section excludes or limits liability where such exclusion or limitation is prohibited by applicable law.</p>
          </section>

          {/* Section 21 */}
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-2">21. Force Majeure</h2>
            <p>HYRINX will not be responsible for delays or failures caused by circumstances beyond its reasonable control, including natural disasters, government actions, major hosting or cloud outages, cybersecurity incidents, power failures, telecommunications failures, war or civil unrest, epidemics or pandemics, or other events beyond reasonable control.</p>
          </section>

          {/* Section 22 */}
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-2">22. Consumer Rights</h2>
            <p>Nothing in these Terms is intended to remove, restrict, or waive any mandatory rights available to a consumer under applicable Indian law.</p>
            <p>The Department of Consumer Affairs administers the Consumer Protection Act, 2019 and rules made under it. The Department states that the consumer-protection framework provides mechanisms for addressing consumer disputes and unfair trade practices.</p>
            <p>The Consumer Protection (E-Commerce) Rules, 2020 apply to goods and services bought or sold over digital or electronic networks, including digital products, and cover e-commerce models subject to their terms. HYRINX will structure its consumer-facing processes in accordance with applicable requirements.</p>
            <p>The Department of Consumer Affairs currently lists the Consumer Protection (E-Commerce) (Amendment) Rules, 2026. HYRINX will update its processes and these Terms as necessary when applicable provisions take effect.</p>
          </section>

          {/* Section 23 */}
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-2">23. Grievance Redressal</h2>
            <p>HYRINX will maintain a grievance-redressal mechanism for consumer complaints in accordance with applicable law.</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Email: hyrinxofficial@gmail.com</li>
            </ul>
            <p>Customers may submit complaints relating to HYRINX services, orders, payments, refunds, websites, or other consumer-related matters using the above contact details.</p>
            <p>The Consumer Protection (E-Commerce) Rules, 2020 provide for acknowledgement of consumer complaints within 48 hours and redressal within one month from receipt, subject to the applicable legal framework.</p>
          </section>

          {/* Section 24 */}
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-2">24. Electronic Communications</h2>
            <p>By communicating electronically with HYRINX, customers acknowledge that service-related communications may be provided electronically, subject to applicable law. Electronic records may be maintained for orders, payments, customer communications, support requests, refunds, and other legitimate business purposes.</p>
          </section>

          {/* Section 25 */}
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-2">25. Purchase Consent and Checkout</h2>
            <p>Where HYRINX uses an online checkout or ordering system, the customer should actively confirm the purchase. HYRINX should not rely on pre-ticked consent boxes where applicable consumer-protection requirements require affirmative action.</p>
            <p className="font-medium text-slate-800">Recommended checkout wording:</p>
            <p className="bg-slate-100 p-4 rounded-xl border border-slate-200 text-slate-700">☐ I have read and agree to the HYRINX Terms &amp; Conditions and Privacy Policy.</p>
            <p>The customer should actively tick the checkbox before completing the purchase.</p>
          </section>

          {/* Section 26 */}
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-2">26. Privacy</h2>
            <p>The collection and processing of personal information by HYRINX is governed by the HYRINX Privacy Policy available through hyrinx.in. Mandatory privacy and data-protection requirements will prevail where applicable.</p>
          </section>

          {/* Section 27 */}
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-2">27. Changes to Services</h2>
            <p>HYRINX may modify, replace, suspend, or discontinue features, templates, packages, pricing, technical systems, or other aspects of its services. Such changes will not automatically alter the agreed terms of a completed rental period, except where reasonably necessary because of legal, security, technical, or other legitimate circumstances.</p>
          </section>

          {/* Section 28 */}
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-2">28. Changes to These Terms</h2>
            <p>HYRINX may update these Terms from time to time. The updated version will be published on hyrinx.in with a revised Last Updated date. For existing customers, the version applicable to their transaction will generally be the version accepted at the time of purchase, except where an update is required by law or applies to continuing services.</p>
          </section>

          {/* Section 29 */}
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-2">29. Governing Law and Disputes</h2>
            <p>These Terms are governed by the laws of India. Any dispute will be subject to courts or legally applicable consumer-dispute forums having jurisdiction under applicable law. Nothing in this section prevents a consumer from exercising a mandatory statutory right or remedy available under applicable law.</p>
          </section>

          {/* Section 30 */}
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-2">30. Severability</h2>
            <p>If any provision of these Terms is determined to be invalid, unlawful, or unenforceable, the remaining provisions will continue to apply to the extent permitted by law.</p>
          </section>

          {/* Section 31 */}
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-2">31. Entire Agreement</h2>
            <p>These Terms, together with the HYRINX Privacy Policy, applicable service/package description, order details, and any applicable written service agreement, constitute the applicable agreement between HYRINX and the customer concerning the relevant service, subject to mandatory rights under applicable law.</p>
          </section>

          {/* Section 32 */}
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-2">32. Contact</h2>
            <ul className="list-none space-y-1">
              <li><strong>HYRINX</strong></li>
              <li>Website: <a href="https://hyrinx.in" className="text-blue-600 hover:text-blue-700 underline">hyrinx.in</a></li>
              <li>Email: <a href="mailto:hyrinxofficial@gmail.com" className="text-blue-600 hover:text-blue-700 underline">hyrinxofficial@gmail.com</a></li>
            </ul>
            <p>For general enquiries, orders, refunds, complaints, technical issues, grievances, or other service-related matters, contact HYRINX using the above details.</p>
          </section>
        </div>
      </div>
    </div>
  )
}
