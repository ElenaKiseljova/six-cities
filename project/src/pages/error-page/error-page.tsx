import {useAppDispatch} from '../../hooks';

import {fetchOffersAction} from '../../store/api-actions';

import './error-page.css';

function ErrorPage(): JSX.Element {
  const dispatch = useAppDispatch();

  return (
    <div className="error">
      <p className="error__text">Failed to load hotels data</p>
      <button
        onClick={() => {
          dispatch(fetchOffersAction());
        }}
        className="error__button login__submit form__submit button"
        type="button"
      >
        Try again
      </button>
    </div>
  );
}

export default ErrorPage;
