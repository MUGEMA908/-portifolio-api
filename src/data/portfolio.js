export const skills = {
  development: ['HTML5', 'CSS3', 'Java', 'Bootstrap', 'Responsive Design', 'React'],
  database:    ['MySQL', 'XAMPP', 'Database Management'],
  soft:        ['Communication', 'Leadership', 'Problem Solving', 'Teamwork', 'Project Management', 'Adaptability'],
}

export const heroSkills = ['HTML & CSS', 'Java', 'MySQL', 'XAMPP', 'Web Development', 'Problem Solving', 'Teamwork']

export const stats = [
  { num: '3',    lbl: 'Projects built' },
  { num: '2+',   lbl: 'Years studying' },
  { num: '100%', lbl: 'Committed' },
]

export const aboutCards = [
  { title: 'Who I Am',    text: 'A passionate IT Engineering student at Rwanda Polytechnic with hands-on experience building real-world digital solutions. I believe technology should solve real problems and serve communities, not just look good on screen.' },
  { title: 'How I Work',  text: 'I approach every project with a problem-first mindset. Whether building smart agriculture platforms or school management systems, I focus on practical, functional results that make a difference for real users.' },
  { title: 'Tools I Use', text: 'HTML, CSS, Java for web development. MySQL and XAMPP for database management. Bootstrap for rapid responsive design. Git and GitHub for version control and collaboration.' },
  { title: 'What I Seek', text: 'Internship or entry-level IT opportunities where I can apply my skills, grow as an engineer, and contribute to teams building meaningful technology solutions in Africa and beyond.' },
]

export const timeline = [
  {
    title: 'Advanced Diploma in Information Technology',
    date:  'Aug 2023 — Sep 2027 · Rwanda Polytechnic (RP NGOMA College)',
    text:  'Currently pursuing IT Engineering with foundational skills in HTML, CSS, Java and database management (MySQL). Gaining practical experience through academic projects including web development systems and research-based assignments.',
  },
  {
    title: 'SmartVeg Rwanda · Project Manager',
    date:  '2024 · Smart Agriculture Initiative',
    text:  'Led a team building an AI-powered smart agriculture system using sensors to improve food production and optimise land use across Rwanda. Demonstrated leadership and technology coordination skills in a real-world community project.',
  },
  {
    title: 'School Information and Feedback System (SIFS)',
    date:  '2024 · Academic Project',
    text:  'Designed and developed a complete multi-page school management website featuring login and signup authentication alongside a student feedback system. Applied web development and database management skills to a real education problem.',
  },
]

export const projects = [
  {
    key:     'smartveg',
    emoji:   '🌱',
    tag:     'Agriculture & AI',
    tagType: 'green',
    featured: true,
    title:   'SmartVeg Rwanda',
    desc:    'Smart agriculture platform using AI and sensors to improve food production and optimise land use across Rwanda. Led as Project Manager coordinating cross-functional teams.',
    pills:   ['Project Manager', 'AI / Sensors', 'Agriculture Tech', 'Community Impact'],
    github:  'https://github.com/MUGEMA908',
  },
  {
    key:     'sifs',
    emoji:   '💻',
    tag:     'Education',
    tagType: 'blue',
    featured: false,
    title:   'School System (SIFS)',
    desc:    'Multi-page school management website with login, signup, and feedback systems. Built a complete web solution addressing real educational administration needs.',
    pills:   ['Login / Signup', 'Feedback System', 'Multi-page Web', 'HTML & CSS'],
    github:  'https://github.com/MUGEMA908',
  },
  {
    key:     'ictshop',
    emoji:   '💼',
    tag:     'E-Commerce',
    tagType: 'amber',
    featured: false,
    title:   'ICT Tools Shop',
    desc:    'Product listing e-commerce website built with Bootstrap. Features a clean product catalogue designed to showcase and sell ICT hardware and software tools.',
    pills:   ['Bootstrap', 'Product Listing', 'Responsive Design', 'E-Commerce'],
    github:  'https://github.com/MUGEMA908',
  },
]

