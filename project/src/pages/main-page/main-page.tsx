import {Helmet} from 'react-helmet-async';
import {useState} from 'react';
import {citiesPlaceCards, sixCities} from '../../mocks';
import Header from '../../components/header/header';
import PlaceCard from '../../components/place-card/place-card';

type TMainPageProps = {
  placesCount: number;
}


function MainPage(props: TMainPageProps): JSX.Element {
  const { placesCount } = props;

  const [curCity, setCurCity] = useState('Brussels');

  return (
    <div className="page page--gray page--main">
      <Helmet>
        <title>Главная - 6 городов</title>
      </Helmet>
      <Header />

      <main className={`page__main page__main--index ${placesCount > 0 ? '' : 'page__main--index-empty'}`}>
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <ul className="locations__list tabs__list">
              {sixCities.map((city) => (
                <li key={city} className="locations__item">
                  <a
                    className={`locations__item-link tabs__item ${city === curCity ? 'tabs__item--active' : ''}`}
                    href="#top"
                    onClick={(): void => setCurCity(city)}
                  >
                    <span>{city}</span>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </div>
        <div className="cities">
          <div className={`cities__places-container container ${placesCount > 0 ? '' : 'cities__places-container--empty'}`}>
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

