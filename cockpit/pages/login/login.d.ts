/// <reference types="react" />

type User = {
  name: string;
  email: string;
};

type SingInData = {
  email: string;
  password: string;
};

type ReturnSingIn = {
  token: string;
  user: User;
};

declare module 'auth/SingIn' {
  export default function add(data: SingInData): Promise<ReturnSingIn>;
}
