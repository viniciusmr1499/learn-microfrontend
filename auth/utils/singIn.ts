import { singInRequest } from '../services/auth';
import { setCookie } from 'nookies';

type User = {
  name: string;
  email: string;
};

type ReturnSingIn = {
  token: string;
  user: User;
};

type SingInData = {
  email: string;
  password: string;
};

async function singIn({ email, password }: SingInData): Promise<ReturnSingIn> {
  const { token, user } = await singInRequest({
    email,
    password,
  });

  setCookie(undefined, '@AUTH/token', token, {
    maxAge: 60 * 60 * 1, // 1 hour
  });

  return {
    token,
    user,
  };
}

export default singIn;
