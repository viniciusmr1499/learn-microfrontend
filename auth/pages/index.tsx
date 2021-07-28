import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

export default function Auth() {
  const { singIn, isAuthenticated } = useContext(AuthContext);

  singIn({ email: 'aragao.ruan@gmail.com', password: '123123' });

  return (
    <div>
      <h1>Auth</h1>
    </div>
  );
}
