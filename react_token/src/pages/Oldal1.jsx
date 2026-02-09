import { useAuth } from '../context/AuthContext';

export default function Oldal1() {
  const { token } = useAuth();
  return (
    <div>
      <h1>Oldal1</h1>
      <p>Jelenlegi token: <strong>{token || 'Nincs megadva'}</strong></p>
    </div>
  );
}

