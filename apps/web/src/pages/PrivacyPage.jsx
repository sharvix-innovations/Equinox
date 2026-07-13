import LegalPage from '@/components/layout/LegalPage'
import { company } from '@/data/site'

const sections = [
  { h: 'Introduction', p: [`${company.name} ("we", "us") is committed to protecting the privacy of everyone who interacts with our website and services. This policy explains what data we collect, why, and how we handle it in line with the Indian IT Act, 2000 and applicable GDPR principles.`] },
  { h: 'Information We Collect', p: ['We collect information you provide directly  such as your name, email, phone, company and message when you submit an enquiry or register for an event.', 'We also collect limited technical data automatically, including IP address, browser type and pages visited, via cookies and analytics.'] },
  { h: 'How We Use Your Information', p: ['To respond to enquiries, deliver our services, send relevant updates you have opted into, and improve our website and offerings. We do not sell your personal data to third parties.'] },
  { h: 'Cookies', p: ['Our site uses essential and analytics cookies. You can control or disable cookies through your browser settings; some features may not function without them.'] },
  { h: 'Data Sharing & Disclosure', p: ['We may share data with trusted service providers who help us operate our website and services, under strict confidentiality. We may disclose information where required by law or regulatory authority.'] },
  { h: 'Data Security', p: ['We apply reasonable technical and organisational safeguards to protect your data against unauthorised access, alteration or disclosure.'] },
  { h: 'Your Rights', p: ['You may request access to, correction of, or deletion of your personal data, and withdraw consent for marketing communications at any time by contacting us.'] },
  { h: 'Contact Us', p: [`For any privacy questions or requests, email us at ${company.email} or write to ${company.address}.`] },
]

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated="July 2026"
      intro="Your privacy matters to us. This policy describes how we collect, use and protect your personal information."
      sections={sections}
    />
  )
}
