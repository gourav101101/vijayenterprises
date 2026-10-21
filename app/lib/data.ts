export const siteConfig = {
  name: 'Vijay Enterprises', email: 'hello@example.com', phone: '', whatsapp: '',
  demo: true, region: 'Service regions to be confirmed',
};
export const services = [
  { id: 'power', number: '01', label: 'Power infrastructure', short: 'Power', eyebrow: 'THE FOUNDATION OF EVERY CONNECTION', title: 'Built to carry\nwhat comes next.', description: 'Defined installation and infrastructure work packages, aligned with the needs of your site.', image: '/images/power.jpg', icon: 'bolt', scope: ['Electrical infrastructure installation support', 'Equipment placement and connection coordination', 'Cable routing and site interface planning', 'Inspection and handover coordination'], inputs: ['Location and site access information', 'Approved drawings and defined work package', 'Equipment list and project schedule'], detail: 'Bring the requirements, the drawings and the ambition. We start with a clear conversation about the work, the site interfaces and the people needed to move it forward.' },
  { id: 'telecom', number: '02', label: 'Telecom site power', short: 'Telecom', eyebrow: 'BEHIND EVERY SIGNAL', title: 'The infrastructure\nbehind connection.', description: 'Site power installation support for telecom operators, tower partners and rollout teams.', image: '/images/telecom.jpg', icon: 'tower', scope: ['Telecom site power work packages', 'Site deployment and access coordination', 'Equipment installation support', 'Work documentation and handover inputs'], inputs: ['Site list and deployment regions', 'Defined electrical and equipment scope', 'Access permissions and delivery milestones'], detail: 'Each site has its own constraints. A useful rollout conversation starts with access, readiness, defined responsibilities and the interfaces between your teams.' },
  { id: 'solar', number: '03', label: 'Solar installation', short: 'Solar', eyebrow: 'TURNING POTENTIAL INTO PROGRESS', title: 'A brighter future.\nBuilt on the ground.', description: 'Installation and site execution support for solar EPC partners and project teams.', image: '/images/solar.jpg', icon: 'sun', scope: ['Defined solar installation work packages', 'Electrical and balance-of-system scope review', 'Site readiness and installation coordination', 'Completion documentation support'], inputs: ['Installation type and site location', 'BOQ, drawings and work-package boundaries', 'Site readiness and expected start date'], detail: 'From an initial work package to an agreed site plan, the focus is on understanding how installation fits into the wider EPC programme.' },
  { id: 'civil', number: '04', label: 'Civil project support', short: 'Civil', eyebrow: 'PROGRESS STARTS BELOW THE SURFACE', title: 'Strong foundations.\nShared ambition.', description: 'Defined civil work packages coordinated around infrastructure installation schedules.', image: '/images/civil.jpg', icon: 'layers', scope: ['Site preparation scope review', 'Foundations and equipment-base work packages', 'Trenching and cable-route interfaces', 'Civil and electrical schedule coordination'], inputs: ['Approved civil drawings and quantities', 'Site conditions and access requirements', 'Interface responsibilities and programme'], detail: 'Good coordination begins before mobilisation. Establish the work boundaries, site conditions and handover requirements before execution begins.' },
];
export const defaultContent = {
  heroTitle: 'Infrastructure.\nIn motion.',
  heroDescription: 'Power. Telecom. Solar. Civil.\nConnected expertise for the infrastructure that moves us forward.',
  aboutTitle: 'The work behind\na connected world.',
  aboutBody: 'Every connection begins with work on the ground. Vijay Enterprises brings power, telecom, solar and civil project conversations together around a clear scope and a practical approach to site execution.',
  email: siteConfig.email, phone: '', whatsapp: '', region: siteConfig.region,
};
export type SiteContent = typeof defaultContent;
export const processSteps = [
  { n: '01', title: 'Understand the scope.', text: 'Start with your project location, requirements and intended timeline. Define what the work needs to achieve.' },
  { n: '02', title: 'Plan the interfaces.', text: 'Discuss site readiness, access, drawings and the responsibilities shared between project teams.' },
  { n: '03', title: 'Align on execution.', text: 'Agree the work package, quotation, mobilisation plan and inspection requirements before work begins.' },
  { n: '04', title: 'Close the loop.', text: 'Review the delivered scope, relevant documentation and agreed handover requirements.' },
];
