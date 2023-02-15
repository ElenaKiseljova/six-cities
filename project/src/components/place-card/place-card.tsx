import {Link} from 'react-router-dom';

import {AppRoute} from '../../const';

import { TPlaceCard } from '../../types/offers';

type TPlaceCardProps = {
  data: TPlaceCard;
  sectionName?: string;
  onHoverIn?: (card: TPlaceCard) => void;
  onHoverOut?: () => void;
}

function PlaceCard(props: TPlaceCardProps): JSX.Element {
  const {data, sectionName, onHoverIn, onHoverOut} = props;
  const {id, isPremium, cardImg, price, title, rating, inFavorites, type} = data;

  return (
    <article
      className={`place-card ${sectionName ? `${sectionName}__place-card` : ''}`}
      onMouseEnter={() => typeof onHoverIn === 'function' ? onHoverIn(data) : false}
      onMouseLeave={() => typeof onHoverOut === 'function' ? onHoverOut() : false}
    >
      {isPremium &&
        <div className="place-card__mark">
          <span>Premium</span>
        </div>}
      <div className={`place-card__image-wrapper ${sectionName ? `${sectionName}__image-wrapper` : ''}`}>
        <Link to={`${AppRoute.Property}/${id}`}>
          <img className="place-card__image" src={cardImg} width="260" height="200" alt="apartment" />
        </Link>
      </div>
      <div className={`place-card__info ${sectionName ? `${sectionName}__place-card-info` : ''}`}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className={`place-card__bookmark-button button ${inFavorites ? 'place-card__bookmark-button--active' : ''}`} type="button">
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">{ inFavorites ? 'In bookmarks' : 'To bookmarks'}</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${rating}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`${AppRoute.Property}/${id}`}>{title}</Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}

export default PlaceCard;
