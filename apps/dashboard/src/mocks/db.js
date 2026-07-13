/**
 * ============================================================
 * In-memory seed database for the Equinox admin dashboard.
 *
 * This stands in for a real backend. The service layer
 * (src/services/*) reads and mutates a working copy of this
 * seed, simulating network latency  so swapping in a real API
 * later means only rewriting src/services/apiClient.js.
 * ============================================================
 */

// ── Content: Products ───────────────────────────────────────────────────────
export const products = [
  { id: 'prd_ceMS', name: 'Continuous Emission Monitoring System', category: 'Monitoring', price: 1250000, status: 'published', stock: 12, short: 'Real-time stack emission monitoring compliant with CPCB norms.', featured: true },
  { id: 'prd_aaqs', name: 'Ambient Air Quality Station', category: 'Monitoring', price: 890000, status: 'published', stock: 8, short: 'Fixed & mobile ambient air quality monitoring stations.', featured: false },
  { id: 'prd_etp', name: 'Effluent Treatment Plant', category: 'Treatment', price: 4500000, status: 'published', stock: 3, short: 'Custom ETP design, build & commissioning.', featured: true },
  { id: 'prd_stp', name: 'Sewage Treatment Plant', category: 'Treatment', price: 3800000, status: 'published', stock: 5, short: 'STP systems for townships, industries & complexes.', featured: false },
  { id: 'prd_wqa', name: 'Water Quality Analyzer', category: 'Testing', price: 320000, status: 'published', stock: 21, short: 'Lab & online water quality analysis.', featured: false },
  { id: 'prd_oem', name: 'Online Effluent Monitoring', category: 'Monitoring', price: 760000, status: 'draft', stock: 0, short: 'Continuous effluent quality telemetry.', featured: false },
  { id: 'prd_zld', name: 'Zero Liquid Discharge System', category: 'Treatment', price: 9800000, status: 'published', stock: 2, short: 'ZLD for full water recovery.', featured: true },
  { id: 'prd_dash', name: 'EnviroCompliance Dashboard', category: 'Software', price: 240000, status: 'published', stock: 999, short: 'Compliance tracking & reporting software.', featured: false },
  { id: 'prd_noise', name: 'Noise Level Monitor', category: 'Monitoring', price: 180000, status: 'archived', stock: 4, short: 'Ambient & workplace noise monitoring.', featured: false },
]

// ── Content: Services ───────────────────────────────────────────────────────
export const services = [
  { id: 'svc_ec', title: 'Environmental Clearance', group: 'Clearances', status: 'published', short: 'End-to-end EC under EIA Notification 2006.', enquiries: 34 },
  { id: 'svc_eia', title: 'EIA Reports', group: 'Studies & Audits', status: 'published', short: 'Rigorous, defensible impact assessments.', enquiries: 41 },
  { id: 'svc_cte', title: 'Consent To Establish', group: 'Clearances', status: 'published', short: 'CTE filings under Water & Air Acts.', enquiries: 22 },
  { id: 'svc_cto', title: 'Consent To Operate', group: 'Clearances', status: 'published', short: 'CTO grant & renewals, hassle-free.', enquiries: 18 },
  { id: 'svc_etp', title: 'ETP Solutions', group: 'Treatment', status: 'published', short: 'Effluent treatment, designed & delivered.', enquiries: 27 },
  { id: 'svc_stp', title: 'STP Solutions', group: 'Treatment', status: 'published', short: 'Sewage treatment for any scale.', enquiries: 15 },
  { id: 'svc_waste', title: 'Waste Management', group: 'Compliance', status: 'draft', short: 'Hazardous & solid waste, end-to-end.', enquiries: 9 },
]

// ── Content: Events ─────────────────────────────────────────────────────────
export const events = [
  { id: 'evt_eia26', slug: 'eia-notification-2026-briefing', title: 'EIA Notification 2026: What Project Proponents Must Know', date: '2026-07-18', location: 'Equinox HQ, Pune', registrations: 236, capacity: 300, status: 'upcoming' },
  { id: 'evt_zld', slug: 'zld-masterclass', title: 'Zero Liquid Discharge Masterclass', date: '2026-08-02', location: 'Hotel Sahara Star, Mumbai', registrations: 162, capacity: 200, status: 'upcoming' },
  { id: 'evt_lake', slug: 'lake-revival-community-drive', title: 'Lake Revival Community Drive', date: '2026-09-20', location: 'Ulsoor Lake, Bengaluru', registrations: 410, capacity: 500, status: 'upcoming' },
  { id: 'evt_wed25', slug: 'world-environment-day-2025', title: 'World Environment Day Summit 2025', date: '2025-06-05', location: 'Pune International Centre', registrations: 520, capacity: 520, status: 'past' },
  { id: 'evt_cems', slug: 'cems-compliance-workshop', title: 'CEMS & Online Monitoring Workshop', date: '2025-03-14', location: 'Ahmedabad', registrations: 180, capacity: 200, status: 'past' },
]

