import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function Page404() {
  const navigate = useNavigate();
  const [timer, setTimer] = useState(5);

  const redirectTimer = setInterval(() => {
    if (timer > 0) {
      setTimer(timer - 1);
    } else {
      navigate('/');
      clearInterval(redirectTimer);
    }
  }, 1000);

  return (
    <main className="mt-16 h-screen flex flex-col justify-center items-center gap-4">
      <h1 className="font-bold text-6xl">Essa página não existe</h1>
      <p>Redirecionando para a Home em: {timer}</p>
    </main>
  );
}
