// Verbatim legal policy content supplied by LabNova Scientific.
// IMPORTANT: This copy must not be reworded — only the structure (headings /
// paragraph breaks) is used to lay the text out on the page.

export type LegalSection = {
  heading?: string;
  paragraphs: string[];
};

export type LegalDoc = {
  slug: "terms" | "privacy" | "shipping" | "returns";
  navLabel: string;
  title: string;
  effectiveDateLabel: string;
  intro?: string[];
  sections: LegalSection[];
  contact?: LegalSection;
};

export const legalDocs: LegalDoc[] = [
  {
    slug: "terms",
    navLabel: "Terms & Conditions",
    title: "Terms & Conditions of Sale",
    effectiveDateLabel: "Effective Date: 2026.09.11",
    intro: [
      "These Terms and Conditions of Sale (\u201cTerms\u201d) apply to products and services supplied by LabNova Scientific (\u201cLabNova\u201d, \u201cwe\u201d, \u201cus\u201d or \u201cour\u201d) to a customer (\u201cCustomer\u201d, \u201cyou\u201d or \u201cyour\u201d). By placing an order with LabNova, accepting a quotation, issuing a purchase order or otherwise purchasing products or services from us, you agree to these Terms.",
    ],
    sections: [
      {
        heading: "Quotations",
        paragraphs: [
          "Quotations are valid until the expiry date stated on the quotation unless otherwise specified. Prices, availability and lead times are based on information available at the time of quotation and may change after expiry. A quotation does not constitute acceptance of an order; an order becomes binding once accepted by LabNova.",
        ],
      },
      {
        heading: "Orders",
        paragraphs: [
          "Orders may be submitted by purchase order, email, our website or another method accepted by LabNova. Customers are responsible for ensuring order information is accurate, including product descriptions, catalogue numbers, quantities, specifications, delivery details and special requirements. LabNova may request clarification before accepting an order and may accept or decline an order subject to applicable law.",
        ],
      },
      {
        heading: "Prices & GST",
        paragraphs: [
          "Unless otherwise stated, prices are in Australian Dollars (AUD); GST is additional where applicable unless expressly stated as included; and freight, handling, delivery, dangerous-goods, temperature-controlled, import or other applicable charges are additional unless expressly stated as included. Where significant supplier pricing, exchange-rate, freight, duty or other cost changes occur before acceptance, LabNova may provide revised pricing for Customer approval.",
        ],
      },
      {
        heading: "Payment",
        paragraphs: [
          "Payment must be made according to the applicable quotation, invoice or approved Customer account. Unless credit terms are approved in writing, payment may be required before products are ordered or dispatched. Customers should reference the quotation or invoice number when paying. LabNova may suspend further supply where an account is overdue, subject to applicable law and agreed credit arrangements.",
        ],
      },
      {
        heading: "Product Availability",
        paragraphs: [
          "All products are subject to availability. Stock status may change before an order is processed. If a product becomes unavailable, LabNova may discuss an alternative, backorder, revised lead time or cancellation of the affected item. A materially different product will not be substituted without Customer approval.",
        ],
      },
      {
        heading: "Lead Times",
        paragraphs: [
          "Lead times and delivery dates are estimates unless expressly agreed otherwise in writing. Supplier availability, manufacturing, international transport, customs, regulatory requirements and freight providers may affect delivery. LabNova will make reasonable efforts to communicate material delays once known.",
        ],
      },
      {
        heading: "Delivery & Freight",
        paragraphs: [
          "Products will be delivered to the address provided by the Customer. Additional charges may apply for express delivery, regional or remote locations, oversized or heavy equipment, dangerous goods, refrigerated or temperature-controlled products, and specialised transport or handling. Customers are responsible for accurate delivery information and suitable receiving arrangements.",
        ],
      },
      {
        heading: "Inspection of Goods",
        paragraphs: [
          "Customers should inspect products as soon as reasonably practicable after delivery. Apparent shortages, incorrect products, transport damage or delivery discrepancies should be reported promptly. LabNova may request photographs, catalogue numbers, batch/lot information, packaging details or delivery documentation. Nothing in this clause limits rights available under applicable law.",
        ],
      },
      {
        heading: "Returns",
        paragraphs: [
          "Products should not be returned without prior authorisation. Eligibility may depend on the reason for return, product condition, packaging, storage history and manufacturer/supplier requirements. Subject to applicable law, change-of-mind returns may not be available for special-order/imported/customised items, opened or used products, chemicals/reagents, reference materials, sterile products with compromised packaging, temperature-sensitive goods, limited-shelf-life products, or products whose post-delivery storage cannot reasonably be verified. This does not exclude legally available remedies.",
        ],
      },
      {
        heading: "Special-Order, Imported & Custom Products",
        paragraphs: [
          "Certain products may be sourced specifically for an individual Customer. LabNova will identify material special-order conditions where reasonably practicable before acceptance. Once LabNova has committed to purchasing, importing, manufacturing or customising the product, cancellation or return may be restricted and reasonable costs already incurred may be payable, subject to applicable law.",
        ],
      },
      {
        heading: "Order Cancellation",
        paragraphs: [
          "Customers should contact LabNova as soon as possible to modify or cancel an order. Where LabNova has not yet committed to purchasing, manufacturing or importing the products, reasonable efforts will be made to accommodate the request. Where costs have already been incurred, reasonable and properly incurred cancellation costs may be payable to the extent permitted by law.",
        ],
      },
      {
        heading: "Product Information & Specifications",
        paragraphs: [
          "Product descriptions, images, specifications and technical information may originate from manufacturers or suppliers. Manufacturers may change specifications, packaging, appearance or design. Website images are generally illustrative and should not be relied upon as confirmation of an exact specification. Where a specification, material, dimension, tolerance or certification is critical, contact LabNova before ordering so it can be confirmed where reasonably possible.",
        ],
      },
      {
        heading: "Product Suitability",
        paragraphs: [
          "Customers are responsible for determining product suitability for their intended application, process or environment. Product-selection or sourcing assistance does not replace the Customer\u2019s own technical, safety, regulatory or professional assessment unless LabNova has expressly agreed to provide a specific professional service. Products must be used, stored, handled and disposed of in accordance with applicable laws, manufacturer instructions and safety documentation.",
        ],
      },
      {
        heading: "Chemicals, Dangerous Goods & Regulated Products",
        paragraphs: [
          "Certain products may be subject to legal, regulatory, transport, storage or end-use restrictions. LabNova may request information or documentation before supply and may decline an order where supply would not comply with applicable requirements. Customers are responsible for suitable facilities, procedures, licences, permits and trained personnel. Additional freight, documentation, packaging and handling charges may apply.",
        ],
      },
      {
        heading: "Temperature-Sensitive & Limited-Shelf-Life Products",
        paragraphs: [
          "Products requiring controlled-temperature transportation or storage may require specialised delivery arrangements and charges. Customers are responsible for appropriate receiving personnel and storage facilities. Where remaining shelf life is important, minimum requirements should be communicated before ordering.",
        ],
      },
      {
        heading: "Certificates & Technical Documentation",
        paragraphs: [
          "Depending on the product and manufacturer, LabNova may assist with available Certificates of Analysis, Certificates of Conformance, Safety Data Sheets, technical data sheets, calibration certificates, manufacturer specifications and other technical documentation. Availability and content depend on the manufacturer, supplier and product and are not guaranteed unless expressly agreed before order acceptance.",
        ],
      },
      {
        heading: "Warranties",
        paragraphs: [
          "Products may be covered by manufacturer warranties. Where applicable, LabNova will reasonably assist with legitimate warranty claims. Any additional warranty provided directly by LabNova will be stated separately in writing.",
        ],
      },
      {
        heading: "Australian Consumer Law",
        paragraphs: [
          "Nothing in these Terms excludes, restricts or modifies any consumer guarantee, right or remedy under the Australian Consumer Law or other applicable law where it cannot lawfully be excluded, restricted or modified. Any permitted limitation applies only to the maximum extent allowed by law.",
        ],
      },
      {
        heading: "Limitation of Liability",
        paragraphs: [
          "To the extent permitted by law, LabNova is not liable for indirect, incidental, special or consequential loss arising from supply, delay, use or inability to use products or services where such liability may lawfully be excluded or limited. Nothing in these Terms limits liability where it cannot legally be excluded or limited.",
        ],
      },
      {
        heading: "Intellectual Property",
        paragraphs: [
          "Third-party trademarks, manufacturer names, product images and catalogue information remain the property of their respective owners. LabNova branding, website content, quotations, documents and original materials remain the intellectual property of LabNova or its licensors unless otherwise stated. Purchasing a product does not transfer associated intellectual property rights.",
        ],
      },
      {
        heading: "Force Majeure",
        paragraphs: [
          "To the extent permitted by law, LabNova is not responsible for delay or failure caused by circumstances outside its reasonable control, including natural disasters, fire, flood, industrial action, transportation disruption, supplier failure, government action, import/export restrictions, customs delays or significant infrastructure failure. Where reasonably possible, LabNova will communicate material impacts and work to minimise disruption.",
        ],
      },
      {
        heading: "Privacy",
        paragraphs: [
          "Personal information may be used for legitimate business purposes including enquiries, quotations, orders, delivery, account administration and customer support, and will be handled in accordance with applicable privacy requirements and LabNova\u2019s Privacy Policy.",
        ],
      },
      {
        heading: "Website Information",
        paragraphs: [
          "LabNova makes reasonable efforts to keep website information accurate and current. Product specifications, availability, images, descriptions and pricing may change. If website information conflicts with an accepted written quotation or order confirmation, the applicable accepted commercial documentation will generally take precedence, subject to applicable law.",
        ],
      },
      {
        heading: "Governing Law",
        paragraphs: [
          "These Terms are governed by the laws applicable in Victoria, Australia. The parties submit to the jurisdiction of courts and tribunals having jurisdiction in Victoria, subject to rights available under Australian law.",
        ],
      },
      {
        heading: "Changes to These Terms",
        paragraphs: [
          "LabNova may update these Terms from time to time. The published version will display its effective date. Terms applicable to an accepted order will generally be those provided or made available in connection with that transaction unless otherwise agreed or required by law.",
        ],
      },
    ],
    contact: {
      heading: "Contact",
      paragraphs: [
        "LabNova Scientific",
        "ABN 68 339 533 614",
        "Website: labnova.com.au",
        "General enquiries: info@labnova.com.au",
        "Quotation enquiries: quotes@labnova.com.au",
        "Orders: orders@labnova.com.au",
      ],
    },
  },
  {
    slug: "privacy",
    navLabel: "Privacy Policy",
    title: "Privacy Policy",
    effectiveDateLabel: "Effective Date: 2026.09.11",
    intro: [
      "LabNova Scientific respects your privacy and is committed to handling personal information responsibly. This policy explains how we may collect, use, store and disclose personal information when you interact with LabNova.",
    ],
    sections: [
      {
        heading: "Information We May Collect",
        paragraphs: [
          "We may collect your name, job title, organisation, business address, email, telephone number, billing and delivery details, quotation/order information, purchase history, account information, communications and enquiries, website technical information, and other information reasonably necessary to provide our products or services.",
        ],
      },
      {
        heading: "How We Use Your Information",
        paragraphs: [
          "We may use personal information to respond to enquiries, prepare quotations, process orders, arrange delivery, administer customer and supplier accounts, provide customer service and technical support, communicate about products/services, maintain business records, improve our website and services, prevent fraud or misuse, comply with legal obligations, and send marketing communications where permitted.",
        ],
      },
      {
        heading: "Disclosure of Information",
        paragraphs: [
          "Where reasonably necessary, information may be shared with manufacturers, suppliers, freight/logistics providers, payment providers, IT/service providers and professional advisers, or where required or authorised by law. LabNova does not sell personal information.",
        ],
      },
      {
        heading: "Overseas Providers and Suppliers",
        paragraphs: [
          "Some suppliers, manufacturers or service providers may be located outside Australia. Where information needs to be disclosed internationally to fulfil an enquiry or order, LabNova will take reasonable steps appropriate to the circumstances to protect that information and comply with applicable requirements.",
        ],
      },
      {
        heading: "Website & Cookies",
        paragraphs: [
          "Our website may use cookies or similar technologies to support functionality, understand website usage and improve user experience. Browser settings may allow users to restrict cookies, although this may affect website functions.",
        ],
      },
      {
        heading: "Data Security",
        paragraphs: [
          "LabNova takes reasonable steps to protect personal information against misuse, interference, loss, unauthorised access, modification or disclosure. No electronic transmission or storage method can be guaranteed completely secure.",
        ],
      },
      {
        heading: "Access & Correction",
        paragraphs: [
          "You may contact LabNova to request access to personal information we hold about you or to request correction of inaccurate or out-of-date information.",
        ],
      },
      {
        heading: "Marketing Communications",
        paragraphs: [
          "Where permitted by law, LabNova may send relevant product, service or business updates. You may unsubscribe from marketing communications at any time. Necessary transactional communications relating to quotations, orders, accounts or customer service may still be sent.",
        ],
      },
    ],
    contact: {
      heading: "Privacy Enquiries",
      paragraphs: [
        "LabNova Scientific | ABN 68 339 533 614 | info@labnova.com.au | labnova.com.au",
      ],
    },
  },
  {
    slug: "shipping",
    navLabel: "Shipping & Delivery Policy",
    title: "Shipping & Delivery Policy",
    effectiveDateLabel: "Effective Date: 2026.09.11",
    sections: [
      {
        heading: "Order Processing",
        paragraphs: [
          "Orders are processed following acceptance by LabNova and satisfaction of applicable payment, account or technical requirements. Special-order, imported, customised, dangerous or temperature-sensitive products may require additional arrangements.",
        ],
      },
      {
        heading: "Delivery Locations",
        paragraphs: [
          "LabNova can arrange delivery to eligible Australian business addresses. Regional or remote delivery may take longer and may incur additional freight charges. Contact us regarding unusual, international or specialised delivery requirements.",
        ],
      },
      {
        heading: "Freight Charges",
        paragraphs: [
          "Freight may depend on destination, order size/weight, dimensions, urgency, dangerous-goods classification, temperature control and specialised packaging/handling. Where freight is not included, applicable charges will be identified in the quotation, order confirmation or otherwise communicated before finalisation where reasonably practicable.",
        ],
      },
      {
        heading: "Delivery Timeframes",
        paragraphs: [
          "Delivery dates and lead times are estimates unless expressly agreed otherwise in writing. Supplier availability, manufacturing, international freight, customs, import requirements, courier networks and circumstances outside LabNova\u2019s reasonable control may affect delivery. LabNova will make reasonable efforts to advise of material delays once known.",
        ],
      },
      {
        heading: "In-Stock Products",
        paragraphs: [
          "Products confirmed as in stock will generally be dispatched following order acceptance and satisfaction of applicable payment requirements. Actual dispatch and delivery times vary by destination and freight arrangement.",
        ],
      },
      {
        heading: "Special-Order & Imported Products",
        paragraphs: [
          "Special-order and imported products may have longer lead times. Estimated lead times will normally be communicated during quotation/order processing, but international transport and customs delays may affect them.",
        ],
      },
      {
        heading: "Dangerous Goods & Chemicals",
        paragraphs: [
          "Dangerous goods and chemicals may require approved carriers, specialised packaging, documentation and handling. Additional charges may apply and some products may not be eligible for standard courier services or certain destinations.",
        ],
      },
      {
        heading: "Temperature-Sensitive Products",
        paragraphs: [
          "Products requiring controlled-temperature transport may require specialised freight. Customers are responsible for ensuring suitable personnel and storage facilities are available upon delivery.",
        ],
      },
      {
        heading: "Receiving Your Delivery",
        paragraphs: [
          "Customers should ensure the delivery address is correct, appropriate personnel are available, specialised products can be received and stored appropriately, and delivered goods are inspected as soon as reasonably practicable.",
        ],
      },
      {
        heading: "Damaged, Missing or Incorrect Deliveries",
        paragraphs: [
          "Contact LabNova promptly if goods arrive damaged, incomplete or incorrect. Retain the products and original packaging where possible and provide the order/invoice number, affected product and quantity, photographs, batch/lot information where applicable, and a description of the issue.",
        ],
      },
    ],
    contact: {
      heading: "Delivery Enquiries",
      paragraphs: ["orders@labnova.com.au | labnova.com.au"],
    },
  },
  {
    slug: "returns",
    navLabel: "Returns & Refunds Policy",
    title: "Returns & Refunds Policy",
    effectiveDateLabel: "Effective Date: 2026.09.11",
    intro: [
      "Nothing in this policy excludes, restricts or modifies any right or remedy that cannot lawfully be excluded under the Australian Consumer Law.",
    ],
    sections: [
      {
        heading: "Before Returning a Product",
        paragraphs: [
          "Contact LabNova before returning any product. Products returned without prior authorisation may not be accepted. Please provide the quotation/order/invoice number, product name and catalogue number, quantity, reason for return, batch/lot number where applicable, and photographs where relevant.",
        ],
      },
      {
        heading: "Incorrect, Damaged or Defective Products",
        paragraphs: [
          "If you believe a product is incorrect, damaged or defective, contact LabNova promptly after becoming aware of the issue. We may request additional information or photographs. Depending on the circumstances and applicable legal rights, the remedy may include replacement, repair, refund or another agreed resolution.",
        ],
      },
      {
        heading: "Change-of-Mind Returns",
        paragraphs: [
          "LabNova may consider change-of-mind requests on a case-by-case basis. Where accepted, products would generally need to be unused, unopened, in original packaging, in resalable condition and returned according to LabNova instructions. Restocking, return freight or supplier charges may apply where permitted and communicated.",
        ],
      },
      {
        heading: "Products Generally Not Eligible for Change-of-Mind Return",
        paragraphs: [
          "Subject to applicable legal rights, change-of-mind returns may not be available for special-order items; products imported specifically for the Customer; customised/made-to-order products; opened or used products; chemicals/reagents; reference standards/materials; sterile products with opened/compromised packaging; temperature-sensitive goods; limited-shelf-life goods; controlled-storage products; or products whose storage/handling after delivery cannot reasonably be verified.",
        ],
      },
      {
        heading: "Special-Order Products",
        paragraphs: [
          "Where a product has been specifically sourced, imported, manufactured or customised, the order may become non-cancellable and non-returnable once LabNova has committed to the supplier. Material special-order conditions will be communicated where reasonably practicable before acceptance.",
        ],
      },
      {
        heading: "Return Shipping",
        paragraphs: [
          "Unless the return relates to an issue for which LabNova is responsible or applicable law provides otherwise, the Customer may be responsible for return freight and associated costs. Products must be appropriately packaged to prevent return-transit damage.",
        ],
      },
      {
        heading: "Refunds",
        paragraphs: [
          "Where a refund is approved, LabNova will process it using an appropriate payment method. Timing may depend on the original payment method, financial institution and circumstances. Approved refunds may exclude original freight or other costs where legally permissible and appropriate.",
        ],
      },
      {
        heading: "Manufacturer Warranty Claims",
        paragraphs: [
          "Some equipment and scientific products are covered by manufacturer warranties. LabNova will reasonably assist with legitimate warranty claims where applicable. Manufacturers may require troubleshooting, inspection, return of equipment or other information before determining a remedy.",
        ],
      },
      {
        heading: "Australian Consumer Law",
        paragraphs: [
          "Our products and services may come with guarantees that cannot be excluded under the Australian Consumer Law. Nothing in this policy removes or restricts those rights.",
        ],
      },
    ],
    contact: {
      heading: "Request a Return",
      paragraphs: [
        "orders@labnova.com.au | General enquiries: info@labnova.com.au | labnova.com.au",
      ],
    },
  },
];

export const getLegalDoc = (slug: string) =>
  legalDocs.find((d) => d.slug === slug);
