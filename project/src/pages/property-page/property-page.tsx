import { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import {Helmet} from 'react-helmet-async';

import { AuthorizationStatus } from '../../const';

import { TReviewPost } from '../../types/reviews';

import withActiveFlag from '../../hocs/with-active-flag';

import {useAppSelector, useAppDispatch} from '../../hooks';
import {fetchOfferAction, fetchNearbyOffersAction, fetchCommentsAction, sendCommentAction} from '../../store/api-actions';

import { adapterOfferType } from '../../services/adapter-offer-type';

import Header from '../../components/header/header';
import PlaceCardList from '../../components/place-card-list/place-card-list';
import ReviewForm from '../../components/review-form/review-form';
import ReviewList from '../../components/review-list/review-list';
import Map from '../../components/map/map';
import Bookmark from '../../components/bookmark/bookmark';
import PropertyGallery from '../../components/property-gallery/property-gallery';

function PropertyPage(): JSX.Element {
  const {id} = useParams();

  const dispatch = useAppDispatch();

  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const property = useAppSelector((state) => state.offer);
  const nearbyOffers = useAppSelector((state) => state.nearbyOffers);
  const reviews = useAppSelector((state) => state.comments);

  const BookmarkWrapped = withActiveFlag(Bookmark, property ? property.isFavorite : false);

  const nearbyOffersWithProperty = property ? [...nearbyOffers, property] : [...nearbyOffers];

  const isDispatchStart = useRef(false);

  useEffect(() => {
    if (!isDispatchStart.current && id && property === null) {
      isDispatchStart.current = true;

      const idToNumber = Number(id);

      dispatch(fetchOfferAction(idToNumber));
      dispatch(fetchNearbyOffersAction(idToNumber));
      dispatch(fetchCommentsAction(idToNumber));
    }
  });

  const onSendReviewHandler = (data: TReviewPost): void => {
    if (id) {
      dispatch(sendCommentAction({
        id: Number(id),
        review: data
      }));
    }
  };

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
              <PropertyGallery offer={property} />

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

                    <BookmarkWrapped offer={property} sectionName="property" />
                  </div>
                  <div className="property__rating rating">
                    <div className="property__stars rating__stars">
                      <span style={{width: `${(property.rating / 5) * 100}%`}}></span>
                      <span className="visually-hidden">Rating</span>
                    </div>
                    <span className="property__rating-value rating__value">{property.rating}</span>
                  </div>
                  <ul className="property__features">
                    <li className="property__feature property__feature--entire">
                      {adapterOfferType(property.type)}
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
                    <ReviewList reviews={reviews} />

                    {authorizationStatus === AuthorizationStatus.Auth &&
                      <ReviewForm
                        onSendReview={onSendReviewHandler}
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
      </main>
    </div>
  );
}

export default PropertyPage;
