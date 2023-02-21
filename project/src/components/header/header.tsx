import {Link} from 'react-router-dom';

import {useAppDispatch} from '../../hooks';

import {setCity} from '../../store/action';

import {AppRoute} from '../../const';

import {user} from '../../mocks/user';

function Header(): JSX.Element {
  const dispatch = useAppDispatch();

  const isLoggedIn = true;

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link
              className="header__logo-link header__logo-link--active"
              to={AppRoute.Root}
              onClick={() => dispatch(setCity(undefined))}
            >
              <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
            </Link>
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              {isLoggedIn &&
                <>
                  <li className="header__nav-item user">
                    <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Favorites}>
                      <div className="header__avatar-wrapper user__avatar-wrapper">
                      </div>
                      <span className="header__user-name user__name">{user.email}</span>
                    </Link>
                  </li>
                  <li className="header__nav-item">
                    <a className="header__nav-link" href="#top">
                      <span className="header__signout">Sign out</span>
                    </a>
                  </li>
                </>}
              {!isLoggedIn &&
                <li className="header__nav-item user">
                  <a className="header__nav-link header__nav-link--profile" href={AppRoute.Login}>
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__login">Sign in</span>
                  </a>
                </li>}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
