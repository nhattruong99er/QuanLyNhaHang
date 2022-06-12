import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { DataService } from '../services/data.service';
import { Restaurant } from '../models/restaurant.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private dataService: DataService,
  ) { }
  public loading = true;
  public restaurants: Restaurant[] = [];
  public selectedRestaurant: Restaurant | undefined;

  ngOnInit(): void {
    this.loadRestaurants();
  }

  public loadRestaurants(): void {
    this.loading = true;
    this.dataService.getAllRestaurants().subscribe((data) => {
      if(data){
        this.dataService.restaurants = this.restaurants;
        console.log('Restaurants: ', this.dataService.restaurants);
        this.loading = false;
      }
    });
  }

  public onRestaurantChange(event: any): void{
    const restaurant: Restaurant = event;
    this.dataService.selectedRestaurant$.next(restaurant);
    console.log('Setected Restaurant: ', restaurant);
  }
}

