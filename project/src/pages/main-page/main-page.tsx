import {Helmet} from 'react-helmet-async';
import { Link, useParams } from 'react-router-dom';

import {AppRoute} from '../../const';

import { TPlaceCard } from '../../types/offers';
import { TCity } from '../../types/city';
import { TPoint } from '../../types/points';

import useSelectedPoint from '../../hooks/useSelectedPoint';

import withActiveFlag from '../../hocs/with-active-flag';

import Header from '../../components/header/header';
import PlaceCardList from '../../components/place-card-list/place-card-list';
import Map from '../../components/map/map';
import Sorting from '../../components/sorting/sorting';

type TMainPageProps = {
  cities: TCity[];
  offers: TPlaceCard[];
  points: TPoint[];
}

function MainPage(props: TMainPageProps): JSX.Element {
  const { cities, offers, points } = props;

  const {city: cityName} = useParams();

  const SortingWrapped = withActiveFlag(Sorting);

  const city = cities.find((c) => c.title === cityName);

  const offersInCity = cityName ? offers.filter((offer) => offer.city.title === cityName) : offers;
  const pointsInCity = cityName ? points.filter((point) => point.city.title === cityName) : points;

  const offersCount = offersInCity.length;

  const {selectedPoint, onPlaceCardHoverHandler} = useSelectedPoint(points);

  return (
    <div className="page page--gray page--main">
      <Helmet>
        <title>{cityName ? cityName : 'Главная'} - 6 городов</title>
      </Helmet>
      <Header />

      <main className={`page__main page__main--index ${offersCount > 0 ? '' : 'page__main--index-empty'}`}>
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <ul className="locations__list tabs__list">
              {cities.map((c) => (
                <li key={c.title} className="locations__item">
                  <Link
                    className={`locations__item-link tabs__item ${c.title === cityName ? 'tabs__item--active' : ''}`}
                    to={`${AppRoute.Root}${c.title}`}
                  >
                    <span>{c.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </div>
        <div className="cities">
          <div className={`cities__places-container container ${offersCount > 0 ? '' : 'cities__places-container--empty'}`}>
            { offersCount > 0 &&
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">{offersCount} places to stay in {cityName}</b>

                <SortingWrapped />

                <PlaceCardList
                  sectionName='cities'
                  additionalClasses={'tabs__content'}
                  offers={offersInCity}
                  onPlaceCardHover={onPlaceCardHoverHandler}
                />
              </section>}

            { offersCount === 0 &&
              <section className="cities__no-places">
                <div className="cities__status-wrapper tabs__content">
                  <b className="cities__status">No places to stay available</b>
                  <p className="cities__status-description">We could not find any property available at the moment in {cityName}</p>
                </div>
              </section>}

            <div className="cities__right-section">
              {offersCount > 0 &&
                <Map
                  city={city}
                  points={pointsInCity}
                  offers={offersInCity}
                  selectedPoint={selectedPoint}
                />}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainPage;

