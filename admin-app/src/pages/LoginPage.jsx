import { useState } from 'react';

export default function LoginPage({ onLogin }) {
  const [email, setEmail] = useState('eugene@gmail.com');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const result = await onLogin(email, password);
    if (!result.success) setError(result.error || 'Login failed');
    setLoading(false);
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.avatar}>NE</div>
        <h1 style={styles.title}>NIYONSABA Eugene</h1>
        <p style={styles.sub}>Portfolio Admin Panel</p>
        <form onSubmit={handleSubmit}>
          <input style={styles.input} type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
          <input style={styles.input} type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
          {error && <p style={styles.error}>{error}</p>}
          <button style={styles.btn} type="submit" disabled={loading}>
            {loading ? 'Signing in...' : '🔐 Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  container: { minHeight: '100vh', background: '#0a0a0a', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  card: { background: '#111', border: '1px solid #1a3a2a', borderRadius: 16, padding: 40, width: 360, textAlign: 'center' },
  avatar: { width: 64, height: 64, borderRadius: '50%', background: '#00ff88', color: '#000', fontSize: 24, fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' },
  title: { color: '#fff', fontSize: 20, margin: '0 0 4px', fontFamily: 'Georgia, serif' },
  sub: { color: '#666', fontSize: 13, margin: '0 0 24px' },
  input: { width: '100%', padding: '12px 16px', margin: '8px 0', background: '#1a1a1a', border: '1px solid #333', borderRadius: 8, color: '#fff', fontSize: 14, boxSizing: 'border-box' },
  error: { color: '#ff4444', fontSize: 13, margin: '8px 0' },
  btn: { width: '100%', padding: '14px', marginTop: 16, background: '#00ff88', color: '#000', border: 'none', borderRadius: 8, fontSize: 16, fontWeight: 'bold', cursor: 'pointer' }
};
