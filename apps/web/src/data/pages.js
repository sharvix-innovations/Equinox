// ============================================================
// Content for the inner pages (products, team, gallery, events, clients…).
// ============================================================
import {
  Gauge, Wind, Droplets, Waves, FlaskConical, Activity, Recycle, Cpu, Volume2,
  Building2, Award, Users, Target, Trophy, Leaf,
} from 'lucide-react'

// Known-good imagery reused across pages.
export const IMG = {
  turbines: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=900&q=80',
  forest: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=900&q=80',
  solar: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=900&q=80',
  office: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=900&q=80',
  experts: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=900&q=80',
  lake: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=900&q=80',
  water: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=900&q=80',
  river: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&w=900&q=80',
}

const portraits = [
  'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&crop=faces&w=600&q=80',
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&crop=faces&w=600&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&crop=faces&w=600&q=80',
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&crop=faces&w=600&q=80',
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&crop=faces&w=600&q=80',
  'https://images.unsplash.com/photo-1600486913747-55e5470d6f40?auto=format&fit=crop&crop=faces&w=600&q=80',
  'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?auto=format&fit=crop&crop=faces&w=600&q=80',
  'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&crop=faces&w=600&q=80',
]

export const slugify = (s) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

// ── Mission / Vision / Values ─────────────────────────────────────────────
export const coreValues = [
  { icon: Target, title: 'Our Mission', desc: 'To make environmental compliance effortless for Indian industry  turning complex regulation into a clear, science-led path to sustainable growth.' },
  { icon: Leaf, title: 'Our Vision', desc: 'A cleaner, healthier India where every project advances with responsibility, and business success and ecological balance go hand in hand.' },
  { icon: Award, title: 'Our Values', desc: 'Integrity in every filing, rigour in every report, and an unwavering commitment to the communities and ecosystems our work protects.' },
]

// ── Certifications & accreditations ───────────────────────────────────────
export const certifications = [
  { name: 'QCI–NABET', sub: 'Accredited EIA Consultant' },
  { name: 'ISO 9001:2015', sub: 'Quality Management' },
  { name: 'ISO 14001', sub: 'Environmental Management' },
  { name: 'NABL', sub: 'Accredited Laboratory' },
  { name: 'MPCB', sub: 'Recognised Consultant' },
  { name: 'MoEFCC', sub: 'Compliant Filings' },
]

// ── Company milestones / timeline ─────────────────────────────────────────
export const milestones = [
  { year: '1997', img: IMG.solar, title: 'Where it all began', desc: 'Equinox Environments founded in Pune with a mission to make environmental compliance accessible to Indian industry.' },
  { year: '2005', img: IMG.experts, title: 'First landmark clearances', desc: 'Secured major Environmental Clearances across Maharashtra, establishing a reputation for rigour and reliability.' },
  { year: '2015', img: IMG.water, title: 'Pan-India expansion', desc: 'Grew to 12 offices across 18 states and commissioned an in-house NABL-accredited laboratory.' },
  { year: '2024', img: IMG.lake, title: 'A greener legacy', desc: '500+ projects delivered, 50+ lakes revived, and a team of 60+ environmental experts serving all of India.' },
]

