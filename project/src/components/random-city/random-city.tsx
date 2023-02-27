import { Link } from 'react-router-dom';

import { AppRoute, CITIES } from '../../const';

const getRandomCity = () => CITIES[Math.abs(Math.floor(Math.random() * CITIES.length) - 1)];

function RandomCity(): JSX.Element {
  const city = getRandomCity();

  return (
    <Link className="locations__item-link" to={`${AppRoute.Root}${city.name}`}>
      <span>{city.name}</span>
    </Link>
  );
}

export default RandomCity;
