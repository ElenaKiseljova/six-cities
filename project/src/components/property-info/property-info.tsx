import { TPlaceCard } from '../../types/offers';

import withActiveFlag from '../../hocs/with-active-flag';

import { adapterOfferType } from '../../services/adapter-offer-type';

import Bookmark from '../../components/bookmark/bookmark';

type TPropertyInfoProps = {
  offer: TPlaceCard;
};

function PropertyInfo({offer}: TPropertyInfoProps): JSX.Element {
  const {title, isPremium, isFavorite, rating, type, bedrooms, maxAdults, price} = offer;

  const BookmarkWrapped = withActiveFlag(Bookmark, isFavorite);

  return (
    <>
      {isPremium &&
        <div className="property__mark">
          <span>Premium</span>
        </div>}

      <div className="property__name-wrapper">
        <h1 className="property__name">
          {title}
        </h1>

        <BookmarkWrapped offer={offer} sectionName="property" />
      </div>
      <div className="property__rating rating">
        <div className="property__stars rating__stars">
          <span style={{width: `${(rating / 5) * 100}%`}}></span>
          <span className="visually-hidden">Rating</span>
        </div>
        <span className="property__rating-value rating__value">{rating}</span>
      </div>
      <ul className="property__features">
        <li className="property__feature property__feature--entire">
          {adapterOfferType(type)}
        </li>
        <li className="property__feature property__feature--bedrooms">
          {bedrooms} Bedrooms
        </li>
        <li className="property__feature property__feature--adults">
          Max {maxAdults} adults
        </li>
      </ul>
      <div className="property__price">
        <b className="property__price-value">&euro;{price}</b>
        <span className="property__price-text">&nbsp;night</span>
      </div>
    </>
  );
}

export default PropertyInfo;
