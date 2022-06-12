export interface User {
  id: number;
  userName: string;
  description: string
  created: Date;
  updated: Date;
  deleted: boolean
  createdUserId: number;
  updatedUserId: number;
}
