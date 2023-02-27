import {Helmet} from 'react-helmet-async';
import { Link, Navigate } from 'react-router-dom';

import { AuthorizationStatus, AppRoute, CITIES } from '../../const';

import { useAppSelector } from '../../hooks';

import Header from '../../components/header/header';
import LoginForm from '../../components/login-form/login-form';

const getRandomCity = () => CITIES[Math.abs(Math.floor(Math.random() * CITIES.length) - 1)];

function LoginPage(): JSX.Element {
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);

  if (authorizationStatus === AuthorizationStatus.Auth) {
    return (
      <Navigate to={AppRoute.Favorites} />
    );
  }

  const city = getRandomCity();

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
