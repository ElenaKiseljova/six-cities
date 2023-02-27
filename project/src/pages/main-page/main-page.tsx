import { useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import {Helmet} from 'react-helmet-async';

import { AppRoute, SORTING_VALUES, CITIES } from '../../const';

import { TPlaceCard } from '../../types/offers';

import {useAppSelector} from '../../hooks';
import useSelectedPlaceCard from '../../hooks/useSelectedPlaceCard';

import withActiveFlag from '../../hocs/with-active-flag';

import { getOffers } from '../../store/offers-process/selectors';

import Header from '../../components/header/header';
import CitiesList from '../../components/cities-list/cities-list';
import PlaceCardList from '../../components/place-card-list/place-card-list';
import Map from '../../components/map/map';
import Sorting from '../../components/sorting/sorting';

const getSortedOffersBy = (arr: TPlaceCard[], by: SORTING_VALUES): TPlaceCard[] => {
  switch (by) {
    case SORTING_VALUES.RATE:
      return [...arr].sort((a, b) => b.rating - a.rating);

    case SORTING_VALUES.PRICE_LOW_TO_HIGHT:
      return [...arr].sort((a, b) => a.price - b.price);

    case SORTING_VALUES.PRICE_HIGHT_TO_LOW:
      return [...arr].sort((a, b) => b.price - a.price);

    default:
      return [...arr];
  }
};

function MainPage(): JSX.Element {
  const SortingWrapped = withActiveFlag(Sorting);

  const {city: cityName} = useParams();

  const [sortBy, setSortBy] = useState(SORTING_VALUES.POPULAR);

  const offers = useAppSelector(getOffers);

  const offersInCity = cityName ? offers.filter((offer) => offer.city.name === cityName) : offers;
  const offersInCitySorting = getSortedOffersBy(offersInCity, sortBy);

  const offersCount = offersInCity.length;

  const {selectedPlaceCard, onPlaceCardHoverHandler} = useSelectedPlaceCard(offersInCity);

  // Проверка на несуществующий город
  const city = CITIES.find((c) => c.name === cityName);
  if (cityName && typeof city === 'undefined') {
    return <Navigate to={AppRoute.Root} replace />;
  }

  return (
    <div className="page page--gray page--main">
      <Helmet>
        <title>{cityName ? cityName : 'Main'} - 6 cities</title>
      </Helmet>
      <Header />

      <main className={`page__main page__main--index ${offersCount > 0 ? '' : 'page__main--index-empty'}`}>
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <CitiesList cities={CITIES} curCity={cityName} />
        </div>
        <div className="cities">
          <div className={`cities__places-container container ${offersCount > 0 ? '' : 'cities__places-container--empty'}`}>
            { offersCount > 0 &&
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">{offersCount} places to stay in {cityName}</b>

                <SortingWrapped sortBy={sortBy} onChangeSortBy={(value) => setSortBy(value)} />

                <PlaceCardList
                  sectionName='cities'
                  additionalClasses={'tabs__content'}
                  offers={offersInCitySorting}
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
                  offers={offersInCity}
                  selectedPlaceCard={selectedPlaceCard}
                />}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainPage;

