import { TPlaceCard } from '../../types/offers';

type TPropertyInsideProps = {
  offer: TPlaceCard;
}
function PropertyInside({offer}: TPropertyInsideProps):JSX.Element {
  return (
    <div className="property__inside">
      <h2 className="property__inside-title">What&apos;s inside</h2>
      <ul className="property__inside-list">
        {
          offer.goods.map((feature) => (
            <li key={feature} className="property__inside-item">
              {feature}
            </li>
          ))
        }
      </ul>
    </div>
  );
}

export default PropertyInside;
