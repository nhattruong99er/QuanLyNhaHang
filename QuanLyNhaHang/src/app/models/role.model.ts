import { User } from './user.model';
import { Restaurant } from './restaurant.model';
export interface Role{
  id: number;
  name: string;
  description: string;
  created: Date;
  updated: Date;
  deleted: boolean;
  restaurant: Restaurant;
  createdUser: User;
  updatedUser: User;
}
