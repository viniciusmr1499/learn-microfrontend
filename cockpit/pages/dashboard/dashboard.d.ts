/// <reference types="react" />

type User = {
  name: string;
  email: string;
};

type ReturnSingIn = {
  token: string;
  user: User;
};

declare module 'auth/GetToken' {
  export default function getToken(
    cxt?: any
  ): Promise<ReturnSingIn | undefined>;
}
declare module 'auth/LogOut' {
  export default function logOut(cxt?: any): Promise<void>;
}
