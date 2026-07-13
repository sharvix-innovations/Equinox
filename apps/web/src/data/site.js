// ============================================================
// SINGLE SOURCE OF TRUTH for Equinox Environments site content.
// Edit here to update copy across all sections.
// ============================================================

import {
  ShieldCheck, FileText, Stamp, ClipboardCheck, Droplets, Waves,
  Factory, Recycle, Activity, Trees, Building2, FlaskConical,
  HardHat, Mountain, Sun, Landmark, Cpu, Home, TramFront,
  Users, BadgeCheck, Gauge, Headset, Workflow, Award, Map, HeartHandshake,
} from 'lucide-react'

export const company = {
  name: 'Equinox Environments India Pvt Ltd',
  shortName: 'Equinox Environments',
  since: 1997,
  tagline: 'Engineering a Cleaner Future for Generations',
  subtagline:
    "India's Leading Environmental Consultancy & Sustainability Solutions Partner Since 1997",
  phone: '+91 98765 43210',
  whatsapp: '919876543210',
  email: 'info@equinoxenvi.com',
  address: 'Equinox House, Hinjawadi Phase 2, Pune, Maharashtra 411057, India',
  mapEmbed:
    'https://www.openstreetmap.org/export/embed.html?bbox=73.72%2C18.57%2C73.76%2C18.61&layer=mapnik',
  social: {
    linkedin: '#',
    twitter: '#',
    youtube: '#',
    instagram: '#',
  },
}

// Page routes. Items with `children` render a dropdown; `base` marks the active path prefix.
export const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  {
    label: 'Team',
    base: '/team',
    children: [
      { label: 'Management', href: '/team/management' },
      { label: 'Team of Experts', href: '/team/experts' },
    ],
  },
  { label: 'Services', href: '/services' },
  { label: 'Products', href: '/products' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Events', href: '/events' },
  { label: 'Clients', href: '/clients' },
  { label: 'Contact', href: '/contact' },
]

export const heroStats = [
  { value: 25, suffix: '+', label: 'Years of Expertise' },
  { value: 500, suffix: '+', label: 'Projects Delivered' },
  { value: 100, suffix: '+', label: 'Industrial Clients' },
  { value: 50, suffix: '+', label: 'Lakes Revived' },
]

export const trustBadges = [
  { name: 'QCI–NABET', sub: 'Accredited EIA Consultant' },
  { name: 'ISO 9001:2015', sub: 'Quality Management' },
  { name: 'ISO 14001', sub: 'Environmental Mgmt' },
  { name: 'NABL', sub: 'Accredited Laboratory' },
  { name: 'MPCB', sub: 'Recognised Consultant' },
  { name: 'MoEFCC', sub: 'Compliant Filings' },
  { name: 'Govt. of India', sub: 'Recognised' },
]

export const aboutCards = [
  { icon: Award, value: 25, suffix: '+', label: 'Years Experience', desc: 'Trusted since 1997' },
  { icon: Workflow, value: 500, suffix: '+', label: 'Projects', desc: 'Across 18 states' },
  { icon: Users, value: 60, suffix: '+', label: 'Environmental Experts', desc: 'Multidisciplinary team' },
  { icon: Landmark, value: 12, suffix: '', label: 'Pan-India Offices', desc: 'On-ground presence' },
]

