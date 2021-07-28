import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

export default function Auth() {
  const { singIn, isAuthenticated } = useContext(AuthContext);

  singIn({ email: 'aragao.ruan@gmail.com', password: '123123' });

  return (
    <h1>Hello world</h1>
  );
}
