import { Restaurant } from './restaurant.model';
import { User } from './user.model';

export interface Table {
  id: number;
  name: string;
  area: string,
  status: string,
  description: string;
  created: Date;
  updated: Date;
  deleted: boolean;
  restaurant: Restaurant;
  createdUser: User;
  updatedUser: User;
}
