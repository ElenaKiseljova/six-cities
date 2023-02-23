import {Helmet} from 'react-helmet-async';
import { useParams } from 'react-router-dom';

import { AuthorizationStatus } from '../../const';

import { TReview } from '../../types/reviews';

import withActiveFlag from '../../hocs/with-active-flag';

import {useAppSelector} from '../../hooks';

import Header from '../../components/header/header';
import PlaceCardList from '../../components/place-card-list/place-card-list';
import ReviewForm from '../../components/review-form/review-form';
import ReviewList from '../../components/review-list/review-list';
import Map from '../../components/map/map';
import Bookmark from '../../components/bookmark/bookmark';

type TPropertyPageProps = {
  onSendReview: (review: TReview) => void;
}

function PropertyPage(props: TPropertyPageProps): JSX.Element {
  const {onSendReview} = props;

  const {id} = useParams();

  const offers = useAppSelector((state) => state.offers);
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);

  const property = offers.find((offer) => offer.id.toString() === id);
  const propertyReviews: TReview[] = [];

  const BookmarkWrapped = withActiveFlag(Bookmark, property ? property.isFavorite : false);

  const nearbyOffersWithProperty = property ? [property] : [];

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
                    property.images.map((img, i) => (
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
                      <span style={{width: `${(property.rating / 5) * 100}%`}}></span>
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
                      Max {property.maxAdults} adults
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
                        property.goods.map((feature) => (
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
                        <img className="property__avatar user__avatar" src={property.host.avatarUrl} width="74" height="74" alt={property.host.name} />
                      </div>
                      <span className="property__user-name">
                        {property.host.name}
                      </span>
                      <span className="property__user-status">
                        {property.host.isPro ? 'Pro' : ''}
                      </span>
                    </div>
                    <div className="property__description">
                      {typeof property.description === 'string' &&
                        <p className="property__text">
                          {property.description}
                        </p>}

                      {Array.isArray(property.description) &&
                        property.description.map((text, i) => (
                          <p key={`${text}-${i + 1}`} className="property__text">
                            {text}
                          </p>
                        ))}
                    </div>
                  </div>
                  <section className="property__reviews reviews">
                    <ReviewList reviews={propertyReviews} />

                    {authorizationStatus === AuthorizationStatus.Auth &&
                      <ReviewForm
                        user={user}
                        onSendReview={onSendReview}
                      />}
                  </section>
                </div>
              </div>
              <Map
                city={property.city}
                offers={nearbyOffersWithProperty}
                selectedPlaceCard={property}
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
