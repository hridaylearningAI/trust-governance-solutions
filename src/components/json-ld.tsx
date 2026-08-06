import React from "react";

export function JsonLd() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Trust Governance Solutions",
    alternateName: "TGS",
    url: "https://www.tgsolutions.net",
    logo: "https://www.tgsolutions.net/logo.png",
    description:
      "TGS scans software vendor stacks, provides AI Governance & vCISO services, and issues buyer-ready compliance reports.",
    email: "hello@tgsolutions.net",
    sameAs: [
      "https://twitter.com/tgsolutions",
      "https://linkedin.com/company/trust-governance-solutions",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      email: "hello@tgsolutions.net",
      contactType: "customer service",
      availableLanguage: ["English"],
    },
  };

  const servicesSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: [
      {
        "@type": "Service",
        name: "Governance Services",
        url: "https://www.tgsolutions.net/services/governance",
        description: "Information Security Management System (ISMS) buildout, Risk Assessment Frameworks (NIST, ISO 27001), and Executive Board Reporting.",
        provider: { "@type": "Organization", name: "Trust Governance Solutions" },
      },
      {
        "@type": "Service",
        name: "AI Governance",
        url: "https://www.tgsolutions.net/services/ai-governance",
        description: "EU AI Act readiness, ISO/IEC 42001 certification, NIST AI RMF, LLM data privacy, and shadow AI detection.",
        provider: { "@type": "Organization", name: "Trust Governance Solutions" },
      },
      {
        "@type": "Service",
        name: "Audit Support & Defense",
        url: "https://www.tgsolutions.net/services/audit-support",
        description: "SOC 2 Type I/II & ISO 27001 external audit representation, auditor coordination, and zero-surprise audit defense.",
        provider: { "@type": "Organization", name: "Trust Governance Solutions" },
      },
      {
        "@type": "Service",
        name: "Security Operations & vCISO",
        url: "https://www.tgsolutions.net/services/security-operations",
        description: "Virtual CISO (vCISO) advisory, 24/7 SecOps monitoring, incident response playbooks, and vulnerability SLAs.",
        provider: { "@type": "Organization", name: "Trust Governance Solutions" },
      },
      {
        "@type": "Service",
        name: "Technical Security Assessments",
        url: "https://www.tgsolutions.net/services/technical-security-assessments",
        description: "Web application & API penetration testing, cloud infrastructure security audits, SAST/DAST code analysis, and IAM reviews.",
        provider: { "@type": "Organization", name: "Trust Governance Solutions" },
      },
    ],
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
      "AI Governance & EU AI Act Compliance",
      "Automated Cloud Stack Scanning (AWS, GCP, Azure)",
      "SOC 2 Type II & ISO 27001 Control Mapping",
      "Virtual CISO (vCISO) Security Leadership",
      "24/7 Continuous Drift Monitoring",
      "Single Reusable Buyer Attestation Report",
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What services does Trust Governance Solutions provide?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "TGS provides 5 core enterprise security services: Governance Services (ISMS & Risk Frameworks), AI Governance (EU AI Act & ISO 42001), Audit Support & Defense (SOC 2 & ISO representation), Security Operations (vCISO & 24/7 SecOps), and Technical Security Assessments (Penetration Testing & Cloud Audits).",
        },
      },
      {
        "@type": "Question",
        name: "How does TGS AI Governance help vendors comply with the EU AI Act?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "TGS AI Governance provides AI system risk tier classification, ISO/IEC 42001 certification guidance, NIST AI RMF mapping, LLM data privacy audits, and shadow AI detection across employee tools.",
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesSchema) }}
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
