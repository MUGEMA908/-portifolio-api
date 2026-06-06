import { useAuth } from './hooks/useAuth';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';

export default function App() {
  const { token, admin, avatarLetter, login, logout, isLoggedIn } = useAuth();

  return isLoggedIn
    ? <DashboardPage token={token} admin={admin} avatarLetter={avatarLetter} onLogout={logout} />
    : <LoginPage onLogin={login} />;
}
