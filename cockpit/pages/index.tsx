import { GetServerSideProps } from 'next';
import React from 'react';

export default function Cockpit() {
  return <div />;
}

// export const getServerSideProps: GetServerSideProps = async (ctx) => {
//   return {
//     redirect: {
//       destination: '/login',
//       permanent: false,
//     },
//   };
// };
