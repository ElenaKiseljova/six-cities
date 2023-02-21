type TBookmarksProps = {
  isActive: boolean;
  onActiveChange: () => void;
  sectionName?: string;
}

function Bookmark({isActive, onActiveChange, sectionName}: TBookmarksProps): JSX.Element {
  const bookmarkClass = sectionName ? sectionName : 'place-card';

  return (
    <button
      className={
        `${bookmarkClass}__bookmark-button button
        ${isActive ? `${bookmarkClass}__bookmark-button--active` : ''}`
      }
      type="button"
      onClick={onActiveChange}
    >
      <svg className={`${bookmarkClass}__bookmark-icon`} width="18" height="19">
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">{ isActive ? 'In bookmarks' : 'To bookmarks'}</span>
    </button>
  );
}

export default Bookmark;