export const services = [
  {
    icon: ShieldCheck,
    title: 'Environmental Clearance',
    short: 'End-to-end EC under EIA Notification 2006.',
    long: 'Complete handling of Environmental Clearance applications  pre-feasibility, ToR, public hearing support and EAC presentations until grant of EC.',
    color: 'from-brand-blue to-brand-sky',
  },
  {
    icon: FileText,
    title: 'EIA Reports',
    short: 'Rigorous, defensible impact assessments.',
    long: 'Comprehensive Environmental Impact Assessment & Environmental Management Plans backed by NABL-accredited baseline monitoring data.',
    color: 'from-brand-sky to-brand-green',
  },
  {
    icon: Stamp,
    title: 'Consent To Establish',
    short: 'CTE filings under Water & Air Acts.',
    long: 'Preparation and liaison for Consent to Establish (NOC) with State Pollution Control Boards for greenfield and expansion projects.',
    color: 'from-brand-blue to-brand-green',
  },
  {
    icon: ClipboardCheck,
    title: 'Consent To Operate',
    short: 'CTO grant & renewals, hassle-free.',
    long: 'Consent to Operate documentation, renewals and amendment support ensuring uninterrupted, compliant operations.',
    color: 'from-brand-sky to-brand-blue',
  },
  {
    icon: Droplets,
    title: 'ETP Solutions',
    short: 'Effluent treatment, designed & delivered.',
    long: 'Design, build and optimisation of Effluent Treatment Plants  from process selection to commissioning and O&M support.',
    color: 'from-brand-blue to-brand-sky',
  },
  {
    icon: Waves,
    title: 'STP Solutions',
    short: 'Sewage treatment for any scale.',
    long: 'Sewage Treatment Plant engineering for industries, townships and commercial complexes with reuse & ZLD options.',
    color: 'from-brand-sky to-brand-green',
  },
  {
    icon: Recycle,
    title: 'Waste Management',
    short: 'Hazardous & solid waste, end-to-end.',
    long: 'Authorisation, characterisation and management plans for hazardous, biomedical, plastic and solid waste streams.',
    color: 'from-brand-green to-brand-blue',
  },
]

// Full categorised service capabilities (home + services page).
export const serviceGroups = [
  {
    icon: ShieldCheck,
    tab: 'Clearances',
    title: 'Statutory Clearances & Compliance',
    desc: 'We secure and maintain every statutory approval your project needs  from consents and clearances to ongoing compliance reporting.',
    img: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1000&q=80',
    items: [
      'SPCB Consents  Consent to Establish / Operate',
      'Environmental Clearance (EC)',
      'Post-EC Compliance',
      'Consent Condition Compliance Report (CCCR)',
      'Six-Monthly EC Conditions Compliance',
      'Environmental Statement (Form V)',
      'Wildlife Clearance from SBWL / NBWL',
      'Groundwater Abstraction Clearance  CGWB & CGWA',
    ],
  },
  {
    icon: ClipboardCheck,
    tab: 'Studies & Audits',
    title: 'Studies, Assessments & Audits',
    desc: 'Rigorous, defensible studies and audits that quantify impact, manage risk and keep your operations audit-ready.',
    img: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1000&q=80',
    items: [
      'Environmental Impact Assessment (EIA) Study & Reports',
      'Environmental Audit',
      'Life Cycle Assessment (LCA)  Carbon & Water Footprints',
      'GHG Emissions Potential & Mitigation',
      'Risk Assessment (RA), HIRA & HAZOP',
      'Onsite & Offsite Emergency Preparedness Plans',
      'EMP, DMP & Traffic Management Plan (TMP)',
      'Water Audit & Budgeting',
      'Safety Audit',
      'Treatment Adequacy  ETP, STP, CPU, WTP & APC',
    ],
  },
  {
    icon: Activity,
    tab: 'Monitoring',
    title: 'Monitoring & Reporting',
    desc: 'Continuous, accredited monitoring and automated regulatory reporting across air, water, noise, soil and waste.',
    img: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=1000&q=80',
    items: [
      'Environmental Monitoring  AAQM, WAQM, Stack, Noise, Effluent, Water, Soil, SW, HW & more',
      'Online Continuous Monitoring System (OCEMS)',
      'SCADA System',
      'Hazardous Waste Annual Returns (Form IV)',
      'Extended Producer Responsibility (EPR  Plastic)',
    ],
  },
  {
    icon: Map,
    tab: 'Studies & Mapping',
    title: 'Specialized Studies & Mapping',
    desc: 'Advanced modelling, mapping and siting studies powered by GIS, satellite imagery and field surveys.',
    img: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1000&q=80',
    items: [
      'Software Modelling  GLC, RA, Noise, LCA, Aquifer & Groundwater Flow, Green-Belt Canopy',
      'Groundwater Detection & Availability  Resistivity Surveys',
      'Project Siting & Environmental Sensitivity  WLS, CPAs, Forests, Heritage',
      'Industrial Area Fixation via Satellite Imagery, LU/LC & Govt. Maps',
    ],
  },
  {
    icon: HeartHandshake,
    tab: 'CER & CSR',
    title: 'Corporate Responsibility',
    desc: 'Structuring and delivering your CER and CSR commitments for measurable environmental and social impact.',
    img: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1000&q=80',
    items: [
      'Corporate Environmental Responsibility (CER)',
      'Corporate Social Responsibility (CSR)',
    ],
  },
]

