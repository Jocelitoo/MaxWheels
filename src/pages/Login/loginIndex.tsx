import { FormEvent, useEffect, useState } from 'react';
import { buttonCss } from '../../styles/button-css.tsx';
import { isEmail } from 'validator';
import { toast } from 'react-toastify';
import bcrypt from 'bcryptjs';
import { User } from '../../protocols/user.tsx';
import { useLocation, useNavigate } from 'react-router-dom';

import { useContext } from 'react';
import { GlobalStateContext } from '../../components/globalState/globalState.tsx';
import { labelCSS } from '../../styles/label-css.tsx';
import { inputCSS } from '../../styles/input-css.tsx';

export function Login() {
  const context = useContext(GlobalStateContext);

  if (!context) {
    throw new Error('Header must be used within a GlobalStateProvider');
  }

  const { logged, action, setAction } = context;

  const [status, setStatus] = useState('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigate = useNavigate();
  const prevPath = useLocation().state || '/'; // Pega o state enviado para a rota /login que é a URL da página que o usuário estava antes de ir para a página de login. Se for "/", é pq o usuário clicou no btn pra fazer login. Se for outro link é pq o usuário clicou em algo que precisava estar logado para acessar e foi levado para a página de login, se estiver null é pq o usuário registrou a conta e foi redirecionado pra página de login então receberá '/'

  useEffect(() => {
    if (logged) navigate(prevPath);
  }, [prevPath, logged, navigate]);

  const createAccount = async (event: FormEvent) => {
    event.preventDefault();

    if (invalidForm()) return;
    if (userExist()) return;

    // Criptografar password
    const criptografedPassword = await bcrypt.hash(password, 8); // reqPasswordHash ira receber o reqPassword  no formato "decodificado". Não utilize um valor de salt tão alto pra n gastar muito poder de processamento do servidor, prefira entre 8 e 10

    const newUser = {
      name: name,
      email: email,
      password: criptografedPassword,
    };

    if (localStorage.getItem('users')) {
      const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));
      setStatus('login');
    } else {
      const users = [newUser];
      localStorage.setItem('users', JSON.stringify(users));
      setStatus('login');
    }

    toast.success('Conta criada');
    setName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };

  const invalidForm = () => {
    const errorList: string[] = [];

    // Verificar erro no formulário
    if (name.length < 2)
      errorList.push('Campo NOME precisa ter no mínimo 2 caracteres');

    if (!isEmail(email)) errorList.push('Email inválido');

    if (password.length < 6)
      errorList.push('Senha precisa ter no mínimo 6 caracteres');

    if (password !== confirmPassword) errorList.push('Senhas diferentes');

    if (errorList.length > 0) {
      errorList.map((error) => {
        toast.error(error);
      });

      return true;
    }

    return false;
  };

  const userExist = () => {
    const errorList: string[] = [];

    // Verificar se nome ou email já está em uso na base de dados
    if (localStorage.getItem('users')) {
      const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');

      users.map((user) => {
        // Pega cada usuário individualmente e verifica o nome e email
        if (user.name === name) errorList.push('Esse nome já está sendo usado');
        if (user.email === email)
          errorList.push('Esse email já está sendo usado');
      });
    }

    if (errorList.length > 0) {
      errorList.map((error) => {
        toast.error(error);
      });

      return true;
    }

    return false;
  };

  const enterAccount = async (event: FormEvent) => {
    event.preventDefault();

    // Verificar se o valor digitado está correto
    const errorList = [];

    if (!isEmail(email)) errorList.push('Email inválido');
    if (password.length < 6)
      errorList.push('Senha precisa ter no minimo 6 caracteres');

    if (errorList.length > 0) {
      errorList.map((error) => toast.error(error));
      return;
    }

    // Verificar se existe na bd usuário com o email e se a password está correta
    if (localStorage.getItem('users')) {
      const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');

      // Verificar se existe algum usuário com o email digitado
      const user = users.find((user) => user.email === email);

      // Verificar se a senha está correta
      if (user) {
        if (await bcrypt.compare(password, user?.password)) {
          sessionStorage.setItem('loggedUser', JSON.stringify(user));
          setAction(action + 1);
          navigate('/');
          toast.success('Logado(a) com sucesso');
        } else {
          toast.error('Email ou senha incorretos');
        }
      } else {
        toast.error('Email ou senha incorretos');
      }
    } else {
      toast.error('Email ou senha incorretos');
    }
  };

  // Remove o scrollY quando a página é aberta
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="mt-16 h-screen flex items-center justify-center">
      <form
        action="#"
        method="get"
        className="flex flex-col gap-4 p-4 bg-light-10% rounded items-center my-16 w-2/4 min-w-64 max-w-md"
      >
        <h1 className="font-bold text-2xl text-center">
          {status === 'login' ? 'Login' : 'Registrar-se'}
        </h1>

        {status === 'register' && (
          <label htmlFor="name" className={labelCSS}>
            Nome:
            <input
              type="text"
              name="name"
              id="name"
              required
              value={name}
              className={inputCSS}
              onChange={(event) => setName(event.target.value)}
            />
          </label>
        )}

        <label htmlFor="email" className={labelCSS}>
          Email:
          <input
            type="email"
            name="email"
            id="email"
            required
            value={email}
            className={inputCSS}
            onChange={(event) => setEmail(event.target.value)}
          />
        </label>

        <label htmlFor="password" className={labelCSS}>
          Senha:
          <input
            type="password"
            name="password"
            id="password"
            required
            value={password}
            className={inputCSS}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>

        {status === 'register' && (
          <label htmlFor="confirm-password" className={labelCSS}>
            Confirmar senha:
            <input
              type="password"
              name="confirm-password"
              id="confirm-password"
              required
              value={confirmPassword}
              className={inputCSS}
              onChange={(event) => setConfirmPassword(event.target.value)}
            />
          </label>
        )}

        {status === 'login' ? (
          <button
            type="submit"
            aria-labelledby="Login"
            className={buttonCss}
            onClick={(event) => enterAccount(event)}
          >
            Login
          </button>
        ) : (
          <button
            type="submit"
            aria-label="Registrar-se"
            className={buttonCss}
            onClick={(event) => createAccount(event)}
          >
            Registrar-se
          </button>
        )}

        {status === 'login' ? (
          <p>
            Não tem uma conta ?{' '}
            <button
              type="button"
              aria-labelledby="Criar agora"
              className="text-purple-900"
              onClick={() => {
                setStatus('register');
                setEmail('');
                setPassword('');
              }}
            >
              Crie agora
            </button>
          </p>
        ) : (
          <p>
            Já tem uma conta ?{' '}
            <button
              type="button"
              aria-label="Entrar"
              className="text-purple-900"
              onClick={() => {
                setStatus('login');
                setName('');
                setEmail('');
                setPassword('');
                setConfirmPassword('');
              }}
            >
              Entrar
            </button>
          </p>
        )}
      </form>
    </main>
  );
}
