import { createAction } from '@reduxjs/toolkit';

import { SORTING_VALUES } from '../const';

import { TPlaceCard } from '../types/offers';

export const setCity = createAction<string | undefined>('city/setValue');

export const setOffers = createAction<TPlaceCard[]>('offers/setList');

export const setNearbyOffers = createAction<TPlaceCard[]>(
  'offers/setNearbyList'
);

export const setSorting = createAction<SORTING_VALUES>('sorting/setType');
