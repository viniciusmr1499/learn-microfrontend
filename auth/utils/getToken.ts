import { parseCookies } from 'nookies';
import { recoverUserInformation } from '../services/auth';

type User = {
  name: string;
  email: string;
};

type ReturnGetToken = {
  token: string;
  user: User;
};

async function getToken(cxt?: any): Promise<ReturnGetToken | undefined> {
  const { '@AUTH/token': token } = parseCookies(cxt);

  if (token) {
    const { token, user } = await recoverUserInformation();
    return {
      token,
      user,
    };
  }

  return undefined;
}

export default getToken;
