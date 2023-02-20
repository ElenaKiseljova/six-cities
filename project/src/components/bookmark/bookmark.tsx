import { useState } from 'react';

type TBookmarksProps = {
  inFavorites: boolean;
  sectionName?: string;
}

function Bookmark({inFavorites, sectionName}: TBookmarksProps): JSX.Element {
  const [inBookmark, setInBookmark] = useState(inFavorites);

  const bookmarkClass = sectionName ? sectionName : 'place-card';

  return (
    <button
      className={
        `${bookmarkClass}__bookmark-button button
        ${inBookmark ? `${bookmarkClass}__bookmark-button--active` : ''}`
      }
      type="button"
      onClick={() => setInBookmark(!inBookmark)}
    >
      <svg className="place-card__bookmark-icon" width="18" height="19">
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">{ inBookmark ? 'In bookmarks' : 'To bookmarks'}</span>
    </button>
  );
}

export default Bookmark;
