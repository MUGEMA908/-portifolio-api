// server/index.js
// ─────────────────────────────────────────────────────────────
//  Express + MongoDB backend for NIYONSABA Eugene Portfolio
//
//  PUBLIC ROUTES:
//    POST /api/contact               → save a contact form message
//    POST /api/track/project-view    → log a case-study open
//    POST /api/track/github-click    → log a GitHub button click
//    GET  /api/health                → health check
//
//  AUTH ROUTES:
//    POST /api/admin/login           → login, returns JWT token
//
//  PROTECTED ROUTES (require Bearer token):
//    GET  /api/contact               → list all messages
//    PATCH /api/contact/:id/read     → mark message as read
//    DELETE /api/contact/:id         → delete a message
//    GET  /api/stats                 → analytics summary
// ─────────────────────────────────────────────────────────────

require('dotenv').config();
const express  = require('express');
const mongoose = require('mongoose');
const cors     = require('cors');
const bcrypt   = require('bcryptjs');
const jwt      = require('jsonwebtoken');

const { Contact, ProjectView, GithubClick } = require('./models');

const app  = express();
const PORT = process.env.PORT || 3001;

// ── Admin credentials (hardcoded + env fallback) ─────────────
// Email:    eugene@gmail.com
// Password: 123
const ADMIN_EMAIL    = process.env.ADMIN_EMAIL    || 'eugene@gmail.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || '123';
const JWT_SECRET     = process.env.JWT_SECRET     || 'niyonsaba_eugene_secret_2026';

// ── Middleware ───────────────────────────────────────────────
app.use(cors({
  origin: '*'
}));

app.use(express.json());

// ── Auth middleware (protects private routes) ────────────────
function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;

  if (!token) {
    return res.status(401).json({ error: 'Access denied. Please log in.' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.admin = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Session expired. Please log in again.' });
  }
}

// ── Helper: get visitor IP ───────────────────────────────────
function getIP(req) {
  return (req.headers['x-forwarded-for'] || req.socket.remoteAddress || '').split(',')[0].trim();
}

// ── Connect to MongoDB ───────────────────────────────────────
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅  MongoDB connected successfully'))
  .catch(err => {
    console.error('❌  MongoDB connection failed:', err.message);
    
  });

// ════════════════════════════════════════════════════════════
//  PUBLIC ROUTES
// ════════════════════════════════════════════════════════════

// ── Health check ─────────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'NIYONSABA Eugene Portfolio API is running',
    dbState: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    time: new Date().toISOString()
  });
});

// ── Submit contact form ───────────────────────────────────────
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are all required.' });
    }

    const submission = await Contact.create({
      name:    name.trim(),
      email:   email.trim().toLowerCase(),
      message: message.trim(),
      ip:      getIP(req)
    });

    console.log(`📩  New message from ${submission.name} <${submission.email}>`);

    res.status(201).json({
      success: true,
      message: `Thank you ${submission.name}! Your message has been received. I will reply within 24 hours.`,
      id: submission._id
    });

  } catch (err) {
    if (err.name === 'ValidationError') {
      const errors = Object.values(err.errors).map(e => e.message);
      return res.status(400).json({ error: errors.join(', ') });
    }
    console.error('Contact save error:', err);
    res.status(500).json({ error: 'Server error. Please try again.' });
  }
});

// ── Track case-study opens ───────────────────────────────────
app.post('/api/track/project-view', async (req, res) => {
  try {
    const { project } = req.body;
    if (!project) return res.status(400).json({ error: 'project field required.' });

    await ProjectView.create({
      project,
      referrer: req.headers.referer || '',
      ip: getIP(req)
    });

    res.json({ success: true });
  } catch (err) {
    console.error('Project view tracking error:', err.message);
    res.status(200).json({ success: false });
  }
});

// ── Track GitHub clicks ───────────────────────────────────────
app.post('/api/track/github-click', async (req, res) => {
  try {
    await GithubClick.create({
      project: req.body.project || 'general',
      ip: getIP(req)
    });
    res.json({ success: true });
  } catch (err) {
    console.error('GitHub click tracking error:', err.message);
    res.status(200).json({ success: false });
  }
});

