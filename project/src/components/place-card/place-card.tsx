import { MouseEvent } from 'react';
import {Link} from 'react-router-dom';

import {AppRoute} from '../../const';

import { TPlaceCard } from '../../types/offers';

import withActiveFlag from '../../hocs/with-active-flag';

import {useAppDispatch} from '../../hooks';
import {fetchOfferAction, fetchNearbyOffersAction, fetchCommentsAction} from '../../store/api-actions';

import { adapterOfferType } from '../../services/adapter-offer-type';

import Bookmark from '../bookmark/bookmark';

type TPlaceCardProps = {
  data: TPlaceCard;
  sectionName?: string;
  onHover?: (place: TPlaceCard | undefined) => void;
}

function PlaceCard(props: TPlaceCardProps): JSX.Element {
  const {data, sectionName, onHover} = props;
  const {id, isPremium, previewImage, price, title, rating, isFavorite, type} = data;

  const dispatch = useAppDispatch();

  const BookmarkWrapped = withActiveFlag(Bookmark, isFavorite);

  const placeCardMouseEnterHandler = (evt: MouseEvent<HTMLElement>) => {
    evt.preventDefault();

    return typeof onHover === 'function' ? onHover(data) : false;
  };

  const placeCardMouseLeaveHandler = (evt: MouseEvent<HTMLElement>) => {
    evt.preventDefault();

    return typeof onHover === 'function' ? onHover(undefined) : false;
  };

  const goToThePropertyPage = () => {
    dispatch(fetchOfferAction(id));
    dispatch(fetchNearbyOffersAction(id));
    dispatch(fetchCommentsAction(id));
  };

  return (
    <article
      className={`place-card ${sectionName ? `${sectionName}__place-card` : ''}`}
      onMouseEnter={placeCardMouseEnterHandler}
      onMouseLeave={placeCardMouseLeaveHandler}
    >
      {isPremium &&
        <div className="place-card__mark">
          <span>Premium</span>
        </div>}
      <div className={`place-card__image-wrapper ${sectionName ? `${sectionName}__image-wrapper` : ''}`}>
        <Link
          to={`${AppRoute.Property}/${id}`}
          onClick={goToThePropertyPage}
        >
          <img className="place-card__image" src={previewImage} width="260" height="200" alt="apartment" />
        </Link>
      </div>
      <div className={`place-card__info ${sectionName ? `${sectionName}__place-card-info` : ''}`}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>

          <BookmarkWrapped offer={data} />
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${(rating / 5) * 100}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link
            to={`${AppRoute.Property}/${id}`}
            onClick={goToThePropertyPage}
          >
            {title}
          </Link>
        </h2>
        <p className="place-card__type">{adapterOfferType(type)}</p>
      </div>
    </article>
  );
}

export default PlaceCard;
