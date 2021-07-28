import { v4 as uuid } from 'uuid';

type SingInRequestData = {
  email: string;
  password: string;
};

const delay = (amount = 750) =>
  new Promise((resolve) => setTimeout(resolve, amount));

export async function singInRequest(data: SingInRequestData) {
  await delay();

  return {
    token: uuid(),
    user: {
      name: 'Ruan Aragão',
      email: 'aragao.ruan@gmail.com',
    },
  };
}

export async function recoverUserInformation() {
  await delay();

  return {
    token: uuid(),
    user: {
      name: 'Ruan Aragão',
      email: 'aragao.ruan@gmail.com',
    },
  };
}
