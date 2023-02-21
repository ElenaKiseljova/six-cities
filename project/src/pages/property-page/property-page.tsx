import {Helmet} from 'react-helmet-async';
import { useParams } from 'react-router-dom';

import { TReview, TReviews } from '../../types/reviews';
import { TPlaceCard } from '../../types/offers';
import { ICurUser } from '../../types/user';
import { TPoint } from '../../types/points';

import withActiveFlag from '../../hocs/with-active-flag';

import Header from '../../components/header/header';
import PlaceCardList from '../../components/place-card-list/place-card-list';
import ReviewForm from '../../components/review-form/review-form';
import ReviewList from '../../components/review-list/review-list';
import Map from '../../components/map/map';
import Bookmark from '../../components/bookmark/bookmark';

type TPropertyPageProps = {
  user: ICurUser;
  reviews: TReviews;
  offers: TPlaceCard[];
  points: TPoint[];
  nearbyOffers: TPlaceCard[];
  nearbyPoints: TPoint[];
  isLoggedIn: boolean;
  onSendReview: (review: TReview) => void;
}

function PropertyPage(props: TPropertyPageProps): JSX.Element {
  const {user, reviews, offers, points, nearbyOffers, nearbyPoints, isLoggedIn, onSendReview} = props;

  const {id} = useParams();

  const property = offers.find((offer) => offer.id === id);
  const propertyReviews = id && reviews[id] ? reviews[id] : [];

  const BookmarkWrapped = withActiveFlag(Bookmark, property ? property.inFavorites : false);

  const propertyPoint = points.find((p) => p.title === property?.title);
  const propertyPoints = propertyPoint ? [...nearbyPoints, propertyPoint] : [...nearbyPoints];

  return (
    <div className="page">
      <Helmet>
        <title>{property ? property.title : 'Offer not found'} - 6 cities</title>
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

                    <BookmarkWrapped sectionName="property" />
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
                    <ReviewList reviews={propertyReviews} />

                    {isLoggedIn &&
                      <ReviewForm
                        user={user}
                        onSendReview={onSendReview}
                      />}
                  </section>
                </div>
              </div>
              <Map
                city={property.city}
                points={propertyPoints}
                offers={nearbyOffers}
                selectedPoint={propertyPoint}
                classList="property__map"
              />
            </section>
            <div className="container">
              <section className="near-places places">
                <h2 className="near-places__title">Other places in the neighbourhood</h2>

                <PlaceCardList
                  sectionName='near-places'
                  offers={nearbyOffers}
                />
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
                    Offer not found
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