export const industries = [
  { icon: Factory, name: 'Manufacturing' },
  { icon: FlaskConical, name: 'Chemical' },
  { icon: TramFront, name: 'Infrastructure' },
  { icon: HardHat, name: 'Construction' },
  { icon: Mountain, name: 'Mining' },
  { icon: Sun, name: 'Renewable Energy' },
  { icon: Landmark, name: 'Government' },
  { icon: Building2, name: 'Industrial Parks' },
  { icon: Cpu, name: 'Smart Cities' },
  { icon: Home, name: 'Real Estate' },
]

export const lakeMetrics = [
  { value: 72, suffix: '%', label: 'Water Quality Improved' },
  { value: 340, suffix: ' acres', label: 'Area Restored' },
  { value: 1.2, suffix: 'M+', label: 'Communities Benefited', decimals: 1 },
]

export const impactNumbers = [
  { value: 25, suffix: '+', label: 'Years of Excellence' },
  { value: 500, suffix: '+', label: 'Projects Delivered' },
  { value: 100, suffix: '+', label: 'Clients Served' },
  { value: 1000, suffix: '+', label: 'Environmental Reports' },
  { value: 50, suffix: '+', label: 'Lake Conservation Projects' },
]

export const whyChoose = [
  { icon: Users, title: 'Experienced Team', desc: '60+ specialists across ecology, engineering & regulatory affairs.' },
  { icon: BadgeCheck, title: 'Government Approved', desc: 'QCI-NABET, NABL, MPCB & MoEFCC recognitions you can rely on.' },
  { icon: Cpu, title: 'Advanced Technology', desc: 'GIS, drone surveys, IoT monitoring and predictive analytics.' },
  { icon: Gauge, title: 'Fast Compliance', desc: 'Streamlined filings that cut approval timelines significantly.' },
  { icon: Headset, title: 'Dedicated Support', desc: 'A single accountable project lead from kickoff to closure.' },
  { icon: Workflow, title: 'End-to-End Consultancy', desc: 'From feasibility to monitoring  one partner for everything.' },
]

export const team = [
  {
    name: 'Dr. Arvind Menon',
    role: 'Founder & Principal Consultant',
    qual: 'Ph.D. Environmental Engineering',
    exp: '30+ yrs',
    spec: 'EIA & Policy',
    initials: 'AM',
  },
  {
    name: 'Sunita Rao',
    role: 'Director  Compliance',
    qual: 'M.Sc. Environmental Science',
    exp: '22+ yrs',
    spec: 'Regulatory Affairs',
    initials: 'SR',
  },
  {
    name: 'Karthik Iyer',
    role: 'Head  Water Engineering',
    qual: 'M.Tech. Civil (Water Resources)',
    exp: '18+ yrs',
    spec: 'ETP / STP / ZLD',
    initials: 'KI',
  },
  {
    name: 'Dr. Neha Kulkarni',
    role: 'Lead  Ecology & Restoration',
    qual: 'Ph.D. Aquatic Ecology',
    exp: '15+ yrs',
    spec: 'Lake Revival',
    initials: 'NK',
  },
]