export const caseStudies = {
  smartveg: {
    title:    'SmartVeg Rwanda',
    subtitle: 'Smart Agriculture · 2024 · AI / Sensors / Project Management',
    sections: [
      { label: '01 — Problem',  heading: 'Farmers lacked data to optimise crop yields', body: 'Small-scale farmers in Rwanda rely on traditional methods that waste water, over-use fertiliser, and result in poor harvests. There was no affordable, locally-adapted technology giving real-time soil and weather data to guide planting and irrigation decisions.' },
      { label: '02 — Research', heading: 'Interviews with farmers and agronomists across Ngoma District', body: 'The team conducted field visits and interviews with over 15 farmers and 3 agronomists. Key findings: (1) farmers had no way to monitor soil moisture in real time, (2) most lacked smartphones but had access to basic feature phones, (3) the biggest pain point was unpredictable rainfall.' },
      { label: '03 — Process',  heading: 'From concept to prototype in 3 iterations', body: 'As Project Manager, coordinated a cross-functional student team including hardware (sensors), software (web dashboard), and agronomy consultants. Built an Agile workflow with weekly sprints across 3 full iterations.' },
      { label: '04 — Solution', heading: 'AI-assisted smart agriculture platform', body: 'Deployed IoT soil and humidity sensors connected to a central web dashboard. AI algorithms analyse sensor data to recommend irrigation schedules. Farmers receive SMS alerts when intervention is needed.' },
      { label: '05 — Results',  outcomes: [{ n: '30%+', l: 'Water savings' }, { n: '3', l: 'Iterations' }, { n: '15+', l: 'Farmers interviewed' }, { n: '✓', l: 'Gov. interest' }] },
    ],
  },
  sifs: {
    title:    'School Information & Feedback System (SIFS)',
    subtitle: 'Education Tech · 2024 · HTML / CSS / Java / MySQL',
    sections: [
      { label: '01 — Problem',  heading: 'Manual administration caused delays and lost data', body: 'The school relied on paper-based systems for student registration and feedback collection. Data was frequently lost, reports took days to produce, and students had no formal channel to raise concerns anonymously.' },
      { label: '02 — Research', heading: 'Needs analysis with school staff and students', body: 'Surveyed 20 students and 5 staff members. Key needs: secure individual login, anonymous feedback form, admin dashboard, and easy accessibility from school computers. These drove the feature list.' },
      { label: '03 — Process',  heading: 'Architecture designed before a single line of code', body: 'Started with a site-map covering 5 pages: Landing, Login, Signup, Student Dashboard, and Admin Panel. Wireframed each screen, then built HTML → CSS → Java backend → MySQL database.' },
      { label: '04 — Solution', heading: 'Secure, multi-role web system with feedback pipeline', body: 'Built a complete multi-page web application with hashed-password login, role-based access (student vs admin), anonymous feedback form, and an admin panel with filtering.' },
      { label: '05 — Results',  outcomes: [{ n: '5', l: 'Pages built' }, { n: '2', l: 'User roles' }, { n: '100%', l: 'Test signups' }, { n: 'A', l: 'Grade' }] },
    ],
  },
  ictshop: {
    title:    'ICT Tools Shop',
    subtitle: 'E-Commerce · 2024 · HTML / CSS / Bootstrap',
    sections: [
      { label: '01 — Problem',  heading: 'No online storefront for ICT hardware locally', body: 'Local ICT vendors operated entirely offline, meaning customers could not browse products, compare prices, or check availability without physically visiting the shop.' },
      { label: '02 — Research', heading: 'Benchmarked 4 regional ICT retail websites', body: 'Analysed Jumia and regional ICT shops. Found: (1) most local sites lacked responsive design, (2) product images were low quality, (3) there was no clear category filtering.' },
      { label: '03 — Process',  heading: 'Bootstrap-first, mobile-ready from day one', body: 'Chose Bootstrap 5 for rapid responsive grid layout. Structured the site into: Homepage, Category pages (Computers, Accessories, Software), product cards with image/price, and a Contact page.' },
      { label: '04 — Solution', heading: 'Clean, fast product listing website', body: 'Delivered a fully responsive e-commerce product listing site with hero banner, product cards with hover effects, category navigation, Bootstrap modal previews, and WhatsApp integration.' },
      { label: '05 — Results',  outcomes: [{ n: '4', l: 'Pages delivered' }, { n: '100%', l: 'Mobile ready' }, { n: '3', l: 'Categories' }, { n: 'B+', l: 'Peer score' }] },
    ],
  },
}
