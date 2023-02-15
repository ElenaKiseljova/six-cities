import {Helmet} from 'react-helmet-async';
import { useParams } from 'react-router-dom';

import { TReviews } from '../../types/reviews';
import { TPlaceCard } from '../../types/offers';

import Header from '../../components/header/header';
import PlaceCard from '../../components/place-card/place-card';
import ReviewForm from '../../components/review-form/review-form';


type TPropertyPageProps = {
  reviews: TReviews;
  offers: TPlaceCard[];
  isLoggedIn: boolean;
}

function PropertyPage(props: TPropertyPageProps): JSX.Element {
  const {reviews, offers, isLoggedIn} = props;

  const {id} = useParams();

  const NEARBY_IN_MAP = 0.01;

  const property = offers.find((offer) => offer.id === id);
  const propertyReviews = id && reviews[id] ? reviews[id] : [];
  const propertyNearbyOffers = offers.filter((offer) => {
    if (property) {
      return Math.abs(offer.map[0] - property.map[0]) < NEARBY_IN_MAP ||
        Math.abs(offer.map[1] - property.map[1]) < NEARBY_IN_MAP;
    }

    return false;
  });

  return (
    <div className="page">
      <Helmet>
        <title>{property ? property.title : 'Офер не найден'} - 6 городов</title>
      </Helmet>
      <Header />

      <main className="page__main page__main--property">
        {property &&
          <>
            <section className="property">
              <div className="property__gallery-container container">
                <div className="property__gallery">
                  {
                    property.imgs.map((img, i) => (
                      <div key={`${img}-${i + 1}`} className="property__image-wrapper">
                        <img className="property__image" src={img} alt={property.title} />
                      </div>
                    ))
                  }
                </div>
              </div>
              <div className="property__container container">
                <div className="property__wrapper">
                  {property.isPremium &&
                    <div className="property__mark">
                      <span>Premium</span>
                    </div>}

                  <div className="property__name-wrapper">
                    <h1 className="property__name">
                      {property.title}
                    </h1>
                    <button className={`property__bookmark-button button ${property.inFavorites ? 'property__bookmark-button--active' : ''}`} type="button">
                      <svg className="property__bookmark-icon" width="31" height="33">
                        <use xlinkHref="#icon-bookmark"></use>
                      </svg>
                      <span className="visually-hidden">To bookmarks</span>
                    </button>
                  </div>
                  <div className="property__rating rating">
                    <div className="property__stars rating__stars">
                      <span style={{width: `${property.rating}%`}}></span>
                      <span className="visually-hidden">Rating</span>
                    </div>
                    <span className="property__rating-value rating__value">{5 / 100 * property.rating}</span>
                  </div>
                  <ul className="property__features">
                    <li className="property__feature property__feature--entire">
                      {property.type}
                    </li>
                    <li className="property__feature property__feature--bedrooms">
                      {property.bedrooms} Bedrooms
                    </li>
                    <li className="property__feature property__feature--adults">
                      Max {property.adults} adults
                    </li>
                  </ul>
                  <div className="property__price">
                    <b className="property__price-value">&euro;{property.price}</b>
                    <span className="property__price-text">&nbsp;night</span>
                  </div>
                  <div className="property__inside">
                    <h2 className="property__inside-title">What&apos;s inside</h2>
                    <ul className="property__inside-list">
                      {
                        property.features.map((feature) => (
                          <li key={feature} className="property__inside-item">
                            {feature}
                          </li>
                        ))
                      }
                    </ul>
                  </div>
                  <div className="property__host">
                    <h2 className="property__host-title">Meet the host</h2>
                    <div className="property__host-user user">
                      <div className={`property__avatar-wrapper user__avatar-wrapper ${property.host.isPro ? 'property__avatar-wrapper--pro' : ''}`}>
                        <img className="property__avatar user__avatar" src={property.host.img} width="74" height="74" alt={property.host.name} />
                      </div>
                      <span className="property__user-name">
                        {property.host.name}
                      </span>
                      <span className="property__user-status">
                        {property.host.isPro ? 'Pro' : ''}
                      </span>
                    </div>
                    <div className="property__description">
                      {typeof property.host.text === 'string' &&
                        <p className="property__text">
                          A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.
                        </p>}

                      {Array.isArray(property.host.text) &&
                        property.host.text.map((text, i) => (
                          <p key={`${text}-${i + 1}`} className="property__text">
                            {text}
                          </p>
                        ))}
                    </div>
                  </div>
                  <section className="property__reviews reviews">
                    <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{propertyReviews.length}</span></h2>
                    <ul className="reviews__list">
                      {propertyReviews.map((propertyReview) => (
                        <li key={propertyReview.id} className="reviews__item">
                          <div className="reviews__user user">
                            <div className="reviews__avatar-wrapper user__avatar-wrapper">
                              <img className="reviews__avatar user__avatar" src= {propertyReview.user.img} width="54" height="54" alt={propertyReview.user.name} />
                            </div>
                            <span className="reviews__user-name">
                              {propertyReview.user.name}
                            </span>
                          </div>
                          <div className="reviews__info">
                            <div className="reviews__rating rating">
                              <div className="reviews__stars rating__stars">
                                <span style={{width: `${propertyReview.rating}%`}}></span>
                                <span className="visually-hidden">Rating</span>
                              </div>
                            </div>
                            <p className="reviews__text">
                              {propertyReview.text}
                            </p>
                            <time className="reviews__time" dateTime={propertyReview.date}>{Intl.DateTimeFormat('en-ES', {month: 'short', day: 'numeric'}).format(new Date(propertyReview.date))}</time>
                          </div>
                        </li>
                      ))}
                    </ul>
                    {isLoggedIn && <ReviewForm />}
                  </section>
                </div>
              </div>
              <section className="property__map map"></section>
            </section>
            <div className="container">
              <section className="near-places places">
                <h2 className="near-places__title">Other places in the neighbourhood</h2>
                <div className="near-places__list places__list">
                  {
                    propertyNearbyOffers.map((propertyNearbyOffer) => (
                      <PlaceCard
                        key={propertyNearbyOffer.id}
                        sectionName='near-places'
                        data={propertyNearbyOffer}
                      />
                    ))
                  }
                </div>
              </section>
            </div>
          </>}

        {!property &&
          <section className="property">
            <div className="property__gallery-container container">
              <div className="property__gallery">
              </div>
            </div>
            <div className="property__container container">
              <div className="property__wrapper">
                <div className="property__name-wrapper">
                  <h1 className="property__name">
                    Офер не найден
                  </h1>
                </div>
              </div>
            </div>
          </section>}
      </main>


    </div>
  );
}

export default PropertyPage;