export const processSteps = [
  { n: '01', title: 'Consultation', desc: 'Understand goals, scope & regulatory triggers.' },
  { n: '02', title: 'Site Assessment', desc: 'On-ground survey, sampling & baseline study.' },
  { n: '03', title: 'Analysis', desc: 'NABL lab testing, modelling & impact prediction.' },
  { n: '04', title: 'Compliance Planning', desc: 'Strategy mapped to MoEFCC / SPCB requirements.' },
  { n: '05', title: 'Documentation', desc: 'EIA, EMP & application drafting to standard.' },
  { n: '06', title: 'Approval', desc: 'Liaison, hearings & clearance follow-through.' },
  { n: '07', title: 'Monitoring', desc: 'Post-clearance monitoring & periodic reporting.' },
]

export const testimonials = [
  {
    quote:
      'Equinox secured our Environmental Clearance months ahead of schedule. Their command over the EIA process is simply unmatched in the industry.',
    name: 'Rajesh Pillai',
    title: 'VP Operations, Vanguard Cements',
    rating: 5,
    initials: 'RP',
  },
  {
    quote:
      'The lake revival project they delivered transformed our township. Water quality, biodiversity and community pride have all returned.',
    name: 'Meera Joshi',
    title: 'Sustainability Head, Aralia Estates',
    rating: 5,
    initials: 'MJ',
  },
  {
    quote:
      'From CTE to CTO and ongoing compliance, Equinox is the only partner we trust. Their audit-readiness gives our board real confidence.',
    name: 'Imran Sheikh',
    title: 'Plant Director, Helix Chemicals',
    rating: 5,
    initials: 'IS',
  },
  {
    quote:
      'Their NABL lab data and reporting dashboards are best-in-class. Monitoring that used to be a headache is now effortless.',
    name: 'Anita Desai',
    title: 'EHS Manager, Northstar Infra',
    rating: 5,
    initials: 'AD',
  },
]

export const blogPosts = [
  {
    category: 'Compliance',
    title: 'EIA Notification 2024: What Project Proponents Must Know',
    excerpt: 'A practical breakdown of the latest amendments and how they reshape clearance timelines.',
    read: '6 min read',
    date: 'May 2026',
  },
  {
    category: 'Water Management',
    title: 'Zero Liquid Discharge: Is ZLD Right for Your Plant?',
    excerpt: 'Weighing the CAPEX, recovery economics and compliance upside of going full ZLD.',
    read: '8 min read',
    date: 'Apr 2026',
  },
  {
    category: 'Sustainability',
    title: 'Designing Wetlands That Actually Clean Urban Lakes',
    excerpt: 'Lessons from 50+ revival projects on building self-sustaining treatment wetlands.',
    read: '5 min read',
    date: 'Apr 2026',
  },
  {
    category: 'Pollution Control',
    title: 'Continuous Emission Monitoring: Beyond the Mandate',
    excerpt: 'How CEMS data, used well, becomes an operational efficiency tool  not just a checkbox.',
    read: '7 min read',
    date: 'Mar 2026',
  },
  {
    category: 'Environment',
    title: 'Biodiversity Offsets in Indian Infrastructure',
    excerpt: 'Turning regulatory obligation into measurable ecological and reputational value.',
    read: '6 min read',
    date: 'Mar 2026',
  },
]

export const blogCategories = [
  'All', 'Environment', 'Sustainability', 'Pollution Control', 'Compliance', 'Water Management',
]

export const partners = [
  'Vanguard Cements',
  'Aralia Estates',
  'Helix Chemicals',
  'Northstar Infra',
  'GreenGrid Energy',
  'HydroTech',
  'EcoSphere',
  'Metro Infra',
]

export const footerColumns = [
  {
    title: 'Services',
    links: ['Environmental Clearance', 'EIA Reports', 'ETP / STP Solutions', 'Lake Revival', 'Environmental Monitoring', 'Industrial Compliance'],
  },
  {
    title: 'Industries',
    links: ['Manufacturing', 'Chemical', 'Infrastructure', 'Mining', 'Renewable Energy', 'Smart Cities'],
  },
  {
    title: 'Resources',
    links: ['Insights & Blog', 'Case Studies', 'Downloadable Reports', 'Resource Center', 'Carbon Calculator', 'FAQs'],
  },
  {
    title: 'Company',
    links: ['About Us', 'Our Team', 'Certifications', 'Careers', 'Contact', 'Privacy Policy'],
  },
]
