import LegalPage from '@/components/layout/LegalPage'
import { company } from '@/data/site'

const sections = [
  { h: 'Acceptance of Terms', p: [`By accessing or using the ${company.name} website, you agree to be bound by these Terms & Conditions. If you do not agree, please do not use the site.`] },
  { h: 'Use of the Website', p: ['You agree to use this website only for lawful purposes and in a manner that does not infringe the rights of, or restrict the use of, this site by any third party.'] },
  { h: 'Intellectual Property', p: ['All content on this website  including text, graphics, logos, and images  is the property of the company and protected by applicable intellectual property laws. You may not reproduce or redistribute it without written consent.'] },
  { h: 'Services & Enquiries', p: ['Information about services and products is provided for general guidance. Formal scope, deliverables and commercial terms are governed by a separate written agreement executed with the client.'] },
  { h: 'Limitation of Liability', p: ['The website and its content are provided "as is". We are not liable for any indirect or consequential loss arising from use of, or reliance on, the information provided.'] },
  { h: 'Third-Party Links', p: ['Our site may contain links to external websites. We are not responsible for the content or privacy practices of those sites.'] },
  { h: 'Governing Law', p: ['These terms are governed by the laws of India, and any disputes shall be subject to the exclusive jurisdiction of the courts of Pune, Maharashtra.'] },
  { h: 'Contact', p: [`For questions regarding these terms, contact us at ${company.email}.`] },
]

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms & Conditions"
      updated="July 2026"
      intro="Please read these terms carefully before using our website and services."
      sections={sections}
    />
  )
}