// ── Management / leadership ───────────────────────────────────────────────
export const management = [
  {
    name: 'Dr. Sangram P. Ghugare',
    role: 'Chairman',
    photo: '/team/sangram-ghugare.jpg',
    photoFallback: portraits[0],
    exp: '35+ years',
    expLabel: 'Environmental & Civil Engineering',
    credentials: [
      'Ph.D.', 'M.E. (Env. by Research)', 'B.E. (Env.)', 'AMIE (India)',
      'MISWA (Austria)', 'MIWA (UK)', 'Chartered Engineer', 'Research Fellow', 'Patentee',
    ],
    eiaRole: 'EIA Co-ordinator  Thermal Power Plants, Metallurgical Industries, Synthetic Organic Chemicals Industry, Distilleries & Sugar Industries',
    faExpert: 'Functional Area Expert (AP, WP, SHW)',
    bio: '35+ years of all-round experience in Environmental and Civil Engineering consultation services, and in civil construction & erection activities (cast in situ, prefabricated & pre-stressed). Patents awarded for doctoral research findings.',
    research: {
      intro: 'Worked on four research projects funded by MoEF, MNES and MEDA involving:',
      items: [
        'Innovative wastewater treatment techniques (ATS)',
        'Conservation of resources',
        'Non-conventional energy recovery & utilization',
        'Processing of pressmud, night soil, vegetable, poultry & slaughterhouse wastes',
        'Environmental value addition through by-product processing for clean fuel generation',
        'Rural sanitation and hygiene initiatives',
      ],
    },
    highlightsLabel: 'Key Contributions',
    highlights: [
      'Preparation & implementation of DPRs for Lake Conservation Projects worth ₹450 Crore',
      'Environmental Impact Assessment (EIA) studies and report preparation',
      'Obtaining Environmental Clearances',
      'Services related to Pollution Control and Environmental Management',
    ],
  },
  {
    name: 'Sulakshna Ayarekar',
    role: 'Managing Director',
    photo: '/team/sulakshna-ayarekar.jpg',
    photoFallback: portraits[1],
    exp: '21+ years',
    expLabel: 'EIA & Environmental Management',
    credentials: [
      'M.Sc. (Env. Sc.)', 'B.Sc. (Micro.)', 'PGDEM', 'ISO 14000/14001 (LA)', 'PGDIWWT',
    ],
    eiaRole: 'EIA Co-ordinator  Asbestos Milling & Asbestos-Based Products, Synthetic Organic Chemicals Industry, Sugar Industry & Distilleries',
    faExpert: 'Functional Area Expert (EB)',
    bio: '21+ years of experience across EIA studies and report preparation, environmental clearance assignments, environmental management and pollution control, environmental monitoring and measurement, and industry- and project-specific technical and legal advice.',
    highlightsLabel: 'Expertise Includes',
    highlights: [
      'Coordination, steering & expert consultation to Project Proponents and Industry Management teams',
      'Participation in high-level meetings, discussions and interactions with Central & State Government authorities',
      'Liaison with officials from MoEFCC, CPCB, DoE, SPCB, MoWR, CGWA, CGWB, NBWL & SBWL',
      'Representation of industries & projects during meetings of EAC, SEAC and SEIAA',
    ],
  },
]

// ── Team of experts ───────────────────────────────────────────────────────
export const expertDepartments = ['All', 'Technical Directors', 'Empaneled Experts']

