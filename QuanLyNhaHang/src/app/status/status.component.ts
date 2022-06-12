import { DataService } from './../services/data.service';
import { Status } from './../models/status.model';
import { Restaurant } from './../models/restaurant.model';
import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent implements OnInit {

  constructor(
    private dataService: DataService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  public statuses: Status[] = [];
  public displayStatuses: Status[] = [];
  public statusDialog = false;
  public status: Status = Object.assign({}, this.dataService.newStatus);
  public submitted = true;
  public loading = true;
  public selectedRestaurant: Restaurant | undefined;;
  // public restaurants: Restaurant[] = [];

  ngOnInit(): void {
    // this.loadRestaurants();
    this.dataService.selectedRestaurant$.subscribe((restaurant) => {
      this.selectedRestaurant = restaurant;
    });
    if(!this.selectedRestaurant || this.selectedRestaurant.id === 0){
      this.router.navigate(['/']);
    }
    console.log('Selected Restaurant: ', this.selectedRestaurant);
    this.loadStatuses();
  }

  // private loadRestaurants(){
  //   // this.loading = true;
  //     this.dataService.getAllRestaurants().subscribe((data) => {
  //       this.restaurants = data;
  //       // this.loading = false;
  //       console.log('StatusComponent: Restaurant: ', data);
  //     });
  // }

  private loadStatuses(){
    this.loading = true;
      this.dataService.getAllStatuses().subscribe((data) => {
        this.statuses = data;
        this.displayStatuses = this.statuses.filter(
          (status) => status.restaurant.id === this.selectedRestaurant?.id
        );
        this.loading = false;
        console.log('Status: ', data);
      });
  }

  public editStatus(status: Status): void{
    console.log('edit status:', status);
    this.status = status;
    this.statusDialog = true;
  }

  public deleteStatus(status: Status): void{
    console.log('delete status: ', status);
    this.confirmationService.confirm({
      message: 'Bạn chắc chắn muốn xóa ' + status.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        status.deleted = true;
        console.log('xóa: ', status);
        this.dataService.putStatus(status).subscribe(data => {
          console.log('xóa xong: ', data);
          this.loadStatuses();
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
    if(!this.selectedRestaurant){
      this.messageService.add({
        severity: 'error',
        summary: 'Lỗi',
        detail: 'Chưa chọn nhà hàng',
        life: 3000,
      });
      return;
    }
    console.log('openNew:');
    this.status = Object.assign({}, this.dataService.newStatus);
    this.status.restaurant.id = this.selectedRestaurant.id;
    this.statusDialog = true;
  }

  public hideDialog(cancle = true, success = true): void{
    console.log('hideDialog: ');
    this.statusDialog = false;
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
        detail: 'Thêm mới thành công',
        life: 3000,
      });
    }else{
      this.messageService.add({
        severity: 'error',
        summary: 'Lỗi',
        detail: 'Thêm bị lỗi',
        life: 3000,
      });
    }
  }

  public saveStatus(): void{
    console.log('saveStatus: ', this.status);
    if(this.status.id === 0){
      this.status.createdUser.id = this.dataService.loginUserId;
      this.status.updatedUser.id = this.dataService.loginUserId;
      // this.status.restaurant.id = 1;
      this.dataService.postStatus(this.status).subscribe(
        (data) => {
          console.log('return data = ',data);
          this.statuses.push(data);
          this.displayStatuses = this.statuses.filter(
            (status) => status.restaurant.id === this.selectedRestaurant?.id);
          this.hideDialog(false, true);
        },
        (error) => {
          console.log('error');
          this.hideDialog(false,false);
        }
      );
    } else {
      this.status.updatedUser.id = this.dataService.loginUserId;
      this.dataService.putStatus(this.status).subscribe(
        (data) => {
          console.log('return data = ',data);
          this.loadStatuses();
          this.hideDialog(false, true);
        },
        (error) => {
          console.log('error');
          this.hideDialog(false,false);
        }
      );
    }
  }

  public onRestaurantChange(event:any): void{
    const restaurant: Restaurant = event;
    console.log('on change = ',restaurant);
    this.displayStatuses = this.statuses.filter(
      (status) => status.restaurant.id === restaurant.id);
      console.log('on change this.diplayStatuses = ', this.displayStatuses);
  }
}
