const BASE = 'https://portifolio-1-vzyn.onrender.com';

const headers = (token) => ({
  'Content-Type': 'application/json',
  ...(token ? { Authorization: `Bearer ${token}` } : {})
});

export const login = (email, password) =>
  fetch(`${BASE}/api/admin/login`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify({ email, password })
  }).then(r => r.json());

export const getMessages = (token) =>
  fetch(`${BASE}/api/contact`, { headers: headers(token) }).then(r => r.json());

export const getStats = (token) =>
  fetch(`${BASE}/api/stats`, { headers: headers(token) }).then(r => r.json());

export const markRead = (id, token) =>
  fetch(`${BASE}/api/contact/${id}/read`, {
    method: 'PATCH', headers: headers(token)
  }).then(r => r.json());

export const deleteMessage = (id, token) =>
  fetch(`${BASE}/api/contact/${id}`, {
    method: 'DELETE', headers: headers(token)
  }).then(r => r.json());
