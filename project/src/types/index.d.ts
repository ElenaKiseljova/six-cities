export type TPlaceCard = {
  id: string;
  isPremium: boolean;
  image: string;
  price: number;
  rating: number;
  title: string;
  type: 'Private room' | 'Apartment';
  inFavorites: boolean;
  city: string;
};

export type TPlaceCardByCity = {
  [city: string]: TPlaceCard[];
};

export type TCity = string;
