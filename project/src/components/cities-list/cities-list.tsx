import { Link} from 'react-router-dom';

import { AppRoute } from '../../const';

import { TCity } from '../../types/city';

import { useAppDispatch} from '../../hooks';
import {setCity} from '../../store/action';

type TCitiesListProps = {
  cities: TCity[];
  curCity: string | undefined;
};

function CitiesList({cities, curCity}: TCitiesListProps): JSX.Element {
  const dispatch = useAppDispatch();

  return (
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {cities.map((c) => (
          <li key={c.title} className="locations__item">
            <Link
              className={`locations__item-link tabs__item ${c.title === curCity ? 'tabs__item--active' : ''}`}
              to={`${AppRoute.Root}${c.title}`}
              onClick={() => dispatch(setCity(c.title))}
            >
              <span>{c.title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default CitiesList;