export const experts = [
  {
    name: 'Prof. (Dr.) Jay S. Samant', role: 'Technical Director', dept: 'Technical Directors',
    qual: 'Ph.D. Zoology (Ecology), M.Sc. Zoology (Marine Biology), B.Sc. (Hons.) Zoology',
    fa: 'EB', exp: '50 Years',
    desc: 'All-round experience in Research, Administration and Teaching (PG & Ph.D.). Guide for 38 research scholars.',
  },
  {
    name: 'Dr. Anuradha J. Samant', role: 'Technical Director', dept: 'Technical Directors',
    qual: 'Ph.D. (Sociology), M.A. (Sociology), B.A.',
    fa: 'SE', exp: '40 Years',
    desc: 'Experience in Research and Teaching (PG & Ph.D.). Guide for 20 research scholars.',
  },
  {
    name: 'Dr. Jaysingh B. Ghugare', role: 'Technical Director', dept: 'Technical Directors',
    qual: 'Ph.D. (Horticulture), M.Sc., B.Sc. (Agri.)',
    exp: '45 Years',
    desc: 'Research, Teaching and Administration. Ex-Director, Horticulture Department, Govt. of Maharashtra. Expertise in soil science.',
  },
  {
    name: 'Dr. Jotiram B. Pishte', role: 'Empaneled Expert', dept: 'Empaneled Experts',
    qual: 'Ph.D., M.Sc., B.Sc. (Geology)',
    fa: 'HG, GEO', exp: '40 Years',
    desc: 'Research, Teaching and Administration. Principal, Gopal Krishna Gokhale College, Kolhapur.',
  },
  {
    name: 'Dr. Rahul Deshmukh', role: 'Empaneled Expert', dept: 'Empaneled Experts',
    qual: 'Ph.D. (Social Work)',
    fa: 'SE', exp: '14 Years',
    desc: 'Experience in socio-economic studies.',
  },
  {
    name: 'Dr. Bhaskar Thorat', role: 'Empaneled Expert', dept: 'Empaneled Experts',
    qual: 'Ph.D. (Tech.)',
    eia: 'Pesticides Industry, Petro-chemical Complexes, Petrochemical-based Processing, Synthetic Organic Chemicals Industry, Distilleries',
    fa: 'HW, WP, RH', exp: '30 Years',
    desc: 'Teaching & Research (Chemical Engineering) with special expertise in Drying Technologies.',
  },
  {
    name: 'Dr. Ratnakumar Mudliar', role: 'Empaneled Expert', dept: 'Empaneled Experts',
    qual: 'Ph.D. (Environmental Science)',
    eia: 'Oil & Gas Exploration, CHWTSDF, CMSWMF, Townships & Area Development Projects',
    fa: 'SC, SHW, WP', exp: '12 Years',
    desc: 'Environmental expert across Oil & Gas, Hazardous Waste Landfill Management, Infrastructure & Housing and Fuel Retail Stations.',
  },
  {
    name: 'Dr. A. R. Kulkarni', role: 'Empaneled Expert', dept: 'Empaneled Experts',
    qual: 'Ph.D. (Environmental Science)',
    eia: 'Mining of Minerals',
    fa: 'HG, GEO, SC', exp: '30 Years',
    desc: 'Teaching and environmental expertise in the Mining sector.',
  },
  {
    name: 'Mr. Vinaykumar Kurakula', role: 'Empaneled Expert', dept: 'Empaneled Experts',
    qual: 'M.Sc. (GIS), PGDIPPC, B.E. (Civil)',
    eia: 'TSDFs, CMSWMF',
    fa: 'LU, NV, SHW', exp: '8 Years',
    desc: 'EIA, 3D noise mapping & modelling, land-use mapping, remote-sensing processing, GIS mapping and ground vibration.',
  },
  {
    name: 'Mr. Vinod Sahasrabuddhe', role: 'Empaneled Expert', dept: 'Empaneled Experts',
    qual: 'M.E. (Chem.), B.Tech.',
    fa: 'RH', exp: '41 Years',
    desc: 'Risk assessment & hazard management. Team member of the Vardharajan Committee set up by Govt. of India to investigate the MIC gas-leak tragedy at UCIL, Bhopal.',
  },
  {
    name: 'Mr. Vivek P. Navare', role: 'Empaneled Expert', dept: 'Empaneled Experts',
    qual: 'AMIE (Civil), B.Tech (Mining), DSM',
    eia: 'Mining of Minerals',
    fa: 'NV', exp: '36 Years',
    desc: 'Mining sector expertise across both opencast and underground mining.',
  },
  {
    name: 'Mr. Balkrishna S. Lole', role: 'Empaneled Expert', dept: 'Empaneled Experts',
    qual: 'M.Sc. (Agri.)',
    fa: 'SC', exp: '46 Years',
    desc: 'Research, Teaching and Consultancy in Soil Survey and Conservation. Ex-Scientist FC (Rtd), SAC-ISRO Ahmedabad, in RS & GIS applications for land use, soil & EIA.',
  },
]

// ── Products ──────────────────────────────────────────────────────────────
export const productCategories = ['All', 'Monitoring', 'Treatment', 'Testing', 'Software']

