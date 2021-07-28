import React from 'react';

// import dynamic from 'next/dynamic';

// const Nav = dynamic(() => import('auth/Nav'));

const Nav = (await import('auth/Nav')).default;
const add = (await import('auth/add')).default;

export default function Cockpit() {
  console.log(add(2, 3));
  return (
    <div>
      <Nav />

      <h1>wekjbgeilwubgf</h1>
    </div>
  );
}
