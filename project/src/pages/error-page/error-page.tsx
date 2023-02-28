import {useAppDispatch} from '../../hooks';
import {fetchOffersAction} from '../../store/api-actions';

function ErrorPage(): JSX.Element {
  const dispatch = useAppDispatch();

  return (
    <>
      <p className="error__text">Failed to load hotels data</p>
      <button
        onClick={() => {
          dispatch(fetchOffersAction());
        }}
        className="replay replay--error"
        type="button"
      >
        Try again
      </button>
    </>
  );
}

export default ErrorPage;
