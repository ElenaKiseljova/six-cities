import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';

/** Test START */
// import FavoritesPage from './components/favorites-page/favorites-page';
// import LoginPage from './components/login-page/login-page';
// import PropertyPage from './components/property-page/property-page';
/** Test END */

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <App placesCount={133} />

    {/** Test START */}
    {/* <FavoritesPage /> */}
    {/* <LoginPage /> */}
    {/* <PropertyPage isLoggedIn={false} /> */}
    {/** Test END */}
  </React.StrictMode>,
);
