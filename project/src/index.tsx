import React from 'react';
import ReactDOM from 'react-dom/client';

import {user} from './mocks/user';
import {cities} from './mocks/cities';
import {offers, nearbyOffers} from './mocks/offers';
import {reviews} from './mocks/reviews';
import {points, nearbyPoints} from './mocks/points';

import App from './components/app/app';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <App user={user} cities={cities} offers={offers} nearbyOffers={nearbyOffers} nearbyPoints={nearbyPoints} points={points} reviews={reviews} />
  </React.StrictMode>,
);
