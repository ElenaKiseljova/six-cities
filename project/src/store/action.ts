import { createAction } from '@reduxjs/toolkit';

import { AuthorizationStatus, SORTING_VALUES } from '../const';

import { TPlaceCard } from '../types/offers';
import { TReview } from '../types/reviews';

export const setOffers = createAction<TPlaceCard[]>('offers/setList');

export const setOffer = createAction<TPlaceCard>('offer/setProperty');

export const setNearbyOffers = createAction<TPlaceCard[]>(
  'offer/setNearbyList'
);

export const setComments = createAction<TReview[]>('offer/setCommentsList');

export const setSorting = createAction<SORTING_VALUES>('sorting/setType');

export const requireAuthorization = createAction<AuthorizationStatus>(
  'user/requireAuthorization'
);

export const setFavorites = createAction<TPlaceCard[]>('user/setFavorites');

export const setError = createAction<string | null>('server/setError');

export const setDataLoadingStatus = createAction<boolean>(
  'data/setDataLoadingStatus'
);
