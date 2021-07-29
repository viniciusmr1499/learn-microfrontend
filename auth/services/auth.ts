import { parseCookies } from 'nookies';
import { v4 as uuid } from 'uuid';

type SingInRequestData = {
  email: string;
  password: string;
};

type RecoverUserInformation = {
  cxt?: any;
  token: string;
};

const delay = (amount = 750) =>
  new Promise((resolve) => setTimeout(resolve, amount));

export async function singInRequest({ email }: SingInRequestData) {
  await delay();

  return {
    token: uuid(),
    user: {
      name: 'Ruan Aragão',
      email,
    },
  };
}

export async function recoverUserInformation({
  cxt,
  token,
}: RecoverUserInformation) {
  await delay();

  const { '@AUTH/user': user } = parseCookies(cxt);

  if (user) {
    const userParse = JSON.parse(user);
    return {
      token: token,
      user: {
        name: 'Ruan Aragão',
        email: userParse.email,
      },
    };
  }
}
