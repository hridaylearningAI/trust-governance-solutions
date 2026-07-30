import React from "react";

export function JsonLd() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Trust Governance Solutions",
    alternateName: "TGS",
    url: "https://www.trustgovernance.co",
    logo: "https://www.trustgovernance.co/logo.png",
    description:
      "TGS scans software vendor stacks, fixes compliance gaps, and issues buyer-ready compliance reports with continuous 24/7 monitoring.",
    email: "hello@trustgovernance.co",
    sameAs: [
      "https://twitter.com/trustgovernance",
      "https://linkedin.com/company/trust-governance-solutions",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      email: "hello@trustgovernance.co",
      contactType: "customer service",
      availableLanguage: ["English"],
    },
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Trust Governance Solutions Platform",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0.00",
      priceCurrency: "USD",
      description: "Free 15-Minute Compliance Gap Check",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "142",
    },
    featureList: [
      "Automated Cloud Stack Scanning (AWS, GCP, Azure)",
      "SOC 2 Type II & ISO 27001 Control Mapping",
      "24/7 Continuous Drift Monitoring",
      "Single Reusable Buyer Attestation Report",
      "85% Engineering Time Reduction",
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How does TGS differ from DIY compliance tools like Vanta or Drata?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Software-only platforms sell software subscriptions where your engineering team still has to manage 100s of controls and handle audits yourself. TGS provides managed gap remediation and issues a single, continuously-monitored buyer-ready attestation report that buyers accept as-is.",
        },
      },
      {
        "@type": "Question",
        name: "How fast can software vendors get a buyer-ready compliance report?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The standard TGS remediation and attestation process takes approximately 3 weeks (21 days) from initial stack scan to final report issuance.",
        },
      },
      {
        "@type": "Question",
        name: "Will enterprise buyers accept the TGS compliance report instead of 300-question spreadsheets?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes! The TGS report is digitally attested, backed by verified product evidence logs, and mapped to SOC 2, ISO 27001, and GDPR standards. Enterprise buyers accept it as-is.",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}
