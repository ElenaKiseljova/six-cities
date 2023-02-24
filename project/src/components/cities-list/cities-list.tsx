import { Link} from 'react-router-dom';

import { AppRoute } from '../../const';

import { TCity } from '../../types/city';

type TCitiesListProps = {
  cities: TCity[];
  curCity: string | undefined;
};

function CitiesList({cities, curCity}: TCitiesListProps): JSX.Element {
  return (
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {cities.map((c) => (
          <li key={c.name} className="locations__item">
            <Link
              className={`locations__item-link tabs__item ${c.name === curCity ? 'tabs__item--active' : ''}`}
              to={`${AppRoute.Root}${c.name}`}
            >
              <span>{c.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default CitiesList;
