import { TPoint } from '../types/points';
import { cities } from './cities';
import { offers } from './offers';

const amstrdamOffers = offers.filter(
  (offer) => offer.city.title === cities[0]?.title
);

const brusselOffers = offers.filter(
  (offer) => offer.city.title === cities[3]?.title
);

const hamburgfOffers = offers.filter(
  (offer) => offer.city.title === cities[4]?.title
);

const duseldorfOffers = offers.filter(
  (offer) => offer.city.title === cities[5]?.title
);

export const points: TPoint[] = [
  {
    title: amstrdamOffers[0]?.title,
    lat: 52.3909553943508,
    lng: 4.85309666406198,
    city: cities[0],
  },
  {
    title: amstrdamOffers[1]?.title,
    lat: 52.369553943508,
    lng: 4.85309666406198,
    city: cities[0],
  },
  {
    title: amstrdamOffers[2]?.title,
    lat: 52.3909553943508,
    lng: 4.929309666406198,
    city: cities[0],
  },
  {
    title: amstrdamOffers[3]?.title,
    lat: 52.3809553943508,
    lng: 4.939309666406198,
    city: cities[0],
  },
  {
    title: brusselOffers[0]?.title,
    lat: 50.80183745669361,
    lng: 3.9990047706881477,
    city: cities[3],
  },
  {
    title: hamburgfOffers[0]?.title,
    lat: 53.55253249205177,
    lng: 9.886585354538283,
    city: cities[4],
  },
  {
    title: duseldorfOffers[0]?.title,
    lat: 51.249546694686835,
    lng: 6.784127833399713,
    city: cities[5],
  },
];
