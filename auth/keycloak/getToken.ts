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
    const userInformation = await recoverUserInformation({ cxt, token });
    if (userInformation) {
      return {
        token,
        user: userInformation.user,
      };
    }
  }

  return undefined;
}

export default getToken;
