import { createAction } from '@reduxjs/toolkit';

import { TCity } from '../types/city';
import { TPlaceCard } from '../types/offers';

export const setCity = createAction<TCity>('city/setValue');

export const setOffers = createAction<TPlaceCard[]>('offers/setList');
