import React from 'react';
import { useForm } from 'react-hook-form';
import Router from 'next/router';
import { GetServerSideProps } from 'next';

const singIn = (await import('auth/SingIn')).default;
const getToken = (await import('auth/GetToken')).default;

type FormSingIn = {
  email: string;
  password: string;
};

const Login: React.FC = () => {
  const { register, handleSubmit } = useForm();
  async function handleSignIn(data: FormSingIn) {
    const { token } = await singIn(data);

    if (token) {
      Router.push('/dashboard');
    }
  }
  return (
    <>
      <form onSubmit={handleSubmit(handleSignIn)} className="box">
        <h1 className="b__title">Login</h1>
        <div className="txtb">
          <input
            {...register('email')}
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            required
          />
        </div>

        <div className="txtb">
          <input
            {...register('password')}
            type="password"
            name="password"
            id="passwordl"
            placeholder="password"
            required
          />
        </div>

        <button type="submit" className="btn__customized">
          Entrar
        </button>
      </form>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const token = await getToken(ctx);
  if (token) {
    return {
      redirect: {
        destination: '/dashboard',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default Login;
