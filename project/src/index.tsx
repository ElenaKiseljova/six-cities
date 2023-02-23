import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import { store } from './store';

import {user} from './mocks/user';
import {offers, nearbyOffers} from './mocks/offers';
import {reviews} from './mocks/reviews';
import {points, nearbyPoints} from './mocks/points';

import App from './components/app/app';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App
        user={user}
        offers={offers}
        nearbyOffers={nearbyOffers}
        nearbyPoints={nearbyPoints}
        points={points}
        reviews={reviews}
      />
    </Provider>
  </React.StrictMode>,
);