// ── Content: Gallery ────────────────────────────────────────────────────────
const IMG = {
  turbines: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=900&q=80',
  forest: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=900&q=80',
  solar: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=900&q=80',
  office: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=900&q=80',
  experts: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=900&q=80',
  lake: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=900&q=80',
  water: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=900&q=80',
  river: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&w=900&q=80',
}

export const gallery = [
  { id: 'gal_1', src: IMG.office, category: 'Our Office', caption: 'Equinox HQ  Hinjawadi, Pune' },
  { id: 'gal_2', src: IMG.experts, category: 'Our Office', caption: 'Our laboratory & research team' },
  { id: 'gal_3', src: IMG.lake, category: 'Projects', caption: 'Bellandur Lake revival, Bengaluru' },
  { id: 'gal_4', src: IMG.water, category: 'Projects', caption: 'Powai Lake wetland creation' },
  { id: 'gal_5', src: IMG.river, category: 'Projects', caption: 'Ulsoor Lake bioremediation' },
  { id: 'gal_6', src: IMG.turbines, category: 'Projects', caption: 'Renewable energy EIA, Rajasthan' },
  { id: 'gal_7', src: IMG.solar, category: 'Achievements', caption: 'Solar park clearance milestone' },
  { id: 'gal_8', src: IMG.forest, category: 'Achievements', caption: 'Green India recognition' },
  { id: 'gal_9', src: IMG.office, category: 'Events', caption: 'World Environment Day 2025' },
  { id: 'gal_10', src: IMG.experts, category: 'Events', caption: 'Compliance workshop, Mumbai' },
]

// ── Content: Clients ────────────────────────────────────────────────────────
export const clients = [
  { id: 'cli_1', name: 'Vanguard Cements', sector: 'Manufacturing', projects: 6, since: 2016, status: 'active' },
  { id: 'cli_2', name: 'Helix Chemicals', sector: 'Chemical', projects: 4, since: 2018, status: 'active' },
  { id: 'cli_3', name: 'Northstar Infra', sector: 'Infrastructure', projects: 9, since: 2014, status: 'active' },
  { id: 'cli_4', name: 'Aralia Estates', sector: 'Real Estate', projects: 3, since: 2020, status: 'active' },
  { id: 'cli_5', name: 'GreenGrid Energy', sector: 'Energy', projects: 5, since: 2019, status: 'active' },
  { id: 'cli_6', name: 'Metro Infra', sector: 'Infrastructure', projects: 7, since: 2015, status: 'active' },
  { id: 'cli_7', name: 'HydroTech', sector: 'Energy', projects: 2, since: 2021, status: 'inactive' },
  { id: 'cli_8', name: 'EcoSphere', sector: 'Manufacturing', projects: 4, since: 2017, status: 'active' },
  { id: 'cli_9', name: 'Pune Municipal Corp.', sector: 'Government', projects: 11, since: 2012, status: 'active' },
  { id: 'cli_10', name: 'Nova Chemicals', sector: 'Chemical', projects: 3, since: 2022, status: 'active' },
]

// ── Content: Team ───────────────────────────────────────────────────────────
export const team = [
  { id: 'tm_1', name: 'Dr. Sangram P. Ghugare', role: 'Chairman', group: 'Management', exp: '35+ years', spec: 'Environmental & Civil Engineering', status: 'active' },
  { id: 'tm_2', name: 'Sulakshna Ayarekar', role: 'Managing Director', group: 'Management', exp: '21+ years', spec: 'EIA & Environmental Management', status: 'active' },
  { id: 'tm_3', name: 'Prof. (Dr.) Jay S. Samant', role: 'Technical Director', group: 'Experts', exp: '50 years', spec: 'Ecology (EB)', status: 'active' },
  { id: 'tm_4', name: 'Dr. Jaysingh B. Ghugare', role: 'Technical Director', group: 'Experts', exp: '45 years', spec: 'Soil Science', status: 'active' },
  { id: 'tm_5', name: 'Dr. Bhaskar Thorat', role: 'Empaneled Expert', group: 'Experts', exp: '30 years', spec: 'Chemical Eng. (HW, WP, RH)', status: 'active' },
  { id: 'tm_6', name: 'Mr. Vinaykumar Kurakula', role: 'Empaneled Expert', group: 'Experts', exp: '8 years', spec: 'GIS & Noise Modelling', status: 'active' },
]

