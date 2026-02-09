import { useAuth } from '../context/AuthContext';

export default function Home() {
  const { token, setToken, logout } = useAuth();

  return (
    <div>
      <h1>Főoldal</h1>
      <p>Jelenlegi token: <strong>{token || 'Nincs megadva'}</strong></p>
    </div>
  );
}