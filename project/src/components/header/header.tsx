import {Link, useMatch } from 'react-router-dom';

import {AppRoute, AuthorizationStatus} from '../../const';

import { getUserData } from '../../services/user';

import {useAppDispatch, useAppSelector} from '../../hooks';

import {logoutAction} from '../../store/api-actions';

function Header(): JSX.Element {
  const isLoginPage = useMatch(AppRoute.Login);

  const dispatch = useAppDispatch();

  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);

  const userEmail = getUserData('email');
  const userAvatar = getUserData('avatarUrl');

  const logoutHandler = () => {
    dispatch(logoutAction());
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link
              className="header__logo-link header__logo-link--active"
              to={AppRoute.Root}
            >
              <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
            </Link>
          </div>
          {!isLoginPage &&
            <nav className="header__nav">
              <ul className="header__nav-list">
                {authorizationStatus === AuthorizationStatus.Auth &&
                  <>
                    <li className="header__nav-item user">
                      <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Favorites}>
                        <div
                          className="header__avatar-wrapper user__avatar-wrapper"
                          style={{backgroundImage: `url(${userAvatar as string})`, borderRadius: '50%'}}
                        >
                        </div>
                        <span className="header__user-name user__name">{userEmail}</span>
                      </Link>
                    </li>
                    <li className="header__nav-item">
                      <button
                        className="header__nav-link button"
                        onClick={logoutHandler}
                      >
                        <span className="header__signout">Sign out</span>
                      </button>
                    </li>
                  </>}
                {authorizationStatus !== AuthorizationStatus.Auth &&
                  <li className="header__nav-item user">
                    <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Login}>
                      <div className="header__avatar-wrapper user__avatar-wrapper">
                      </div>
                      <span className="header__login">Sign in</span>
                    </Link>
                  </li>}
              </ul>
            </nav>}
        </div>
      </div>
    </header>
  );
}

export default Header;
