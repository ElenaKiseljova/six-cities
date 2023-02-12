type TPlaceCard = {
  id: string;
  isPremium: boolean;
  image: string;
  price: number;
  rating: number;
  title: string;
  type: 'Private room' | 'Apartment';
  inBookmarks: boolean;
  city: string;
};

type TPlaceCardByCity = {
  [city: string]: TPlaceCard[];
};

export { TPlaceCard, TPlaceCardByCity };
