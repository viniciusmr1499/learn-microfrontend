import React, { useEffect } from 'react';
import { GetServerSideProps } from 'next';
import { useState } from 'react';

const getToken = (await import('auth/GetToken')).default;

type User = {
  name: string;
  email: string;
};

const Dashboard: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    async function get() {
      const token = await getToken();
      if (token) {
        setUser(token.user);
      }
    }
    get();
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Nome: {user?.name}</p>
      <p>Email: {user?.email}</p>
    </div>
  );
};

export default Dashboard;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const token = await getToken(ctx);
  if (!token) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
