import { useAuth } from '../context/AuthContext';

export default function Oldal2() {
  const { token } = useAuth();
  return (
    <div>
      <h1>Oldal2</h1>
      <p>Jelenlegi token: <strong>{token || 'Nincs megadva'}</strong></p>
    </div>
  );
}