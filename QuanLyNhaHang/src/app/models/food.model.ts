import { Restaurant } from './restaurant.model';
import { User } from './user.model';

export interface Food {
  id: number,
  name: string,
  category: string,

  // image: ImageData,
  price: number,
  description: string,
  created: Date,
  updated: Date,
  deleted: false,
  restaurant: Restaurant,
  createdUser: User,
  updatedUser: User,
}
