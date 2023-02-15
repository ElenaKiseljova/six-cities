import { ICurUser } from '../types/user';
import { offers } from './offers';

export const user: ICurUser = {
  id: 7,
  email: 'e.a.kiseljova@gmail.com',
  favorites: offers.slice(0, 3),
  name: 'Elena',
  img: 'https://media.istockphoto.com/id/621597534/photo/rocking-astronaut-3d-render.jpg?s=612x612&w=0&k=20&c=emqBQYYXXSROroIUka4aZN08FTYbh3T4uZY18s_pAIQ=',
};