const rawProducts = [
  { name: 'Continuous Emission Monitoring System', icon: Gauge, category: 'Monitoring', image: IMG.turbines, short: 'Real-time stack emission monitoring compliant with CPCB norms.', desc: 'A CPCB-approved Continuous Emission Monitoring System (CEMS) for real-time measurement of SOx, NOx, CO, particulate matter and flow, with automatic data transfer to regulatory servers.' },
  { name: 'Ambient Air Quality Station', icon: Wind, category: 'Monitoring', image: IMG.solar, short: 'Fixed & mobile ambient air quality monitoring stations.', desc: 'Modular ambient air quality monitoring stations measuring PM2.5, PM10, gases and meteorological parameters, with cloud dashboards and automated reporting.' },
  { name: 'Effluent Treatment Plant', icon: Droplets, category: 'Treatment', image: IMG.water, short: 'Custom ETP design, build & commissioning.', desc: 'End-to-end Effluent Treatment Plants engineered to your effluent profile  from primary treatment to tertiary polishing, with O&M support and reuse options.' },
  { name: 'Sewage Treatment Plant', icon: Waves, category: 'Treatment', image: IMG.lake, short: 'STP systems for townships, industries & complexes.', desc: 'Compact and conventional Sewage Treatment Plants with MBBR/SBR/MBR technology, delivering reuse-grade water for landscaping and flushing.' },
  { name: 'Water Quality Analyzer', icon: FlaskConical, category: 'Testing', image: IMG.river, short: 'Lab & online water quality analysis.', desc: 'NABL-grade water quality analysis covering physico-chemical, heavy metal and microbiological parameters, with online multi-parameter probes.' },
  { name: 'Online Effluent Monitoring', icon: Activity, category: 'Monitoring', image: IMG.forest, short: 'Continuous effluent quality telemetry.', desc: 'Online Continuous Effluent Monitoring Systems (OCEMS) measuring pH, TSS, COD, BOD and flow with real-time CPCB/SPCB data connectivity.' },
  { name: 'Zero Liquid Discharge System', icon: Recycle, category: 'Treatment', image: IMG.experts, short: 'ZLD for full water recovery.', desc: 'Zero Liquid Discharge systems combining RO, evaporation and crystallisation to recover virtually all water and eliminate liquid discharge.' },
  { name: 'EnviroCompliance Dashboard', icon: Cpu, category: 'Software', image: IMG.office, short: 'Compliance tracking & reporting software.', desc: 'A cloud platform that centralises consents, monitoring data, filings and deadlines  with alerts, audit trails and one-click regulatory reports.' },
  { name: 'Noise Level Monitor', icon: Volume2, category: 'Monitoring', image: IMG.turbines, short: 'Ambient & workplace noise monitoring.', desc: 'Continuous ambient and occupational noise monitoring stations with logging, mapping and exceedance alerts per CPCB noise rules.' },
]

export const products = rawProducts.map((p) => ({
  ...p,
  slug: slugify(p.name),
  specs: [
    { label: 'Category', value: p.category },
    { label: 'Compliance', value: 'CPCB / MoEFCC / SPCB' },
    { label: 'Deployment', value: p.category === 'Software' ? 'Cloud / On-prem' : 'On-site' },
    { label: 'Support', value: '24/7 O&M & AMC' },
    { label: 'Warranty', value: '1–3 years' },
  ],
  features: [
    'Regulator-ready data & reporting',
    'Designed to your site & load profile',
    'Commissioning + operator training',
    'Annual maintenance & calibration',
  ],
}))

// ── Gallery ───────────────────────────────────────────────────────────────
export const galleryCategories = ['All', 'Our Office', 'Events', 'Projects', 'Achievements']

