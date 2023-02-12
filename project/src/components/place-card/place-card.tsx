import { TPlaceCard } from '../../types';

type TPlaceCardProps = {
  data: TPlaceCard;
  sectionName?: string;
}

function PlaceCard(props: TPlaceCardProps): JSX.Element {
  const {data, sectionName} = props;
  const {isPremium, image, price, title, rating, inBookmarks, type} = data;

  return (
    <article className={sectionName ? `${sectionName}__place-card place-card` : 'place-card'}>
      {isPremium &&
        <div className="place-card__mark">
          <span>Premium</span>
        </div>}
      <div className={sectionName ? `${sectionName}__image-wrapper place-card__image-wrapper` : 'place-card__image-wrapper'}>
        <a href="#top">
          <img className="place-card__image" src={image} width="260" height="200" alt="apartment" />
        </a>
      </div>
      <div className={sectionName ? `${sectionName}__place-card-info place-card__info` : 'place-card__info'}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className={inBookmarks ? 'place-card__bookmark-button place-card__bookmark-button--active button' : 'place-card__bookmark-button button'} type="button">
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">{ inBookmarks ? 'In bookmarks' : 'To bookmarks'}</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${rating}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <a href="#top">Beautiful &amp; {title}</a>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}

export default PlaceCard;
