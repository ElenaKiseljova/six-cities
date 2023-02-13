import { TPlaceCard } from '../../types';
import Header from '../../components/header/header';
import PlaceCard from '../../components/place-card/place-card';

type TMainPageProps = {
  placesCount: number;
}

const citiesPlaceCards: TPlaceCard[] = [
  {
    id: '1',
    isPremium: true,
    image: 'img/apartment-01.jpg',
    price: 120,
    rating: 80,
    title: 'Beautiful & luxurious apartment at great location',
    type: 'Apartment',
    inBookmarks: false,
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
    inBookmarks: false,
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
    inBookmarks: false,
    city: 'Amsterdam',
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


function MainPage(props: TMainPageProps): JSX.Element {
  const { placesCount } = props;

  return (
    <div className="page page--gray page--main">
      <Header />

      <main className={placesCount > 0 ? 'page__main page__main--index' : 'page__main page__main--index page__main--index-empty'}>
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <ul className="locations__list tabs__list">
              <li className="locations__item">
                <a className="locations__item-link tabs__item" href="#top">
                  <span>Paris</span>
                </a>
              </li>
              <li className="locations__item">
                <a className="locations__item-link tabs__item" href="#top">
                  <span>Cologne</span>
                </a>
              </li>
              <li className="locations__item">
                <a className="locations__item-link tabs__item" href="#top">
                  <span>Brussels</span>
                </a>
              </li>
              <li className="locations__item">
                <a className="locations__item-link tabs__item tabs__item--active" href="#top">
                  <span>Amsterdam</span>
                </a>
              </li>
              <li className="locations__item">
                <a className="locations__item-link tabs__item" href="#top">
                  <span>Hamburg</span>
                </a>
              </li>
              <li className="locations__item">
                <a className="locations__item-link tabs__item" href="#top">
                  <span>Dusseldorf</span>
                </a>
              </li>
            </ul>
          </section>
        </div>
        <div className="cities">
          <div className={placesCount > 0 ? 'cities__places-container container' : 'cities__places-container cities__places-container--empty container'}>
            { placesCount > 0 &&
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">{placesCount} places to stay in Amsterdam</b>
                <form className="places__sorting" action="#" method="get">
                  <span className="places__sorting-caption">Sort by</span>
                  <span className="places__sorting-type" tabIndex={0}>
                    Popular
                    <svg className="places__sorting-arrow" width="7" height="4">
                      <use xlinkHref="#icon-arrow-select"></use>
                    </svg>
                  </span>
                  <ul className="places__options places__options--custom places__options--opened">
                    <li className="places__option places__option--active" tabIndex={0}>Popular</li>
                    <li className="places__option" tabIndex={0}>Price: low to high</li>
                    <li className="places__option" tabIndex={0}>Price: high to low</li>
                    <li className="places__option" tabIndex={0}>Top rated first</li>
                  </ul>
                </form>
                <div className="cities__places-list places__list tabs__content">
                  {
                    citiesPlaceCards.map((card) => <PlaceCard key={card.id} sectionName="cities" data={card} />)
                  }
                </div>
              </section>}

            { placesCount === 0 &&
              <section className="cities__no-places">
                <div className="cities__status-wrapper tabs__content">
                  <b className="cities__status">No places to stay available</b>
                  <p className="cities__status-description">We could not find any property available at the moment in Dusseldorf</p>
                </div>
              </section>}

            <div className="cities__right-section">
              {placesCount > 0 && <section className="cities__map map"></section>}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainPage;
