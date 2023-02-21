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
