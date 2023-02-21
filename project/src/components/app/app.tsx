import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {HelmetProvider} from 'react-helmet-async';

import { TPlaceCard } from '../../types/offers';
import { TReviews } from '../../types/reviews';
import { ICurUser } from '../../types/user';
import { TCity } from '../../types/city';
import { TPoint } from '../../types/points';

import {AppRoute, AuthorizationStatus} from '../../const';

import PrivateRoute from '../private-route/private-route';

import MainPage from '../../pages/main-page/main-page';
import FvoritesPage from '../../pages/favorites-page/favorites-page';
import LoginPage from '../../pages/login-page/login-page';
import PropertyPage from '../../pages/property-page/property-page';
import NotFoundPage from '../../pages/not-found-page/not-found';

type TAppProps = {
  user: ICurUser;
  cities: TCity[];
  offers: TPlaceCard[];
  nearbyOffers: TPlaceCard[];
  nearbyPoints: TPoint[];
  points: TPoint[];
  reviews: TReviews;
}

function App(props: TAppProps): JSX.Element {
  const {user, cities, offers, nearbyOffers, nearbyPoints, points, reviews} = props;

  return (
    <>
      <div style={{display: 'none'}}>
        <svg xmlns="http://www.w3.org/2000/svg"><symbol id="icon-arrow-select" viewBox="0 0 7 4"><path fillRule="evenodd" clipRule="evenodd" d="M0 0l3.5 2.813L7 0v1.084L3.5 4 0 1.084V0z"></path></symbol><symbol id="icon-bookmark" viewBox="0 0 17 18"><path d="M3.993 2.185l.017-.092V2c0-.554.449-1 .99-1h10c.522 0 .957.41.997.923l-2.736 14.59-4.814-2.407-.39-.195-.408.153L1.31 16.44 3.993 2.185z"></path></symbol><symbol id="icon-star" viewBox="0 0 13 12"><path fillRule="evenodd" clipRule="evenodd" d="M6.5 9.644L10.517 12 9.451 7.56 13 4.573l-4.674-.386L6.5 0 4.673 4.187 0 4.573 3.549 7.56 2.483 12 6.5 9.644z"></path></symbol></svg>
      </div>

      <HelmetProvider>
        <BrowserRouter>
          <Routes>
            <Route path={AppRoute.Root}>
              <Route
                path={`${AppRoute.Root}:city`}
                element={
                  <MainPage
                    cities={cities}
                    offers={offers}
                    points={points}
                  />
                }
              />
              <Route
                path={''}
                element={
                  <MainPage
                    cities={cities}
                    offers={offers}
                    points={points}
                  />
                }
              />
            </Route>
            <Route
              path={`${AppRoute.Property}/:id`}
              element={
                <PropertyPage
                  user={user}
                  offers={offers}
                  points={points}
                  nearbyOffers={nearbyOffers}
                  nearbyPoints={nearbyPoints}
                  reviews={reviews}
                  isLoggedIn
                  onSendReview={() => {
                    throw new Error('Function \'onSendReview\' isn\'t implemented.');
                  }}
                />
              }
            />
            <Route
              path={AppRoute.Login}
              element={<LoginPage cities={cities} />}
            />
            <Route
              path={AppRoute.Favorites}
              element={
                <PrivateRoute
                  authorizationStatus={AuthorizationStatus.Auth}
                >
                  <FvoritesPage
                    user={user}
                  />
                </PrivateRoute>
              }
            />
            <Route
              path="*"
              element={<NotFoundPage />}
            />
          </Routes>
        </BrowserRouter>
      </HelmetProvider>
    </>
  );
}

export default App;
