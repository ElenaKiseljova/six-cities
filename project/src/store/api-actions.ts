import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { AppDispatch, State } from '../types/state';
import { TPlaceCard } from '../types/offers';
import { TReview, TReviewPost } from '../types/reviews';
import { TAuthData } from '../types/auth-data';
import { TUserData } from '../types/user-data';

import { APIRoute, AppRoute } from '../const';

import { saveUserData, dropUserData } from '../services/user';

import { redirectToRoute } from './action';

export const fetchOffersAction = createAsyncThunk<
  TPlaceCard[],
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('offers/fetchOffers', async (_arg, { dispatch, extra: api }) => {
  const { data } = await api.get<TPlaceCard[]>(APIRoute.Hotels);

  return data;
});

export const fetchOfferAction = createAsyncThunk<
  TPlaceCard,
  number,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('offer/fetchOffer', async (id, { dispatch, extra: api }) => {
  const { data } = await api.get<TPlaceCard>(`${APIRoute.Hotels}/${id}`);

  return data;
});

export const fetchNearbyOffersAction = createAsyncThunk<
  TPlaceCard[],
  number,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('offer/fetchNearbyOffers', async (id, { dispatch, extra: api }) => {
  const { data } = await api.get<TPlaceCard[]>(
    `${APIRoute.Hotels}/${id}/nearby`
  );

  return data;
});

export const fetchCommentsAction = createAsyncThunk<
  TReview[],
  number,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('offer/fetchComments', async (id, { dispatch, extra: api }) => {
  const { data } = await api.get<TReview[]>(`${APIRoute.Reviews}/${id}`);

  return data;
});

export const sendCommentAction = createAsyncThunk<
  TReview[],
  {
    id: number;
    review: TReviewPost;
  },
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('offer/sendComment', async ({ id, review }, { dispatch, extra: api }) => {
  const { data } = await api.post<TReview[]>(`${APIRoute.Reviews}/${id}`, {
    ...review,
  });

  return data;
});

export const toggleOfferFavoriteStatusAction = createAsyncThunk<
  {
    data: TPlaceCard;
    status: 0 | 1;
  },
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
  'offer/toggleOfferFavoriteStatus',
  async ({ id, status }, { dispatch, extra: api }) => {
    const { data } = await api.post<TPlaceCard>(
      `${APIRoute.Favorite}/${id}/${status}`
    );

    return { data, status };
  }
);

export const fetchFavoritesOffersAction = createAsyncThunk<
  TPlaceCard[],
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('user/fetchFavoritesOffers', async (_arg, { dispatch, extra: api }) => {
  const { data } = await api.get<TPlaceCard[]>(APIRoute.Favorite);

  return data;
});

export const checkAuthAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('user/checkAuth', async (_arg, { dispatch, extra: api }) => {
  await api.get(APIRoute.Login);
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

    dispatch(redirectToRoute(AppRoute.Favorites));
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
});
