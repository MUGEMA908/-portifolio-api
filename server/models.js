// server/models.js
// ─────────────────────────────────────────────────────────────
//  All MongoDB schemas/models live here.
//  Each model = one "collection" (like a table) in MongoDB.
// ─────────────────────────────────────────────────────────────

const mongoose = require('mongoose');

// ── 1. CONTACT MESSAGE ───────────────────────────────────────
//  Saved every time someone submits the contact form.
//  Fields: name, email, message, timestamp, read status.

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      maxlength: [100, 'Name too long']
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email']
    },
    message: {
      type: String,
      required: [true, 'Message is required'],
      trim: true,
      maxlength: [2000, 'Message too long']
    },
    // Whether you (the owner) have read/replied to this message
    read: {
      type: Boolean,
      default: false
    },
    // IP address – useful for spotting spam
    ip: {
      type: String,
      default: ''
    }
  },
  {
    // Automatically adds "createdAt" and "updatedAt" timestamps
    timestamps: true
  }
);

// ── 2. PROJECT VIEW ──────────────────────────────────────────
//  Logged every time a recruiter clicks "Explore Case Study".
//  Tells you which projects get the most interest.

const projectViewSchema = new mongoose.Schema(
  {
    project: {
      type: String,
      required: true,
      // Only allow the three valid project keys
      enum: ['smartveg', 'sifs', 'ictshop']
    },
    // Where the visitor came from (could be blank)
    referrer: {
      type: String,
      default: ''
    },
    ip: {
      type: String,
      default: ''
    }
  },
  { timestamps: true }
);

// ── 3. GITHUB CLICK ──────────────────────────────────────────
//  Logged when anyone clicks a "View on GitHub" button.
//  Lets you track recruiter interest in your source code.

const githubClickSchema = new mongoose.Schema(
  {
    project: {
      type: String,
      default: 'general'   // 'general' = nav/hero button; project name otherwise
    },
    ip: { type: String, default: '' }
  },
  { timestamps: true }
);

// Export all three models
module.exports = {
  Contact:     mongoose.model('Contact',     contactSchema),
  ProjectView: mongoose.model('ProjectView', projectViewSchema),
  GithubClick: mongoose.model('GithubClick', githubClickSchema)
};
