import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { AppDispatch, State } from '../types/state';
import { TPlaceCard } from '../types/offers';
import { TReview, TReviewPost } from '../types/reviews';
import { TAuthData } from '../types/auth-data';
import { TUserData } from '../types/user-data';

import {
  APIRoute,
  // AppRoute,
  AuthorizationStatus,
  TIMEOUT_SHOW_ERROR,
} from '../const';

import { saveUserData, dropUserData } from '../services/user';

import {
  requireAuthorization,
  setFavorites,
  addToFavorites,
  removeFromFavorites,
  setError,
  setDataLoadingStatus,
  setOffer,
  setNearbyOffers,
  updateNearbyOffers,
  setComments,
  setOffers,
  updateOffers,
  resetFavoritesOffersFlag,
  // redirectToRoute,
} from './action';

import { store } from './';

export const clearErrorAction = createAsyncThunk('server/clearError', () => {
  setTimeout(() => store.dispatch(setError(null)), TIMEOUT_SHOW_ERROR);
});

export const fetchOffersAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchOffers', async (_arg, { dispatch, extra: api }) => {
  dispatch(setDataLoadingStatus(true));

  const { data } = await api.get<TPlaceCard[]>(APIRoute.Hotels);

  dispatch(setDataLoadingStatus(false));

  dispatch(setOffers(data));
});

export const fetchOfferAction = createAsyncThunk<
  void,
  number,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchOffer', async (id, { dispatch, extra: api }) => {
  dispatch(setDataLoadingStatus(true));

  const { data } = await api.get<TPlaceCard>(`${APIRoute.Hotels}/${id}`);

  dispatch(setDataLoadingStatus(false));

  dispatch(setOffer(data));
});

export const fetchNearbyOffersAction = createAsyncThunk<
  void,
  number,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchNearbyOffers', async (id, { dispatch, extra: api }) => {
  dispatch(setDataLoadingStatus(true));

  const { data } = await api.get<TPlaceCard[]>(
    `${APIRoute.Hotels}/${id}/nearby`
  );

  dispatch(setDataLoadingStatus(false));

  dispatch(setNearbyOffers(data));
});

export const fetchCommentsAction = createAsyncThunk<
  void,
  number,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchComments', async (id, { dispatch, extra: api }) => {
  dispatch(setDataLoadingStatus(true));

  const { data } = await api.get<TReview[]>(`${APIRoute.Reviews}/${id}`);

  dispatch(setDataLoadingStatus(false));

  dispatch(setComments(data));
});

export const sendCommentAction = createAsyncThunk<
  void,
  {
    id: number;
    review: TReviewPost;
  },
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/sendComment', async ({ id, review }, { dispatch, extra: api }) => {
  const { data } = await api.post<TReview[]>(`${APIRoute.Reviews}/${id}`, {
    ...review,
  });

  dispatch(setComments(data));
});

export const fetchFavoritesOffersAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchFavoritesOffers', async (_arg, { dispatch, extra: api }) => {
  const { data } = await api.get<TPlaceCard[]>(APIRoute.Favorite);

  dispatch(setFavorites(data));
});

export const toggleOfferFavoriteStatusAction = createAsyncThunk<
  void,
  {
    id: number;
    status: 1 | 0;
  },
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  'data/toggleOfferFavoriteStatus',
  async ({ id, status }, { dispatch, extra: api }) => {
    const { data } = await api.post<TPlaceCard>(
      `${APIRoute.Favorite}/${id}/${status}`
    );

    dispatch(setOffer(data));
    dispatch(updateOffers(data));
    dispatch(updateNearbyOffers(data));

    if (status === 1) {
      dispatch(addToFavorites(data));
    } else {
      dispatch(removeFromFavorites(data));
    }
  }
);

export const checkAuthAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('user/checkAuth', async (_arg, { dispatch, extra: api }) => {
  try {
    await api.get(APIRoute.Login);

    dispatch(requireAuthorization(AuthorizationStatus.Auth));
  } catch {
    dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
  }
});

export const loginAction = createAsyncThunk<
  void,
  TAuthData,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  'user/login',
  async ({ login: email, password }, { dispatch, extra: api }) => {
    const { data } = await api.post<TUserData>(APIRoute.Login, {
      email,
      password,
    });

    saveUserData(data);
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
    // dispatch(redirectToRoute(AppRoute.Favorites));
  }
);

export const logoutAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('user/logout', async (_arg, { dispatch, extra: api }) => {
  await api.delete(APIRoute.Logout);

  dropUserData();
  dispatch(resetFavoritesOffersFlag());
  dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
  dispatch(setFavorites([]));
});
