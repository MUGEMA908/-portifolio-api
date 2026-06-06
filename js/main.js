// ============================================================
//  NIYONSABA Eugene · Portfolio
//  js/main.js
// ============================================================

// ── Hamburger menu ──────────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
  navLinks.querySelectorAll('.nav-btn').forEach(btn =>
    btn.addEventListener('click', () => navLinks.classList.remove('open'))
  );
}

// ── Navbar scroll shadow + active link ──────────────────────
const navbar   = document.getElementById('navbar');
const sections = document.querySelectorAll('section[id]');
const navBtns  = document.querySelectorAll('.nav-btn[href^="#"]');

function updateNav() {
  // shadow
  if (navbar) {
    navbar.style.boxShadow = window.scrollY > 10
      ? '0 2px 30px rgba(0,0,0,.5)' : 'none';
  }
  // active state
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 110) current = sec.id;
  });
  navBtns.forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('href') === '#' + current);
  });
}

window.addEventListener('scroll', updateNav, { passive: true });
updateNav();

// ── Scroll reveal ───────────────────────────────────────────
const reveals = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
  const obs = new IntersectionObserver(
    entries => entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
    }),
    { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
  );
  reveals.forEach(el => obs.observe(el));
} else {
  reveals.forEach(el => el.classList.add('visible'));
}

// ── Modal system ────────────────────────────────────────────
const overlay = document.getElementById('modalOverlay');
const modalTitle    = document.getElementById('modalTitle');
const modalSubtitle = document.getElementById('modalSubtitle');
const modalContent  = document.getElementById('modalContent');

