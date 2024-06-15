import React, { useContext, useEffect, useState } from 'react';
import { GlobalStateContext } from '../../components/globalState/globalState.tsx';
import { buttonCss } from '../../styles/button-css.tsx';
import { labelCSS } from '../../styles/label-css.tsx';
import { inputCSS } from '../../styles/input-css.tsx';
import { toast } from 'react-toastify';
import isEmail from 'validator/lib/isEmail';
import { useNavigate } from 'react-router-dom';

export function Payment() {
  const context = useContext(GlobalStateContext);

  if (!context) {
    throw new Error('Header must be used within a GlobalStateProvider');
  }

  const { cartList, setCartList, totalPrice } = context;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [birthday, setBirthday] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('pix');
  const [nameCredit, setNameCredit] = useState('');
  const [numberCredit, setNumberCredit] = useState('');
  const [creditExpiration, setCreditExpiration] = useState('');
  const [securityCode, setSecurityCode] = useState('');

  const navigate = useNavigate();

  const paymentFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!validateForm()) return;
    if (cartList.length === 0) {
      toast.error('Carrinho está vázio');
      return;
    }
    navigate('/sucess');
    setCartList([]);
  };

  const validateForm = () => {
    const errorList = [];

    if (name.length < 2) errorList.push('NOME precisa ter no mínimo 2 letras');
    if (!isEmail(email)) errorList.push('EMAIL inválido');
    if (phone.length < 11)
      errorList.push('TELEFONE precisa ter no mímino 11 dígitos');
    if (address.length === 0) errorList.push('ENDEREÇO não pode estar vázio');
    if (city.length === 0) errorList.push('CIDADE não pode estar vázio');
    if (birthday.length === 0)
      errorList.push('DATA DE NASCIMENTO não pode estar vázio');

    if (paymentMethod === 'credito') {
      if (nameCredit.length === 0)
        errorList.push('NOME NO CARTÃO não pode estar vázio');
      if (numberCredit.length === 0)
        errorList.push('NUMERO DO CARTÃO não pode estar vázio');
      if (creditExpiration.length === 0)
        errorList.push('DATA DE EXPIRAÇÃO não pode estar vázio');
      if (securityCode.length === 0)
        errorList.push('CÓDIGO DE SEGURANÇA não pode estar vázio');
    }

    if (errorList.length > 0) {
      errorList.map((error) => {
        toast.error(error);
      });

      return;
    }

    return true;
  };

  // Remove o scrollY quando a página é aberta
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="mt-24 mb-8 h-auto flex items-center justify-center">
      <form
        action="#"
        method="get"
        className="flex flex-col gap-4 p-4 bg-light-10% rounded w-1/2 min-w-64 max-w-lg"
        onSubmit={(event) => {
          paymentFormSubmit(event);
        }}
      >
        <h1 className="font-bold text-2xl text-center">Pagamento</h1>

        <label htmlFor="name" className="flex flex-col w-full gap-1">
          Nome completo:
          <input
            type="text"
            name="name"
            id="name"
            required
            value={name}
            onChange={(event) => setName(event.target.value)}
            className={inputCSS}
          />
        </label>

        <label htmlFor="email" className={labelCSS}>
          Email:
          <input
            type="email"
            name="email"
            id="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className={inputCSS}
          />
        </label>

        <div className="grid grid-cols-1 gap-4 w-full lg:grid-cols-2">
          <label htmlFor="telefone" className={labelCSS}>
            Telefone:
            <input
              type="tel"
              name="telefone"
              id="telefone"
              placeholder="(DDD) 9xxxx-xxxx "
              required
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              className={inputCSS}
            />
          </label>

          <label htmlFor="endereco" className={labelCSS}>
            Endereço:
            <input
              type="text"
              name="endereco"
              id="endereco"
              required
              value={address}
              onChange={(event) => setAddress(event.target.value)}
              className={inputCSS}
            />
          </label>

          <label htmlFor="cidade" className={labelCSS}>
            Cidade:
            <input
              type="text"
              name="cidade"
              id="cidade"
              required
              value={city}
              onChange={(event) => setCity(event.target.value)}
              className={inputCSS}
            />
          </label>

          <label htmlFor="nascimento" className={labelCSS}>
            Data de nascimento:
            <input
              type="date"
              name="nascimento"
              id="nascimento"
              required
              value={birthday}
              onChange={(event) => setBirthday(event.target.value)}
              className={inputCSS}
            />
          </label>
        </div>

        <label htmlFor="pagamento" className={labelCSS}>
          Formas de pagamento:
          <select
            name="pagamento"
            id="pagamento"
            className={inputCSS}
            onChange={(event) => setPaymentMethod(event.target.value)}
          >
            <option value="pix">Pix</option>
            <option value="boleto">Boleto</option>
            <option value="credito">Crédito</option>
          </select>
        </label>

        {paymentMethod === 'credito' && (
          <>
            <label htmlFor="nome-cartao" className={labelCSS}>
              Nome no cartão:
              <input
                type="text"
                name="nome-cartao"
                id="nome-cartao"
                required
                value={nameCredit}
                onChange={(event) => setNameCredit(event.target.value)}
                className={inputCSS}
              />
            </label>

            <label htmlFor="num-cartao" className={labelCSS}>
              Numero do cartão
              <input
                type="text"
                name="num-cartao"
                id="num-cartao"
                required
                value={numberCredit}
                onChange={(event) => setNumberCredit(event.target.value)}
                className={inputCSS}
              />
            </label>

            <div className="flex flex-col gap-4 w-full lg:flex-row">
              <label htmlFor="expiracao" className={labelCSS}>
                Data de expiração:
                <input
                  type="text"
                  name="expiracao"
                  id="expiracao"
                  required
                  value={creditExpiration}
                  onChange={(event) => setCreditExpiration(event.target.value)}
                  className={inputCSS}
                />
              </label>

              <label htmlFor="cod-seguranca" className={labelCSS}>
                Código de seguranca {'(CVC)'}:
                <input
                  type="text"
                  name="seguranca"
                  id="seguranca"
                  required
                  value={securityCode}
                  onChange={(event) => setSecurityCode(event.target.value)}
                  className={inputCSS}
                />
              </label>
            </div>
          </>
        )}

        <p>
          Total: <span className="font-bold">${totalPrice}</span>
        </p>
        <button
          type="submit"
          aria-labelledby="Finalizar compra"
          className={buttonCss}
        >
          Finalizar compra
        </button>
      </form>
    </main>
  );
}
