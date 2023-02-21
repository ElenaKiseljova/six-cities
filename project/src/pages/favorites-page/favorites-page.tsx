import {Helmet} from 'react-helmet-async';

import { ICurUser } from '../../types/user';
import { TPlaceCardByCity } from '../../types/offers';

import Header from '../../components/header/header';
import PlaceCard from '../../components/place-card/place-card';

type TFavoritesPageProps = {
  user: ICurUser;
}

function FavoritesPage(props: TFavoritesPageProps): JSX.Element {
  const {user} = props;

  const favoritesPlaceCards = user.favorites || [];
  const favoritesPlaceCardsByCity: TPlaceCardByCity = {};

  if (favoritesPlaceCards && Array.isArray(favoritesPlaceCards)) {
    favoritesPlaceCards.forEach((favoritesPlaceCard) => {
      if (typeof favoritesPlaceCard.city === 'string') {
        if (Array.isArray(favoritesPlaceCardsByCity[favoritesPlaceCard.city])) {
          favoritesPlaceCardsByCity[favoritesPlaceCard.city].push(favoritesPlaceCard);
        } else {
          favoritesPlaceCardsByCity[favoritesPlaceCard.city] = [favoritesPlaceCard];
        }
      }
    });
  }

  return (
    <div className={`page ${favoritesPlaceCards.length > 0 ? '' : 'page--favorites-empty'}`}>
      <Helmet>
        <title>Favorites offers - 6 cities</title>
      </Helmet>
      <Header />

      <main className={`page__main page__main--favorites ${favoritesPlaceCards.length > 0 ? '' : 'page__main--favorites-empty'}`}>
        <div className="page__favorites-container container">
          <section className={`favorites ${favoritesPlaceCards.length > 0 ? '' : 'favorites--empty'}`}>
            {favoritesPlaceCards.length > 0 &&
              <>
                <h1 className="favorites__title">Saved listing</h1>
                <ul className="favorites__list">
                  {
                    Object.keys(favoritesPlaceCardsByCity).map((city, index) => (
                      <li key={city} className="favorites__locations-items">
                        <div className="favorites__locations locations locations--current">
                          <div className="locations__item">
                            <a className="locations__item-link" href="#top">
                              <span>{city}</span>
                            </a>
                          </div>
                        </div>
                        <div className="favorites__places">
                          {
                            Object.values(favoritesPlaceCardsByCity)[index].map((card) => (
                              <PlaceCard
                                key={card.id}
                                sectionName='favorites'
                                data={card}
                              />
                            ))
                          }
                        </div>
                      </li>
                    ))
                  }
                </ul>
              </>}

            {favoritesPlaceCards.length === 0 &&
              <>
                <h1 className="visually-hidden">Favorites (empty)</h1>
                <div className="favorites__status-wrapper">
                  <b className="favorites__status">Nothing yet saved.</b>
                  <p className="favorites__status-description">Save properties to narrow down search or plan your future trips.</p>
                </div>
              </>}
          </section>
        </div>
      </main>
      <footer className="footer container">
        <a className="footer__logo-link" href="main.html">
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33" />
        </a>
      </footer>
    </div>
  );
}

export default FavoritesPage;
