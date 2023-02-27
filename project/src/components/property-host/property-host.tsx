import { TPlaceCard } from '../../types/offers';

type TPropertyHostProps = {
  offer: TPlaceCard;
}
function PropertyHost({offer}: TPropertyHostProps):JSX.Element {
  const {host} = offer;

  return (
    <div className="property__host">
      <h2 className="property__host-title">Meet the host</h2>
      <div className="property__host-user user">
        <div className={`property__avatar-wrapper user__avatar-wrapper ${host.isPro ? 'property__avatar-wrapper--pro' : ''}`}>
          <img className="property__avatar user__avatar" src={host.avatarUrl} width="74" height="74" alt={host.name} />
        </div>
        <span className="property__user-name">
          {host.name}
        </span>
        <span className="property__user-status">
          {host.isPro ? 'Pro' : ''}
        </span>
      </div>
      <div className="property__description">
        {typeof offer.description === 'string' &&
          <p className="property__text">
            {offer.description}
          </p>}

        {Array.isArray(offer.description) &&
          offer.description.map((text, i) => (
            <p key={`${text}-${i + 1}`} className="property__text">
              {text}
            </p>
          ))}
      </div>
    </div>
  );
}

export default PropertyHost;
