import { combineReducers } from '@reduxjs/toolkit';

import { NameSpace } from '../const';

import { favoritesProcess } from './favorites-process/favorites-process';
import { offerProcess } from './offer-process/offer-process';
import { offersProcess } from './offers-process/offers-process';
import { dataProcess } from './data-process/data-process';
import { userProcess } from './user-process/user-process';

export const rootReducer = combineReducers({
  [NameSpace.Offers]: offersProcess.reducer,
  [NameSpace.Offer]: offerProcess.reducer,
  [NameSpace.User]: userProcess.reducer,
  [NameSpace.Favorites]: favoritesProcess.reducer,
  [NameSpace.Data]: dataProcess.reducer,
});
