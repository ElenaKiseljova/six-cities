import { useState, useEffect } from 'react';

import cn from 'classnames';

const SORTING_VALUES = {
  POPULAR: 'Popular',
  PRICE_LOW_TO_HIGHT: 'Price: low to high',
  PRICE_HIGHT_TO_LOW: 'Price: high to low',
  RATE: 'Top rated first',
};

function Sorting(): JSX.Element {
  const [isOpened, setIsOpened] = useState(false);
  const [sortBy, setSortBy] = useState(SORTING_VALUES.POPULAR);

  useEffect(() => {
    const documentClickHandler = (evt: Event) => {
      const e = evt.target as HTMLElement;

      if (!e.closest('.places__sorting')) {
        setIsOpened(false);
      }
    };

    if (isOpened) {
      document.addEventListener('click', documentClickHandler);
    }

    return () => {
      document.removeEventListener('click', documentClickHandler);
    };
  });

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by&nbsp;</span>
      <span
        className="places__sorting-type" tabIndex={0}
        onClick={() => setIsOpened(!isOpened)}
      >
        {sortBy}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul
        className={cn(
          'places__options places__options--custom',
          {'places__options--opened': isOpened}
        )}
      >
        {Object.entries(SORTING_VALUES).map(([key, value]) => (
          <li
            key={key}
            className={cn(
              'places__option',
              {'places__option--active': value === sortBy}
            )}
            tabIndex={0}
            onClick={() => {
              setSortBy(value);
              setIsOpened(false);
            }}
          >
            {value}
          </li>))}
      </ul>
    </form>
  );
}

export default Sorting;
