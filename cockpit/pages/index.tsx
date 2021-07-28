import { Suspense, lazy, useState, useEffect } from 'react';
const Nav = lazy(() => import('auth/Nav'));

export default function Cockpit() {
  const [isFront, setIsFront] = useState(false);

  useEffect(() => {
    process.nextTick(() => {
      if (globalThis.window ?? false) {
        setIsFront(true);
      }
    });
  }, []);

  if (!isFront) return null;

  return (
    <div>
      <Suspense fallback="nav">
        <Nav />
      </Suspense>
      <h1>Cockpit</h1>
    </div>
  );
}