export const gallery = [
  { src: IMG.office, cat: 'Our Office', caption: 'Equinox HQ  Hinjawadi, Pune' },
  { src: IMG.experts, cat: 'Our Office', caption: 'Our laboratory & research team' },
  { src: IMG.lake, cat: 'Projects', caption: 'Bellandur Lake revival, Bengaluru' },
  { src: IMG.water, cat: 'Projects', caption: 'Powai Lake wetland creation' },
  { src: IMG.river, cat: 'Projects', caption: 'Ulsoor Lake bioremediation' },
  { src: IMG.turbines, cat: 'Projects', caption: 'Renewable energy EIA, Rajasthan' },
  { src: IMG.solar, cat: 'Achievements', caption: 'Solar park clearance milestone' },
  { src: IMG.forest, cat: 'Achievements', caption: 'Green India recognition' },
  { src: IMG.office, cat: 'Events', caption: 'World Environment Day 2025' },
  { src: IMG.experts, cat: 'Events', caption: 'Compliance workshop, Mumbai' },
  { src: IMG.water, cat: 'Events', caption: 'Lake revival community drive' },
  { src: IMG.forest, cat: 'Our Office', caption: 'Field survey team on site' },
]

// ── Events ────────────────────────────────────────────────────────────────
export const events = [
  { slug: 'eia-notification-2026-briefing', title: 'EIA Notification 2026: What Project Proponents Must Know', img: IMG.forest, date: '18 Jul 2026', time: '10:00 AM – 1:00 PM', location: 'Equinox HQ, Pune', joined: 236, upcoming: true, desc: 'A practical briefing on the latest EIA amendments and how they reshape clearance timelines for industry.' },
  { slug: 'zld-masterclass', title: 'Zero Liquid Discharge Masterclass', img: IMG.water, date: '02 Aug 2026', time: '11:00 AM – 4:00 PM', location: 'Hotel Sahara Star, Mumbai', joined: 162, upcoming: true, desc: 'A hands-on masterclass on ZLD economics, technology selection and compliance for plant heads.' },
  { slug: 'lake-revival-community-drive', title: 'Lake Revival Community Drive', img: IMG.lake, date: '20 Sep 2026', time: '7:00 AM – 12:00 PM', location: 'Ulsoor Lake, Bengaluru', joined: 410, upcoming: true, desc: 'Join our ecologists and volunteers for a community-led lake clean-up and biodiversity survey.' },
  { slug: 'world-environment-day-2025', title: 'World Environment Day Summit 2025', img: IMG.solar, date: '05 Jun 2025', time: 'Full day', location: 'Pune International Centre', joined: 520, upcoming: false, desc: 'Our flagship summit bringing together industry, regulators and academia around sustainable growth.' },
  { slug: 'cems-compliance-workshop', title: 'CEMS & Online Monitoring Workshop', img: IMG.turbines, date: '14 Mar 2025', time: '10:00 AM – 3:00 PM', location: 'Ahmedabad', joined: 180, upcoming: false, desc: 'A technical workshop on continuous emission monitoring, data integrity and regulatory reporting.' },
]

// ── Clients ───────────────────────────────────────────────────────────────
export const clientSectors = ['All', 'Manufacturing', 'Chemical', 'Infrastructure', 'Real Estate', 'Energy', 'Government']

export const clients = [
  { name: 'Vanguard Cements', sector: 'Manufacturing' },
  { name: 'Helix Chemicals', sector: 'Chemical' },
  { name: 'Northstar Infra', sector: 'Infrastructure' },
  { name: 'Aralia Estates', sector: 'Real Estate' },
  { name: 'GreenGrid Energy', sector: 'Energy' },
  { name: 'Metro Infra', sector: 'Infrastructure' },
  { name: 'HydroTech', sector: 'Energy' },
  { name: 'EcoSphere', sector: 'Manufacturing' },
  { name: 'Solaris Power', sector: 'Energy' },
  { name: 'TerraBuild', sector: 'Real Estate' },
  { name: 'Pune Municipal Corp.', sector: 'Government' },
  { name: 'Nova Chemicals', sector: 'Chemical' },
]

export const iconMap = { Building2, Users, Trophy, Award }
