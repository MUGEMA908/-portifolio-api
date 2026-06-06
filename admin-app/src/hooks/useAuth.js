import { useState } from 'react';
import { login as apiLogin } from '../api';

export function useAuth() {
  const [token, setToken] = useState(() => sessionStorage.getItem('ne_token') || '');
  const [admin, setAdmin] = useState(() => {
    const a = sessionStorage.getItem('ne_admin');
    return a ? JSON.parse(a) : null;
  });

  const avatarLetter = admin?.name?.[0]?.toUpperCase() || 'N';

  const login = async (email, password) => {
    const data = await apiLogin(email, password);
    if (data.token) {
      sessionStorage.setItem('ne_token', data.token);
      sessionStorage.setItem('ne_admin', JSON.stringify(data.admin));
      setToken(data.token);
      setAdmin(data.admin);
      return { success: true };
    }
    return { success: false, error: data.error };
  };

  const logout = () => {
    sessionStorage.removeItem('ne_token');
    sessionStorage.removeItem('ne_admin');
    setToken('');
    setAdmin(null);
  };

  return { token, admin, avatarLetter, login, logout, isLoggedIn: !!token };
}
