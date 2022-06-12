import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Restaurant } from '../models/restaurant.model';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.scss']
})
export class RestaurantComponent implements OnInit {

  constructor(
    private dataService: DataService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) { }

  public restaurants: Restaurant[] = [];
  public restaurantDialog = false;
  private exportColumns = ['Tên','Địa chỉ','Điện thoại','Chú thích'];

  public restaurant: Restaurant = Object.assign({}, this.dataService.newRestaurant);

  public submitted = true;
  public loading = true;

  ngOnInit(): void {
    this.loadRestaurants();
  }

  private loadRestaurants(){
    this.loading = true;
      this.dataService.getAllRestaurants().subscribe((data) => {
        this.restaurants = data;
        this.loading = false;
        console.log('Restaurant: ', data);
      });
  }

  public editRestaurant(restaurant: Restaurant): void{
    console.log('edit restaurant:', restaurant);
    this.restaurant = restaurant;
    this.restaurantDialog = true;
  }

  public deleteRestaurant(restaurant: Restaurant): void{
    console.log('delete restaurant: ', restaurant);
    this.confirmationService.confirm({
      message: 'Bạn chắc chắn muốn xóa ' + restaurant.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        restaurant.deleted = true;
        console.log('xóa: ', restaurant);
        this.dataService.putRestaurant(restaurant).subscribe(data => {
          console.log('xóa xong: ', data);
          this.loadRestaurants();
          this.messageService.add({
            severity: 'success',
            summary: 'successful',
            detail: 'Đã xóa xong',
            life: 3000,
          });
        });

      }
    });
  }

  public openNew(): void{
    console.log('openNew:');
    this.restaurant = Object.assign({}, this.dataService.newRestaurant);
    this.restaurantDialog = true;
  }

  public hideDialog(cancle = true, success = true): void{
    console.log('hideDialog: ');
    this.restaurantDialog = false;
    if(cancle){
      this.messageService.add({
        severity: 'info',
        summary: 'Hủy',
        detail: 'Đổi ý, không muốn thêm!',
        life: 3000,
      });
    }else if(success){
      this.messageService.add({
        severity: 'success',
        summary: 'Thành công',
        detail: 'Thêm mới nhà hàng thành công',
        life: 3000,
      });
    }else{
      this.messageService.add({
        severity: 'error',
        summary: 'Lỗi',
        detail: 'Thêm nhà hàng bị lỗi',
        life: 3000,
      });
    }
  }

  public saveRestaurant(): void{
    console.log('saveRestaurant: ', this.restaurant);
    if(this.restaurant.id === 0){
      this.restaurant.createdUser.id = this.dataService.loginUserId;
      this.restaurant.updatedUser.id = this.dataService.loginUserId;

      this.dataService.postRestaurant(this.restaurant).subscribe(
        (data) => {
          console.log('return data = ',data);
          this.restaurants.push(data);
          this.hideDialog(false, true);
        },
        (error) => {
          console.log('error');
          this.hideDialog(false,false);
        }
      );
    } else {
      this.restaurant.updatedUser.id = this.dataService.loginUserId;
      this.dataService.putRestaurant(this.restaurant).subscribe(
        (data) => {
          console.log('return data = ',data);
          this.loadRestaurants();
          this.hideDialog(false, true);
        },
        (error) => {
          console.log('error');
          this.hideDialog(false,false);
        }
      );
    }
  }
}
