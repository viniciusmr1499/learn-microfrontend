import React, { createContext, useState, useEffect } from 'react';
import { recoverUserInformation, singInRequest } from '../services/auth';
import { setCookie, parseCookies } from 'nookies';

type User = {
  name: string;
  email: string;
};

type ReturnSingIn = {
  token: string;
  user: User;
};

type AuthContextType = {
  user: User;
  isAuthenticated: boolean;
  singIn: (data: SingInData) => Promise<ReturnSingIn>;
};

type SingInData = {
  email: string;
  password: string;
};

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }) {
  const [user, setUser] = useState<User | null>(null);

  const isAuthenticated = !!user;

  useEffect(() => {
    const { '@AUTH/token': token } = parseCookies();

    if (token) {
      recoverUserInformation().then((response) => setUser(response.user));
    }
  }, []);

  async function singIn({
    email,
    password,
  }: SingInData): Promise<ReturnSingIn> {
    const { token, user } = await singInRequest({
      email,
      password,
    });

    setCookie(undefined, '@AUTH/token', token, {
      maxAge: 60 * 60 * 1, // 1 hour
    });

    setUser(user);

    return {
      token,
      user,
    };
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, singIn }}>
      {children}
    </AuthContext.Provider>
  );
}
