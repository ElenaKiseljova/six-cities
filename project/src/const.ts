import { TCity } from './types/city';

export const TIMEOUT_SHOW_ERROR = 2000;

export const CITIES: TCity[] = [
  { title: 'Amsterdam', lat: 52.321, lng: 4.878, zoom: 10 },
  { title: 'Paris', lat: 48.805, lng: 2.351, zoom: 10 },
  { title: 'Cologne', lat: 50.9341, lng: 6.9605, zoom: 10 },
  { title: 'Brussels', lat: 50.855103, lng: 4.3053775, zoom: 10 },
  {
    title: 'Hamburg',
    lat: 53.58495986131881,
    lng: 9.994421266529852,
    zoom: 10,
  },
  { title: 'Dusseldorf', lat: 51.2383711, lng: 6.6742673, zoom: 10 },
];

export enum AppRoute {
  Login = '/login',
  Favorites = '/favorites',
  Property = '/offer',
  Root = '/',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum URL_MARKER {
  default = '/img/pin.svg', // 'https://github.com/ElenaKiseljova/ElenaKiseljova.github.io/raw/main/img/pin.svg',
  current = '/img/pin-active.svg', // 'https://github.com/ElenaKiseljova/ElenaKiseljova.github.io/raw/main/img/main-pin.svg',
}

export enum SORTING_VALUES {
  POPULAR = 'Popular',
  PRICE_LOW_TO_HIGHT = 'Price: low to high',
  PRICE_HIGHT_TO_LOW = 'Price: high to low',
  RATE = 'Top rated first',
}

export enum APIRoute {
  Hotels = '/hotels',
  Login = '/login',
  Logout = '/logout',
}
