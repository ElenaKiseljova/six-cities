import {Helmet} from 'react-helmet-async';
import { Link } from 'react-router-dom';

import Header from '../../components/header/header';

function NotFoundPage(): JSX.Element {
  return (
    <div className="page page--gray page--login">
      <Helmet>
        <title>Страница не найдена - 6 городов</title>
      </Helmet>
      <Header />

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">404</h1>
            <p>Page not found</p>
            <div className="login__form form">
              <Link to="/" className="login__submit form__submit button" type="submit">Back to Main</Link>
            </div>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <a className="locations__item-link" href="#top">
                <span>Amsterdam</span>
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default NotFoundPage;

