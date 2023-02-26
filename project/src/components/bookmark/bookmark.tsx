
import { useNavigate } from 'react-router-dom';

import { AppRoute, AuthorizationStatus } from '../../const';

import { TPlaceCard } from '../../types/offers';

import {useAppDispatch, useAppSelector} from '../../hooks';

import { toggleOfferFavoriteStatusAction } from '../../store/api-actions';

type TBookmarksProps = {
  isActive: boolean;
  onActiveChange: () => void;
  sectionName?: string;
  offer: TPlaceCard;
}

function Bookmark({isActive, onActiveChange, offer, sectionName}: TBookmarksProps): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);

  const bookmarkClass = sectionName ? sectionName : 'place-card';

  const activeChangeHandler = () => {
    if (authorizationStatus !== AuthorizationStatus.Auth) {
      navigate(AppRoute.Login);

      return;
    }

    dispatch(toggleOfferFavoriteStatusAction({id: offer.id, status: isActive ? 0 : 1}));

    onActiveChange();
  };
  return (
    <button
      className={
        `${bookmarkClass}__bookmark-button button
        ${isActive ? `${bookmarkClass}__bookmark-button--active` : ''}`
      }
      type="button"
      onClick={activeChangeHandler}
    >
      <svg className={`${bookmarkClass}__bookmark-icon`} width="18" height="19">
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">{ isActive ? 'In bookmarks' : 'To bookmarks'}</span>
    </button>
  );
}

export default Bookmark;
