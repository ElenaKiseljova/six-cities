import { useRef, FormEvent } from 'react';
import {Helmet} from 'react-helmet-async';
import { Link, Navigate } from 'react-router-dom';
import {toast} from 'react-toastify';

import { AuthorizationStatus, AppRoute, CITIES } from '../../const';

import {TAuthData} from '../../types/auth-data';

import { useAppSelector, useAppDispatch } from '../../hooks';

import {loginAction} from '../../store/api-actions';
// import { processErrorHandle } from '../../services/process-error-handle';

import Header from '../../components/header/header';

const isValidField = (field: HTMLInputElement | null): boolean => {
  if (field === null) {
    return false;
  }

  const lowerCaseLetters = /[a-z]/g;
  const upperCaseLetters = /[A-Z]/g;
  const numbers = /[0-9]/g;
  const symbolsOn = /[!@#$%^&*]/g;

  const {type, value} = field;

  switch (type) {
    case 'email':
      return /([A-Za-z0-9_])+@([A-Za-z0-9_])+\.([A-Za-z]{2,})/g.test(value);

    case 'password':
      return (
        value.length > 6 &&
        lowerCaseLetters.test(value) &&
        upperCaseLetters.test(value) &&
        numbers.test(value) &&
        symbolsOn.test(value)
      );

    default:
      return false;
  }
};

const getRandomCity = () => CITIES[Math.abs(Math.floor(Math.random() * CITIES.length) - 1)];

function LoginPage(): JSX.Element {
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);

  const dispatch = useAppDispatch();

  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  if (authorizationStatus === AuthorizationStatus.Auth) {
    return (
      <Navigate to={AppRoute.Favorites} />
    );
  }

  const city = getRandomCity();

  const onSubmit = (authData: TAuthData) => {
    dispatch(loginAction(authData));
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (
      loginRef.current !== null &&
      isValidField(loginRef.current) &&
      passwordRef.current !== null &&
      isValidField(passwordRef.current)
    ) {
      onSubmit({
        login: loginRef.current.value,
        password: passwordRef.current.value,
      });
    } else {
      // processErrorHandle('Email or password incorrect');
      toast.warn('Email or password incorrect');
    }
  };

  return (
    <div className="page page--gray page--login">
      <Helmet>
        <title>Login - 6 cities</title>
      </Helmet>
      <Header />

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form
              className="login__form form"
              action="#" method="post"
              onSubmit={handleSubmit}
            >
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input
                  className="login__input form__input"
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                  ref={loginRef}
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input
                  className="login__input form__input"
                  type="password"
                  name="password"
                  placeholder="Password"
                  title='Password must have more than 6 characters and contain: uppercase letter, number and some of spetisl chars !@#$%^&*'
                  required
                  ref={passwordRef}
                />
              </div>
              <button
                title='Enter something in the fields "Login" and "Password" to enter the site'
                className="login__submit form__submit button"
                type="submit"
              >
                Sign in
              </button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <Link className="locations__item-link" to={`${AppRoute.Root}${city.name}`}>
                <span>{city.name}</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default LoginPage;