// ── Enquiries / Leads (contact form submissions) ────────────────────────────
export const enquiries = [
  { id: 'enq_1', name: 'Rajesh Pillai', company: 'Vanguard Cements', email: 'rajesh@vanguardcements.in', phone: '+91 98200 11223', subject: 'EC for cement plant expansion', service: 'Environmental Clearance', message: 'We are planning a 2 MTPA expansion and need help with the EC process and public hearing support.', status: 'new', priority: 'high', createdAt: '2026-07-12T09:24:00' },
  { id: 'enq_2', name: 'Meera Joshi', company: 'Aralia Estates', email: 'meera.j@aralia.com', phone: '+91 99870 44556', subject: 'Lake revival for township', service: 'Lake Revival', message: 'Interested in a wetland-based revival for our 14-acre community lake. Please share an approach note.', status: 'in_progress', priority: 'medium', createdAt: '2026-07-11T15:10:00' },
  { id: 'enq_3', name: 'Imran Sheikh', company: 'Helix Chemicals', email: 'imran@helixchem.co.in', phone: '+91 90040 22110', subject: 'CTO renewal + compliance', service: 'Consent To Operate', message: 'Our CTO is up for renewal in Q3. Need end-to-end filing and six-monthly compliance handling.', status: 'new', priority: 'high', createdAt: '2026-07-11T11:02:00' },
  { id: 'enq_4', name: 'Anita Desai', company: 'Northstar Infra', email: 'anita.desai@northstar.in', phone: '+91 98110 55221', subject: 'CEMS installation', service: 'Environmental Monitoring', message: 'Looking for CPCB-approved CEMS for two stacks with data connectivity.', status: 'resolved', priority: 'medium', createdAt: '2026-07-09T13:45:00' },
  { id: 'enq_5', name: 'Karan Malhotra', company: 'Solaris Power', email: 'karan@solarispower.in', phone: '+91 90900 33445', subject: 'Solar park EIA', service: 'EIA Reports', message: 'Need an EIA for a 250 MW solar park in Rajasthan. What is the typical timeline?', status: 'in_progress', priority: 'medium', createdAt: '2026-07-08T10:30:00' },
  { id: 'enq_6', name: 'Priya Nair', company: 'TerraBuild', email: 'priya@terrabuild.co', phone: '+91 99001 77889', subject: 'STP for residential project', service: 'STP Solutions', message: 'Require a 500 KLD STP with reuse for a gated community. Please advise on technology.', status: 'new', priority: 'low', createdAt: '2026-07-07T16:20:00' },
  { id: 'enq_7', name: 'Suresh Reddy', company: 'Nova Chemicals', email: 'suresh.r@novachem.in', phone: '+91 90123 66554', subject: 'ZLD feasibility', service: 'ETP Solutions', message: 'Exploring ZLD for our dye intermediate unit. Need a feasibility and CAPEX estimate.', status: 'resolved', priority: 'high', createdAt: '2026-07-05T08:15:00' },
  { id: 'enq_8', name: 'Fatima Khan', company: 'EcoSphere', email: 'fatima@ecosphere.in', phone: '+91 98765 00112', subject: 'Environmental audit', service: 'Environmental Audit', message: 'Need an annual environmental audit and Form V statement for FY 25-26.', status: 'new', priority: 'medium', createdAt: '2026-07-04T12:00:00' },
]

// ── Console users (people with admin access) ────────────────────────────────
export const users = [
  { id: 'usr_admin', name: 'Sulakshna Ayarekar', email: 'admin@equinoxenvi.com', role: 'Administrator', status: 'active' },
  { id: 'usr_2', name: 'Dr. Sangram Ghugare', email: 'sangram@equinoxenvi.com', role: 'Administrator', status: 'active' },
  { id: 'usr_3', name: 'Karthik Iyer', email: 'karthik@equinoxenvi.com', role: 'Editor', status: 'active' },
  { id: 'usr_4', name: 'Neha Kulkarni', email: 'neha@equinoxenvi.com', role: 'Editor', status: 'invited' },
  { id: 'usr_5', name: 'Rahul Deshmukh', email: 'rahul@equinoxenvi.com', role: 'Viewer', status: 'active' },
]

// ── Analytics: weekly enquiry distribution for the overview chart ────────────
export const analytics = {
  // Enquiries received per weekday this week (0100 scale for the pill chart)
  enquiriesWeek: [
    { label: 'S', value: 32 },
    { label: 'M', value: 68 },
    { label: 'T', value: 74, tooltip: '74%' },
    { label: 'W', value: 92 },
    { label: 'T', value: 20 },
    { label: 'F', value: 12 },
    { label: 'S', value: 8 },
  ],
}

// The full seed object consumed by the API client.
export const seed = {
  products,
  services,
  events,
  gallery,
  clients,
  team,
  enquiries,
  users,
}
