import { destroyCookie } from 'nookies';

async function getToken(cxt?: any): Promise<void> {
  destroyCookie(cxt, '@AUTH/token');
}

export default getToken;
