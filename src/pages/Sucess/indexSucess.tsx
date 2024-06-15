import { useEffect } from 'react';

export function Sucess() {
  // Remove o scrollY quando a página é aberta
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="mt-16 h-screen flex justify-center items-center">
      <div className="flex flex-col gap-4 items-center">
        <svg
          stroke="currentColor"
          fill="currentColor"
          stroke-width="0"
          viewBox="0 0 448 512"
          className="bg-green-500 rounded-full text-9xl p-4"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"></path>
        </svg>
        <p className="text-3xl">Compra realizada com sucesso</p>
      </div>
    </main>
  );
}