// ════════════════════════════════════════════════════════════
//  AUTH ROUTE
// ════════════════════════════════════════════════════════════

// ── Admin login ───────────────────────────────────────────────
// POST /api/admin/login
// Body: { "email": "eugene@gmail.com", "password": "123" }
// Returns: { "token": "eyJ..." }
app.post('/api/admin/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' });
    }

    // Check email
    if (email.trim().toLowerCase() !== ADMIN_EMAIL.toLowerCase()) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    // Check password (plain compare — simple and works for personal use)
    if (password !== ADMIN_PASSWORD) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    // Create JWT token — expires in 8 hours
    const token = jwt.sign(
      { email: ADMIN_EMAIL, role: 'admin' },
      JWT_SECRET,
      { expiresIn: '8h' }
    );

    console.log(`🔐  Admin logged in: ${ADMIN_EMAIL}`);

    res.json({
      success: true,
      token,
      admin: { email: ADMIN_EMAIL, name: 'NIYONSABA Eugene' },
      expiresIn: '8h'
    });

  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Server error during login.' });
  }
});

// ── Verify token (used by dashboard on load) ─────────────────
app.get('/api/admin/verify', requireAuth, (req, res) => {
  res.json({ valid: true, admin: req.admin });
});

// ════════════════════════════════════════════════════════════
//  PROTECTED ROUTES  (need login token)
// ════════════════════════════════════════════════════════════

// ── List all contact messages ─────────────────────────────────
app.get('/api/contact', requireAuth, async (req, res) => {
  try {
    const messages = await Contact.find()
      .sort({ createdAt: -1 })
      .limit(200)
      .select('-ip');

    res.json({
      total:    messages.length,
      unread:   messages.filter(m => !m.read).length,
      messages
    });

  } catch (err) {
    res.status(500).json({ error: 'Could not fetch messages.' });
  }
});

// ── Mark a message as read ────────────────────────────────────
app.patch('/api/contact/:id/read', requireAuth, async (req, res) => {
  try {
    const msg = await Contact.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true }
    );
    if (!msg) return res.status(404).json({ error: 'Message not found.' });
    res.json({ success: true, message: msg });
  } catch (err) {
    res.status(500).json({ error: 'Could not update message.' });
  }
});

// ── Delete a message ──────────────────────────────────────────
app.delete('/api/contact/:id', requireAuth, async (req, res) => {
  try {
    const msg = await Contact.findByIdAndDelete(req.params.id);
    if (!msg) return res.status(404).json({ error: 'Message not found.' });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Could not delete message.' });
  }
});

// ── Stats dashboard ───────────────────────────────────────────
app.get('/api/stats', requireAuth, async (req, res) => {
  try {
    const [totalMessages, unreadMessages, projectViews, githubClicks, recentMessages] =
      await Promise.all([
        Contact.countDocuments(),
        Contact.countDocuments({ read: false }),
        ProjectView.aggregate([
          { $group: { _id: '$project', count: { $sum: 1 } } }
        ]),
        GithubClick.countDocuments(),
        Contact.find().sort({ createdAt: -1 }).limit(5).select('name email createdAt read')
      ]);

    const viewsByProject = {};
    projectViews.forEach(v => { viewsByProject[v._id] = v.count; });

    res.json({
      messages:       { total: totalMessages, unread: unreadMessages },
      projectViews:   viewsByProject,
      githubClicks,
      recentMessages,
      generatedAt:    new Date().toISOString()
    });

  } catch (err) {
    res.status(500).json({ error: 'Could not generate stats.' });
  }
});

// ── Start server ──────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`🚀  Server running at http://localhost:${PORT}`);
  console.log(`🔐  Admin login: POST http://localhost:${PORT}/api/admin/login`);
  console.log(`📊  Stats:       GET  http://localhost:${PORT}/api/stats`);
  console.log(`📩  Messages:    GET  http://localhost:${PORT}/api/contact`);
  console.log(`💚  Health:      GET  http://localhost:${PORT}/api/health`);
  console.log('');
  console.log(`👤  Admin email:    ${ADMIN_EMAIL}`);
  console.log(`🔑  Admin password: ${ADMIN_PASSWORD}`);
});
