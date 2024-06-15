import { FormEvent, useState } from 'react';
import { buttonCss } from '../../styles/button-css.tsx';
import { h2Css } from '../../styles/h2-css.tsx';
import { toast } from 'react-toastify';
import { isEmail } from 'validator';

export function Contato() {
  const [nameValue, setNameValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [assuntoValue, setAssuntoValue] = useState('');
  const [mensagemValue, setMensagemValue] = useState('');

  const sendMessage = (event: FormEvent) => {
    event.preventDefault();

    const error = [];

    if (nameValue.length < 2) error.push('Nome precisa ter no minimo 2 letras');
    if (!isEmail(emailValue)) error.push('Email inválido');
    if (assuntoValue.length === 0)
      error.push('Campo ASSUNTO não pode estar vázio');
    if (mensagemValue.length === 0)
      error.push('Campo MENSAGEM não pode estar vázio');

    if (error.length > 0) {
      error.map((item) => {
        toast.error(item);
      });

      return;
    }

    setNameValue('');
    setEmailValue('');
    setAssuntoValue('');
    setMensagemValue('');
    toast.success('Mensagem enviada');
  };

  return (
    <section id="contato" className="p-interface py-8">
      <h2 className={h2Css}>
        <span className="relative">
          Contate
          <span className="after:inline-block after:bg-mainColor after:w-full after:h-1 after:absolute after:left-0 after:bottom-0"></span>
        </span>
        -nos
      </h2>

      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="w-full bg-light-10% rounded p-4">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d1336.8866912239216!2d-76.15125002442069!3d43.04625897441761!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1spt-BR!2sbr!4v1717155476149!5m2!1spt-BR!2sbr"
            height="250"
            loading="lazy"
            className="w-full h-full"
            title="Mapa"
          ></iframe>
        </div>

        <form
          action="#"
          method="get"
          className="flex flex-col gap-3 items-center p-4 bg-light-10% rounded"
          onSubmit={(event) => sendMessage(event)}
        >
          <h3 className="font-bold text-xl lg:text-2xl">Entre em contato</h3>

          <label htmlFor="name" className="flex flex-col w-full ">
            <p>Nome:</p>
            <input
              type="text"
              name="name"
              id="name"
              value={nameValue}
              onChange={(event) => setNameValue(event.target.value)}
              className="mt-1 text-black border-0 rounded focus:ring-2 focus:ring-mainColor "
            />
          </label>

          <label htmlFor="email" className="flex flex-col w-full ">
            Email:
            <input
              type="email"
              name="email"
              id="email"
              value={emailValue}
              onChange={(event) => setEmailValue(event.target.value)}
              className="mt-1 text-black border-0 rounded focus:ring-2 focus:ring-mainColor "
            />
          </label>

          <label htmlFor="assunto" className="flex flex-col w-full ">
            Assunto:
            <input
              type="text"
              name="assunto"
              id="assunto"
              value={assuntoValue}
              onChange={(event) => setAssuntoValue(event.target.value)}
              className="mt-1 text-black border-0 rounded focus:ring-2 focus:ring-mainColor "
            />
          </label>

          <label htmlFor="mensagem" className="flex flex-col w-full ">
            Mensagem:
            <textarea
              name="mensagem"
              id="mensagem"
              value={mensagemValue}
              onChange={(event) => setMensagemValue(event.target.value)}
              className="mt-1 text-black border-0 rounded focus:ring-2 focus:ring-mainColor "
            ></textarea>
          </label>

          <button className={`${buttonCss}`} aria-labelledby="Mandar mensagem">
            Mandar mensagem
          </button>
        </form>
      </div>
    </section>
  );
}
