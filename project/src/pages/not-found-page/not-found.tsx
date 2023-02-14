import {Helmet} from 'react-helmet-async';
import Header from '../../components/header/header';

function NotFoundPage(): JSX.Element {

  return (
    <div className="page">
      <Helmet>
        <title>Страница не найдена - 6 городов</title>
      </Helmet>
      <Header />

      <main className="page__main page__main--not-found">
        <section className="property">
          <div className="property__container container">
            <div className="property__wrapper">
              <div className="property__name-wrapper">
                <h1 className="property__name">
                  404 - Page not found
                </h1>
              </div>
            </div>
          </div>
          <section className="property__map map"></section>
        </section>
      </main>
    </div>
  );
}

export default NotFoundPage;
