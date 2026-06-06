import { useState, useEffect } from 'react';
import { getMessages, getStats, markRead, deleteMessage } from '../api';

export default function DashboardPage({ token, admin, avatarLetter, onLogout }) {
  const [messages, setMessages] = useState([]);
  const [stats, setStats] = useState(null);
  const [tab, setTab] = useState('messages');
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getMessages(token), getStats(token)]).then(([m, s]) => {
      setMessages(m.messages || []);
      setStats(s);
      setLoading(false);
    });
  }, [token]);

  const handleMarkRead = async (id) => {
    await markRead(id, token);
    setMessages(prev => prev.map(m => m._id === id ? { ...m, read: true } : m));
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this message?')) return;
    await deleteMessage(id, token);
    setMessages(prev => prev.filter(m => m._id !== id));
  };

  return (
    <div style={styles.container}>
      {/* NAV */}
      <nav style={styles.nav}>
        <span style={styles.brand}>📊 Admin Dashboard</span>
        <div style={styles.navRight}>
          <div style={styles.avatarWrap} onClick={() => setShowDropdown(!showDropdown)}>
            <div style={styles.avatar}>{avatarLetter}</div>
            {showDropdown && (
              <div style={styles.dropdown}>
                <p style={styles.dropName}>{admin?.name}</p>
                <p style={styles.dropEmail}>{admin?.email}</p>
                <hr style={{ border: '1px solid #333' }} />
                <button style={styles.logoutBtn} onClick={onLogout}>Logout</button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* STATS */}
      {stats && (
        <div style={styles.statsGrid}>
          {[
            { label: 'Total Messages', value: stats.messages?.total || 0, icon: '📩' },
            { label: 'Unread', value: stats.messages?.unread || 0, icon: '🔴' },
            { label: 'GitHub Clicks', value: stats.githubClicks || 0, icon: '🐙' },
            { label: 'Project Views', value: Object.values(stats.projectViews || {}).reduce((a, b) => a + b, 0), icon: '👁️' },
          ].map(s => (
            <div key={s.label} style={styles.statCard}>
              <span style={styles.statIcon}>{s.icon}</span>
              <span style={styles.statValue}>{s.value}</span>
              <span style={styles.statLabel}>{s.label}</span>
            </div>
          ))}
        </div>
      )}

      {/* TABS */}
      <div style={styles.tabs}>
        <button style={tab === 'messages' ? styles.tabActive : styles.tab} onClick={() => setTab('messages')}>Messages</button>
        <button style={tab === 'analytics' ? styles.tabActive : styles.tab} onClick={() => setTab('analytics')}>Analytics</button>
      </div>

      {/* MESSAGES */}
      {tab === 'messages' && (
        <div style={styles.content}>
          {loading ? <p style={styles.empty}>Loading...</p> : messages.length === 0 ? <p style={styles.empty}>No messages yet.</p> :
            messages.map(m => (
              <div key={m._id} style={{ ...styles.msgCard, borderLeft: m.read ? '4px solid #333' : '4px solid #00ff88' }}>
                <div style={styles.msgHeader}>
                  <strong style={styles.msgName}>{m.name}</strong>
                  <span style={styles.msgEmail}>{m.email}</span>
                  <span style={styles.msgDate}>{new Date(m.createdAt).toLocaleDateString()}</span>
                </div>
                <p style={styles.msgText}>{m.message}</p>
                <div style={styles.msgActions}>
                  {!m.read && <button style={styles.btnRead} onClick={() => handleMarkRead(m._id)}>✓ Mark Read</button>}
                  <a href={`mailto:${m.email}`} style={styles.btnReply}>↩ Reply</a>
                  <button style={styles.btnDelete} onClick={() => handleDelete(m._id)}>🗑 Delete</button>
                </div>
              </div>
            ))
          }
        </div>
      )}

      {/* ANALYTICS */}
      {tab === 'analytics' && stats && (
        <div style={styles.content}>
          <h3 style={styles.sectionTitle}>Project Views</h3>
          {Object.entries(stats.projectViews || {}).map(([project, count]) => (
            <div key={project} style={styles.barRow}>
              <span style={styles.barLabel}>{project}</span>
              <div style={styles.barBg}>
                <div style={{ ...styles.barFill, width: `${Math.min(count * 20, 100)}%` }} />
              </div>
              <span style={styles.barCount}>{count}</span>
            </div>
          ))}
          <h3 style={styles.sectionTitle}>Recent Contacts</h3>
          {(stats.recentMessages || []).map(m => (
            <div key={m._id} style={styles.recentRow}>
              <span style={styles.msgName}>{m.name}</span>
              <span style={styles.msgEmail}>{m.email}</span>
              <span style={styles.msgDate}>{new Date(m.createdAt).toLocaleDateString()}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: { minHeight: '100vh', background: '#0a0a0a', color: '#fff', fontFamily: 'Georgia, serif' },
  nav: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 32px', background: '#111', borderBottom: '1px solid #1a3a2a' },
  brand: { color: '#00ff88', fontSize: 18, fontWeight: 'bold' },
  navRight: { position: 'relative' },
  avatarWrap: { cursor: 'pointer' },
  avatar: { width: 40, height: 40, borderRadius: '50%', background: '#00ff88', color: '#000', fontSize: 18, fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  dropdown: { position: 'absolute', right: 0, top: 48, background: '#1a1a1a', border: '1px solid #333', borderRadius: 8, padding: 16, minWidth: 200, zIndex: 100 },
  dropName: { color: '#fff', margin: '0 0 4px', fontWeight: 'bold' },
  dropEmail: { color: '#666', margin: '0 0 8px', fontSize: 13 },
  logoutBtn: { background: '#ff4444', color: '#fff', border: 'none', borderRadius: 6, padding: '8px 16px', cursor: 'pointer', width: '100%' },
  statsGrid: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, padding: '24px 32px' },
  statCard: { background: '#111', border: '1px solid #1a3a2a', borderRadius: 12, padding: 20, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 },
  statIcon: { fontSize: 28 },
  statValue: { fontSize: 32, fontWeight: 'bold', color: '#00ff88' },
  statLabel: { color: '#888', fontSize: 13 },
  tabs: { display: 'flex', gap: 8, padding: '0 32px 16px' },
  tab: { padding: '10px 24px', background: '#111', border: '1px solid #333', borderRadius: 8, color: '#888', cursor: 'pointer', fontSize: 14 },
  tabActive: { padding: '10px 24px', background: '#00ff88', border: 'none', borderRadius: 8, color: '#000', cursor: 'pointer', fontSize: 14, fontWeight: 'bold' },
  content: { padding: '0 32px 32px' },
  msgCard: { background: '#111', borderRadius: 12, padding: 20, marginBottom: 16 },
  msgHeader: { display: 'flex', gap: 16, alignItems: 'center', marginBottom: 8, flexWrap: 'wrap' },
  msgName: { color: '#fff', fontSize: 16 },
  msgEmail: { color: '#00ff88', fontSize: 13 },
  msgDate: { color: '#666', fontSize: 12, marginLeft: 'auto' },
  msgText: { color: '#ccc', lineHeight: 1.6, margin: '8px 0' },
  msgActions: { display: 'flex', gap: 8, marginTop: 12 },
  btnRead: { padding: '6px 14px', background: '#1a3a2a', border: '1px solid #00ff88', borderRadius: 6, color: '#00ff88', cursor: 'pointer', fontSize: 13 },
  btnReply: { padding: '6px 14px', background: '#1a2a3a', border: '1px solid #0088ff', borderRadius: 6, color: '#0088ff', cursor: 'pointer', fontSize: 13, textDecoration: 'none' },
  btnDelete: { padding: '6px 14px', background: '#3a1a1a', border: '1px solid #ff4444', borderRadius: 6, color: '#ff4444', cursor: 'pointer', fontSize: 13 },
  empty: { color: '#666', textAlign: 'center', padding: 40 },
  sectionTitle: { color: '#00ff88', marginBottom: 16 },
  barRow: { display: 'flex', alignItems: 'center', gap: 16, marginBottom: 12 },
  barLabel: { color: '#ccc', width: 150, fontSize: 14 },
  barBg: { flex: 1, background: '#1a1a1a', borderRadius: 4, height: 12 },
  barFill: { background: '#00ff88', height: 12, borderRadius: 4, transition: 'width 0.3s' },
  barCount: { color: '#00ff88', width: 30, textAlign: 'right', fontSize: 14 },
  recentRow: { display: 'flex', gap: 16, alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #1a1a1a' },
};
