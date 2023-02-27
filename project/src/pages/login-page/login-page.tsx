import {Helmet} from 'react-helmet-async';
import { Navigate } from 'react-router-dom';

import { AuthorizationStatus, AppRoute } from '../../const';

import { useAppSelector } from '../../hooks';

import Header from '../../components/header/header';
import LoginForm from '../../components/login-form/login-form';
import RandomCity from '../../components/random-city/random-city';

function LoginPage(): JSX.Element {
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);

  if (authorizationStatus === AuthorizationStatus.Auth) {
    return (
      <Navigate to={AppRoute.Favorites} />
    );
  }

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

            <LoginForm />
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <RandomCity />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default LoginPage;
