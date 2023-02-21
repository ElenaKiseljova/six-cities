import { useEffect } from 'react';

import { SORTING_VALUES } from '../../const';

import {useAppSelector, useAppDispatch} from '../../hooks';

import {setSorting} from '../../store/action';

import cn from 'classnames';

type TSortingProps = {
  isActive: boolean;
  onActiveChange: () => void;
}

function Sorting({isActive, onActiveChange}: TSortingProps): JSX.Element {
  const dispatch = useAppDispatch();
  const sortBy = useAppSelector((state) => state.sorting);

  useEffect(() => {
    const documentClickHandler = (evt: Event) => {
      const e = evt.target as HTMLElement;

      if (!e.closest('.places__sorting')) {
        onActiveChange();
      }
    };

    if (isActive) {
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
        onClick={onActiveChange}
      >
        {sortBy}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul
        className={cn(
          'places__options places__options--custom',
          {'places__options--opened': isActive}
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
              dispatch(setSorting(value));

              onActiveChange();
            }}
          >
            {value}
          </li>))}
      </ul>
    </form>
  );
}

export default Sorting;
