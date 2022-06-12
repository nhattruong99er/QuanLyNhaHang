import { Status } from './../models/status.model';
import { Injectable } from '@angular/core';
import { Restaurant } from '../models/restaurant.model';
import { Role } from '../models/role.model';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Table } from '../models/table.model';
import { Food } from '../models/food.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private REST_API_SERVER = environment.api;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-type': 'application/json',
      // Authorization: 'my-auth-token'
    }),
  };

  public loginUserId = 1;
  public restaurants: Restaurant[] = [];

  public newUser = {
      id: 0,
      userName: '',
      description: '',
      created: new Date(),
      updated: new Date(),
      deleted: false,
      createdUserId: 0,
      updatedUserId: 0,
  };

  public newRestaurant: Restaurant = {
    id: 0,
    name: '',
    description: '',
    phone: '',
    address:'',
    created: new Date(),
    updated: new Date(),
    deleted: false,
    createdUser: this.newUser,
    updatedUser: this.newUser,
  };

  public newStatus = {
    id: 0,
    name: '',
    description: '',
    created: new Date(),
    updated: new Date(),
    deleted: false,
    restaurant: this.newRestaurant,
    createdUser: this.newUser,
    updatedUser: this.newUser,
  };

  // public newLocation = {
  //   id: 0,
  //   name: '',
  //   description: '',
  //   created: new Date(),
  //   updated: new Date(),
  //   deleted: false,
  //   restaurant: this.newRestaurant,
  //   createdUser: this.newUser,
  //   updatedUser: this.newUser,
  // };

  // // phân trang
  // public newUnit = {
  //   id: 0,
  //   name: '',
  //   description: '',
  //   created: new Date(),
  //   updated: new Date(),
  //   deleted: false,
  //   restaurant: this.newRestaurant,
  //   createdUser: this.newUser,
  //   updatedUser: this.newUser,
  // };

  // public newSize = {
  //   id: 0,
  //   name: '',
  //   description: '',
  //   created: new Date(),
  //   updated: new Date(),
  //   deleted: false,
  // unit: this.newUnit,
  //   restaurant: this.newRestaurant,
  //   createdUser: this.newUser,
  //   updatedUser: this.newUser,
  // };

  public newFood = {
    id: 0,
    name: '',
    // image: '',
    category: '',
    price: 0,
    description: '',
    created: new Date(),
    updated: new Date(),
    deleted: false,
    restaurant: this.newRestaurant,
    createdUser: this.newUser,
    updatedUser: this.newUser,
  }

  public newGuestTable = {
    id: 0,
    name: '',
    description: '',
    created: new Date(),
    updated: new Date(),
    deleted: false,
    restaurant: this.newRestaurant,
    // location: this.newLocation,
    status: this.newStatus,
    createdUser: this.newUser,
    updatedUser: this.newUser,
  };

  public newTable = {
    id: 0,
    name: '',
    area: '',
    status: '',
    description: '',
    created: new Date(),
    updated: new Date(),
    deleted: false,
    restaurant: this.newRestaurant,

    createdUser: this.newUser,
    updatedUser: this.newUser,
  }

  public newRole: Role = {
    id: 0,
    name: '',
    description: '',
    created: new Date(),
    updated: new Date(),
    deleted: false,
    restaurant: this.newRestaurant,
    createdUser: this.newUser,
    updatedUser: this.newUser,
  };

  public selectedRestaurant$ = new BehaviorSubject<Restaurant>(
    this.newRestaurant
  );

  constructor(private httpClient: HttpClient) { }

  // public loadRestaurants(): void{
  //   this.getAllRestaurants().subscribe((data) => {
  //     if(data){
  //       this.restaurants = data;
  //       console.log('contructor: restaurant: ', data);
  //     }
  //   });
  // }

  //----------------------------------------------- Restaurant -----------------------------------------------------
  public getAllRestaurants(): Observable<Restaurant[]>{
    const url = `${this.REST_API_SERVER}/restaurant`;
    return this.httpClient.get<Restaurant[]>(url,this.httpOptions);
  }

  public postRestaurant(payload: Restaurant): Observable<Restaurant>{
    const url = `${this.REST_API_SERVER}/restaurant`;
    return this.httpClient.post<Restaurant>(url,payload,this.httpOptions);
  }

  public putRestaurant(payload: Restaurant): Observable<Restaurant>{
    const url = `${this.REST_API_SERVER}/restaurant`;
    return this.httpClient.put<Restaurant>(url, payload,this.httpOptions);
  }

    //----------------------------------------------- Status -----------------------------------------------------

  public getAllStatuses(): Observable<Status[]>{
    const url = `${this.REST_API_SERVER}/status`;
    return this.httpClient.get<Status[]>(url,this.httpOptions);
  }

  public postStatus(payload: Status): Observable<Status>{
    const url = `${this.REST_API_SERVER}/status`;
    return this.httpClient.post<Status>(url,payload,this.httpOptions);
  }

  public putStatus(payload: Status): Observable<Status>{
    const url = `${this.REST_API_SERVER}/status`;
    return this.httpClient.put<Status>(url, payload,this.httpOptions);
  }

  //----------------------------------------------- Role -----------------------------------------------------

  public getAllRoles(): Observable<Role[]> {
    const url = `${this.REST_API_SERVER}/role`;
    return this.httpClient.get<Role[]>(url, this.httpOptions);
  }

  public postRole(payload: Role): Observable<Role>{
    const url = `${this.REST_API_SERVER}/role`;
    return this.httpClient.post<Role>(url,payload,this.httpOptions);
  }

  //---------------------------------------------------Table----------------------------------------------------

  public getAllTables(): Observable<Table[]>{
    const url = `${this.REST_API_SERVER}/table`;
    return this.httpClient.get<Table[]>(url,this.httpOptions);
  }

  public postTable(payload: Table): Observable<Table>{
    const url = `${this.REST_API_SERVER}/table`;
    return this.httpClient.post<Table>(url,payload,this.httpOptions);
  }

  public putTable(payload: Table): Observable<Table>{
    const url = `${this.REST_API_SERVER}/table`;
    return this.httpClient.put<Table>(url, payload,this.httpOptions);
  }

    //---------------------------------------------------Food----------------------------------------------------

    public getAllFoods(): Observable<Food[]>{
      const url = `${this.REST_API_SERVER}/food`;
      return this.httpClient.get<Food[]>(url,this.httpOptions);
    }

    public postFood(payload: Food): Observable<Food>{
      const url = `${this.REST_API_SERVER}/food`;
      return this.httpClient.post<Food>(url,payload,this.httpOptions);
    }

    public putFood(payload: Food): Observable<Food>{
      const url = `${this.REST_API_SERVER}/food`;
      return this.httpClient.put<Food>(url, payload,this.httpOptions);
    }
}
