import {Routes, Route} from 'react-router-dom';
import {HelmetProvider} from 'react-helmet-async';

import browserHistory from '../../browser-history';

import {AppRoute} from '../../const';

import {useAppSelector} from '../../hooks';

import { getAuthCheckedStatus } from '../../store/user-process/selectors';
import { getDataLoadingStatus, getErrorStatus } from '../../store/data-process/selectors';

import HistoryRouter from '../history-route/history-route';

import PrivateRoute from '../private-route/private-route';

import LoadingPage from '../../pages/loading-page/loading-page';
import MainPage from '../../pages/main-page/main-page';
import FvoritesPage from '../../pages/favorites-page/favorites-page';
import LoginPage from '../../pages/login-page/login-page';
import PropertyPage from '../../pages/property-page/property-page';
import NotFoundPage from '../../pages/not-found-page/not-found';
import ErrorPage from '../../pages/error-page/error-page';

function App(): JSX.Element {
  const isAuthChecked = useAppSelector(getAuthCheckedStatus);
  const isOffersDataLoading = useAppSelector(getDataLoadingStatus);
  const hasError = useAppSelector(getErrorStatus);

  if (!isAuthChecked || isOffersDataLoading) {
    return (
      <LoadingPage />
    );
  }

  if (hasError) {
    return (
      <ErrorPage />);
  }

  return (
    <>
      <div style={{display: 'none'}}>
        <svg xmlns="http://www.w3.org/2000/svg"><symbol id="icon-arrow-select" viewBox="0 0 7 4"><path fillRule="evenodd" clipRule="evenodd" d="M0 0l3.5 2.813L7 0v1.084L3.5 4 0 1.084V0z"></path></symbol><symbol id="icon-bookmark" viewBox="0 0 17 18"><path d="M3.993 2.185l.017-.092V2c0-.554.449-1 .99-1h10c.522 0 .957.41.997.923l-2.736 14.59-4.814-2.407-.39-.195-.408.153L1.31 16.44 3.993 2.185z"></path></symbol><symbol id="icon-star" viewBox="0 0 13 12"><path fillRule="evenodd" clipRule="evenodd" d="M6.5 9.644L10.517 12 9.451 7.56 13 4.573l-4.674-.386L6.5 0 4.673 4.187 0 4.573 3.549 7.56 2.483 12 6.5 9.644z"></path></symbol></svg>
      </div>

      <HelmetProvider>
        <HistoryRouter history={browserHistory}>
          <Routes>
            <Route path={AppRoute.Root}>
              <Route
                path={`${AppRoute.Root}:city`}
                element={
                  <MainPage />
                }
              />
              <Route
                path={''}
                element={
                  <MainPage />
                }
              />
            </Route>
            <Route
              path={`${AppRoute.Property}/:id`}
              element={
                <PropertyPage />
              }
            />
            <Route
              path={AppRoute.Login}
              element={
                <LoginPage />
              }
            />
            <Route
              path={AppRoute.Favorites}
              element={
                <PrivateRoute>
                  <FvoritesPage />
                </PrivateRoute>
              }
            />
            <Route
              path="*"
              element={<NotFoundPage />}
            />
          </Routes>
        </HistoryRouter>
      </HelmetProvider>
    </>
  );
}

export default App;
