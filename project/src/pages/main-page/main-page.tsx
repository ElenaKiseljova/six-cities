import {Helmet} from 'react-helmet-async';
import { Link, useParams } from 'react-router-dom';

import {AppRoute} from '../../const';

import { TPlaceCard } from '../../types/offers';
import { TCity } from '../../types/city';

import Header from '../../components/header/header';
import PlaceCardList from '../../components/place-card-list/place-card-list';

type TMainPageProps = {
  cities: TCity[];
  offers: TPlaceCard[];
}

function MainPage(props: TMainPageProps): JSX.Element {
  const { cities, offers } = props;

  const {city} = useParams();

  const filteredOffers = city ? offers.filter((offer) => offer.city.title === city) : offers;
  const placesCount = filteredOffers.length;

  return (
    <div className="page page--gray page--main">
      <Helmet>
        <title>{city ? city : 'Главная'} - 6 городов</title>
      </Helmet>
      <Header />

      <main className={`page__main page__main--index ${placesCount > 0 ? '' : 'page__main--index-empty'}`}>
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <ul className="locations__list tabs__list">
              {cities.map((c) => (
                <li key={c.title} className="locations__item">
                  <Link
                    className={`locations__item-link tabs__item ${c.title === city ? 'tabs__item--active' : ''}`}
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
          <div className={`cities__places-container container ${placesCount > 0 ? '' : 'cities__places-container--empty'}`}>
            { placesCount > 0 &&
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">{placesCount} places to stay in {city}</b>
                <form className="places__sorting" action="#" method="get">
                  <span className="places__sorting-caption">Sort by&nbsp;</span>
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

                <PlaceCardList sectionName='cities' additionalClasses={'tabs__content'} cards={filteredOffers} />
              </section>}

            { placesCount === 0 &&
              <section className="cities__no-places">
                <div className="cities__status-wrapper tabs__content">
                  <b className="cities__status">No places to stay available</b>
                  <p className="cities__status-description">We could not find any property available at the moment in {city}</p>
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

