import { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import {Helmet} from 'react-helmet-async';

import { AuthorizationStatus } from '../../const';

import { TReviewPost } from '../../types/reviews';

import {useAppSelector, useAppDispatch} from '../../hooks';
import {fetchOfferAction, fetchNearbyOffersAction, fetchCommentsAction, sendCommentAction} from '../../store/api-actions';

import { getAuthorizationStatus } from '../../store/user-process/selectors';
import { getComments, getNearbyOffers, getOffer } from '../../store/offer-process/selectors';

import Header from '../../components/header/header';
import PlaceCardList from '../../components/place-card-list/place-card-list';
import ReviewForm from '../../components/review-form/review-form';
import ReviewList from '../../components/review-list/review-list';
import Map from '../../components/map/map';
import PropertyGallery from '../../components/property-gallery/property-gallery';
import PropertyHost from '../../components/property-host/property-host';
import PropertyInside from '../../components/property-inside/property-inside';
import PropertyInfo from '../../components/property-info/property-info';

function PropertyPage(): JSX.Element {
  const {id} = useParams();

  const dispatch = useAppDispatch();

  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const property = useAppSelector(getOffer);
  const nearbyOffers = useAppSelector(getNearbyOffers);
  const reviews = useAppSelector(getComments);

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
                  <PropertyInfo offer={property} />

                  <PropertyInside offer={property} />

                  <PropertyHost offer={property} />

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