const caseStudies = {
  smartveg: {
    title: 'SmartVeg Rwanda',
    subtitle: 'Smart Agriculture · 2024 · AI / Sensors / Project Management',
    sections: [
      {
        label: '01 — Problem',
        heading: 'Farmers lacked data to optimise crop yields',
        body: 'Small-scale farmers in Rwanda rely on traditional methods that waste water, over-use fertiliser, and result in poor harvests. There was no affordable, locally-adapted technology giving real-time soil and weather data to guide planting and irrigation decisions. Food insecurity and land degradation were the direct consequences.'
      },
      {
        label: '02 — Research',
        heading: 'Interviews with farmers and agronomists across Ngoma District',
        body: 'The team conducted field visits and interviews with over 15 farmers and 3 agronomists. Key findings: (1) farmers had no way to monitor soil moisture in real time, (2) most lacked smartphones but had access to basic feature phones, (3) the biggest pain point was unpredictable rainfall causing both drought stress and waterlogging. This research shaped the sensor-first, SMS-alert approach.'
      },
      {
        label: '03 — Process',
        heading: 'From concept to prototype in 3 iterations',
        body: 'As Project Manager, coordinated a cross-functional student team including hardware (sensors), software (web dashboard), and agronomy consultants. Built an Agile workflow with weekly sprints. Iteration 1 tested basic soil sensors. Iteration 2 integrated weather data. Iteration 3 connected data to a web dashboard and SMS notification system. Each round was reviewed with actual farmers for feedback.'
      },
      {
        label: '04 — Solution',
        heading: 'AI-assisted smart agriculture platform',
        body: 'Deployed IoT soil and humidity sensors connected to a central web dashboard. AI algorithms analyse sensor data to recommend irrigation schedules and flag anomalies. Farmers receive SMS alerts when intervention is needed. The web interface allows agronomists to monitor multiple plots simultaneously and generate reports for government partners.'
      },
      {
        label: '05 — Results & Impact',
        body: null,
        outcomes: [
          { n: '30%+', l: 'Estimated water savings' },
          { n: '3',    l: 'Iterations completed' },
          { n: '15+',  l: 'Farmers interviewed' },
          { n: '✓',    l: 'Government partner interest' }
        ]
      }
    ]
  },

  sifs: {
    title: 'School Information & Feedback System (SIFS)',
    subtitle: 'Education Tech · 2024 · HTML / CSS / Java / MySQL',
    sections: [
      {
        label: '01 — Problem',
        heading: 'Manual school administration caused delays and lost information',
        body: 'The school relied on paper-based systems for student registration, login tracking, and collecting feedback from students about teachers and facilities. Data was frequently lost, reports took days to produce, and students had no formal channel to raise concerns or suggestions anonymously.'
      },
      {
        label: '02 — Research',
        heading: 'Needs analysis with school staff and students',
        body: 'Surveyed 20 students and 5 staff members. Key needs identified: (1) secure individual login for students and teachers, (2) a feedback form that protects student anonymity, (3) an admin dashboard to view submitted feedback and manage accounts, (4) easy accessibility from school computers without any mobile dependency. These requirements directly drove the feature list.'
      },
      {
        label: '03 — Process',
        heading: 'Multi-page architecture designed before a single line of code',
        body: 'Started with a site-map covering 5 pages: Landing, Login, Signup, Student Dashboard, and Admin Panel. Wireframed each screen on paper first, then built HTML structure, then CSS styling, then Java backend logic with MySQL database. Used XAMPP to host locally during development. Tested with 5 real student volunteers who attempted to register, log in, and submit feedback.'
      },
      {
        label: '04 — Solution',
        heading: 'Secure, multi-role web system with feedback pipeline',
        body: 'Built a complete multi-page web application: secure registration and login (hashed passwords), role-based access (student vs admin), a feedback form with optional anonymity, and an admin panel showing all submissions with filtering. Backend in Java connected to a MySQL database via XAMPP. Responsive CSS ensures it works on all school monitors.'
      },
      {
        label: '05 — Results & Grades',
        body: null,
        outcomes: [
          { n: '5',     l: 'Pages built' },
          { n: '2',     l: 'User roles (student / admin)' },
          { n: '100%',  l: 'Test users completed signup' },
          { n: 'A',     l: 'Academic project grade' }
        ]
      }
    ]
  },

  ictshop: {
    title: 'ICT Tools Shop',
    subtitle: 'E-Commerce · 2024 · HTML / CSS / Bootstrap',
    sections: [
      {
        label: '01 — Problem',
        heading: 'No online storefront for ICT hardware in the local market',
        body: 'Local ICT vendors operated entirely offline, meaning customers could not browse products, compare prices, or check availability without physically visiting the shop. This limited reach and made it harder for schools and businesses to source equipment efficiently.'
      },
      {
        label: '02 — Research',
        heading: 'Benchmarked 4 regional ICT retail websites',
        body: 'Analysed Jumia, Kigali stores, and two regional ICT shops. Found that: (1) most local sites lacked responsive design, (2) product images were low quality or missing, (3) there was no clear category filtering. Target users were school procurement officers and individual buyers. Key expectation: clean product grid, visible prices, and contact info on every page.'
      },
      {
        label: '03 — Process',
        heading: 'Bootstrap-first, mobile-ready from day one',
        body: 'Chose Bootstrap 5 for rapid responsive grid layout. Structured the site into: Homepage with featured products, Category pages (Computers, Accessories, Software), individual Product cards with image, name, price and description, and a Contact page. Built and tested on both desktop and mobile screen sizes throughout. Focused on load speed and visual clarity.'
      },
      {
        label: '04 — Solution',
        heading: 'Clean, fast product listing website built with Bootstrap',
        body: 'Delivered a fully responsive e-commerce product listing site. Features include: hero banner with call-to-action, product cards with hover effects, category navigation, Bootstrap modal for quick product preview, and a contact section with WhatsApp integration. Clean green-and-white colour palette aligned to tech brand identity.'
      },
      {
        label: '05 — Results',
        body: null,
        outcomes: [
          { n: '4',    l: 'Pages delivered' },
          { n: '100%', l: 'Mobile responsive' },
          { n: '3',    l: 'Product categories' },
          { n: 'B+',   l: 'Peer review score' }
        ]
      }
    ]
  }
};

function buildModalHTML(study) {
  return study.sections.map(sec => {
    if (sec.outcomes) {
      return `
        <div class="case-section">
          <div class="case-label">${sec.label}</div>
          ${sec.heading ? `<h4>${sec.heading}</h4>` : ''}
          ${sec.body ? `<p>${sec.body}</p>` : ''}
          <div class="outcome-row">
            ${sec.outcomes.map(o => `
              <div class="outcome">
                <div class="outcome-n">${o.n}</div>
                <div class="outcome-l">${o.l}</div>
              </div>`).join('')}
          </div>
        </div>`;
    }
    return `
      <div class="case-section">
        <div class="case-label">${sec.label}</div>
        ${sec.heading ? `<h4>${sec.heading}</h4>` : ''}
        ${sec.body ? `<p>${sec.body}</p>` : ''}
      </div>`;
  }).join('');
}

function openModal(key) {
  const study = caseStudies[key];
  if (!study || !overlay) return;
  modalTitle.textContent    = study.title;
  modalSubtitle.textContent = study.subtitle;
  modalContent.innerHTML    = buildModalHTML(study);
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
  // scroll modal to top
  overlay.querySelector('.modal-box').scrollTop = 0;
}

function closeModal() {
  if (!overlay) return;
  overlay.classList.remove('open');
  document.body.style.overflow = '';
}

// Close on overlay background click
if (overlay) {
  overlay.addEventListener('click', e => {
    if (e.target === overlay) closeModal();
  });
}

// Close on Escape key
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
});

// Expose globally for inline onclick
window.openModal  = openModal;
window.closeModal = closeModal;

