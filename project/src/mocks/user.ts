import { ICurUser } from '../types/user';
import { offers } from './offers';

export const user: ICurUser = {
  id: 7,
  email: 'e.a.kiseljova@gmail.com',
  favorites: offers.slice(0, 3),
};
