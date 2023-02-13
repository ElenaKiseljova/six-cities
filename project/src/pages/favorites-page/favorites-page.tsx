import { TPlaceCard, TPlaceCardByCity } from '../../types';

import Header from '../../components/header/header';
import PlaceCard from '../../components/place-card/place-card';

const favoritesPlaceCards: TPlaceCard[] = [
  {
    id: '1',
    isPremium: true,
    image: 'img/apartment-01.jpg',
    price: 120,
    rating: 80,
    title: 'Beautiful & luxurious apartment at great location',
    type: 'Apartment',
    inBookmarks: true,
    city: 'Amsterdam',
  },
  {
    id: '2',
    isPremium: false,
    image: 'img/room.jpg',
    price: 80,
    rating: 50,
    title: 'Wood and stone place',
    type: 'Private room',
    inBookmarks: true,
    city: 'Amsterdam',
  },
  {
    id: '3',
    isPremium: false,
    image: 'img/apartment-03.jpg',
    price: 132,
    rating: 80,
    title: 'Canal View Prinsengracht',
    type: 'Apartment',
    inBookmarks: true,
    city: 'Amsterdam',
  },
  {
    id: '4',
    isPremium: true,
    image: 'img/apartment-02.jpg',
    price: 180,
    rating: 100,
    title: 'Nice, cozy, warm big bed apartment',
    type: 'Apartment',
    inBookmarks: true,
    city: 'Cologne',
  },
  {
    id: '5',
    isPremium: false,
    image: 'img/room.jpg',
    price: 80,
    rating: 80,
    title: 'Wood and stone place',
    type: 'Private room',
    inBookmarks: true,
    city: 'Amsterdam',
  },
];

const favoritesPlaceCardsByCity: TPlaceCardByCity = {};

favoritesPlaceCards.forEach((favoritesPlaceCard) => {
  if (typeof favoritesPlaceCard.city === 'string') {
    if (Array.isArray(favoritesPlaceCardsByCity[favoritesPlaceCard.city])) {
      favoritesPlaceCardsByCity[favoritesPlaceCard.city].push(favoritesPlaceCard);
    } else {
      favoritesPlaceCardsByCity[favoritesPlaceCard.city] = [favoritesPlaceCard];
    }
  }
});

function FavoritesPage(): JSX.Element {
  return (
    <div className={favoritesPlaceCards.length > 0 ? 'page' : 'page page--favorites-empty'}>
      <Header />

      <main className={favoritesPlaceCards.length > 0 ? 'page__main page__main--favorites' : 'page__main page__main--favorites page__main--favorites-empty'}>
        <div className="page__favorites-container container">
          <section className={favoritesPlaceCards.length > 0 ? 'favorites' : 'favorites favorites--empty'}>
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
                              <PlaceCard key={card.id} sectionName='favorites' data={card} />
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