// ============================================================
//  MongoDB API integration
//  All fetch() calls talk to the Express server in /server/
//
//  HOW IT WORKS:
//  1. User fills the form and clicks "Send Message"
//  2. submitContact() sends a POST to /api/contact
//  3. Express saves the document in MongoDB
//  4. The user sees a success message instantly
//
//  Tracking works the same way – fire-and-forget POST calls
//  log every "Explore" click and GitHub click to MongoDB.
// ============================================================

// Change this to your deployed server URL when you go live
// e.g. 'https://niyonsaba-api.onrender.com'
const API_BASE = 'https://portfolio-server-1cln.onrender.com';

// ── Contact form submit ──────────────────────────────────────
async function submitContact() {
  const nameEl    = document.getElementById('cf-name');
  const emailEl   = document.getElementById('cf-email');
  const msgEl     = document.getElementById('cf-message');
  const btn       = document.getElementById('cf-submit');
  const statusEl  = document.getElementById('cf-status');

  const name    = nameEl.value.trim();
  const email   = emailEl.value.trim();
  const message = msgEl.value.trim();

  // Client-side validation before even hitting the server
  if (!name || !email || !message) {
    showStatus(statusEl, 'error', '⚠ Please fill in all fields.');
    return;
  }

  if (!/^\S+@\S+\.\S+$/.test(email)) {
    showStatus(statusEl, 'error', '⚠ Please enter a valid email address.');
    return;
  }

  // Disable button while sending
  btn.disabled = true;
  btn.textContent = 'Sending…';
  statusEl.style.display = 'none';

  try {
    const res  = await fetch(`${API_BASE}/api/contact`, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ name, email, message })
    });

    const data = await res.json();

    if (res.ok && data.success) {
      // Clear the form
      nameEl.value  = '';
      emailEl.value = '';
      msgEl.value   = '';
      showStatus(statusEl, 'success', '✅ ' + data.message);
    } else {
      showStatus(statusEl, 'error', '⚠ ' + (data.error || 'Something went wrong. Please try again.'));
    }

  } catch (err) {
    // Network error – server might not be running locally
    showStatus(statusEl, 'error',
      '⚠ Could not reach the server. Make sure the backend is running (see README), or email me directly at niyonsabaeugene44@gmail.com');
  } finally {
    btn.disabled    = false;
    btn.textContent = 'Send Message';
  }
}

// Helper: show a status message with the right colour
function showStatus(el, type, text) {
  el.className     = 'cf-status ' + type;
  el.textContent   = text;
  el.style.display = 'block';
  // Auto-hide success after 6 seconds
  if (type === 'success') setTimeout(() => { el.style.display = 'none'; }, 6000);
}

// ── Track "Explore Case Study" clicks ───────────────────────
// Called from the explore button's onclick BEFORE openModal()
// so the recruiter's interest is always recorded.
const _originalOpenModal = window.openModal;
window.openModal = function(key) {
  // Fire the tracking request silently in the background
  fetch(`${API_BASE}/api/track/project-view`, {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify({ project: key })
  }).catch(() => {}); // ignore errors – tracking should never break the UI

  // Then open the modal as normal
  _originalOpenModal(key);
};

// ── Track GitHub button clicks ───────────────────────────────
function trackGithub(project) {
  fetch(`${API_BASE}/api/track/github-click`, {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify({ project: project || 'general' })
  }).catch(() => {});
  // The link itself navigates normally – this just records the click
}

window.trackGithub   = trackGithub;
window.submitContact = submitContact;
// ── Admin Avatar Badge ────────────────────────────────────────
function updateAdminBadge() {
  const token = sessionStorage.getItem('ne_token');
  const adminData = sessionStorage.getItem('ne_admin');
  const nav = document.querySelector('nav') || document.querySelector('.nav-links') || document.querySelector('header');

  let badge = document.getElementById('admin-nav-badge');

  if (token && adminData) {
    const admin = JSON.parse(adminData);
    const letter = admin.name?.[0]?.toUpperCase() || 'N';

    if (!badge) {
      badge = document.createElement('div');
      badge.id = 'admin-nav-badge';
      badge.style.cssText = 'width:38px;height:38px;border-radius:50%;background:#00ff88;color:#000;font-weight:bold;font-size:16px;display:flex;align-items:center;justify-content:center;cursor:pointer;position:fixed;top:16px;right:16px;z-index:9999;box-shadow:0 0 12px #00ff88;';
      badge.innerHTML = letter;
      badge.onclick = () => window.location.href = 'admin/index.html';
      document.body.appendChild(badge);
    }
  } else {
    if (badge) badge.remove();
  }
}

setInterval(updateAdminBadge, 1000);
updateAdminBadge();