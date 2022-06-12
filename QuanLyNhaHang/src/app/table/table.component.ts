import { DataService } from './../services/data.service';
import { Table } from './../models/table.model';
import { Restaurant } from './../models/restaurant.model';
import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  constructor(
    private dataService: DataService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  public tables: Table[] = [];
  public displayTables: Table[] = [];
  public tableDialog = false;
  public table: Table = Object.assign({}, this.dataService.newTable);
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
    this.loadTables();
  }

  private loadTables(){
    this.loading = true;
      this.dataService.getAllTables().subscribe((data) => {
        this.tables = data;
        this.displayTables = this.tables.filter(
          (table) => table.restaurant.id === this.selectedRestaurant?.id
        );
        this.loading = false;
        console.log('Table: ', data);
      });
  }

  public editTable(table: Table): void{
    console.log('edit table:', table);
    this.table = table;
    this.tableDialog = true;
  }

  public deleteTable(table: Table): void{
    console.log('delete table: ', table);
    this.confirmationService.confirm({
      message: 'Bạn chắc chắn muốn xóa ' + table.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        table.deleted = true;
        console.log('xóa: ', table);
        this.dataService.putTable(table).subscribe(data => {
          console.log('xóa xong: ', data);
          this.loadTables();
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
    this.table = Object.assign({}, this.dataService.newTable);
    this.table.restaurant.id = this.selectedRestaurant.id;
    this.tableDialog = true;
  }

  public hideDialog(cancle = true, success = true): void{
    console.log('hideDialog: ');
    this.tableDialog = false;
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

  public saveTable(): void{
    console.log('saveTable: ', this.table);
    if(this.table.id === 0){
      this.table.createdUser.id = this.dataService.loginUserId;
      this.table.updatedUser.id = this.dataService.loginUserId;
      // this.table.restaurant.id = 1;
      this.dataService.postTable(this.table).subscribe(
        (data) => {
          console.log('return data = ',data);
          this.tables.push(data);
          this.displayTables = this.tables.filter(
            (table) => table.restaurant.id === this.selectedRestaurant?.id);
          this.hideDialog(false, true);
        },
        (error) => {
          console.log('error');
          this.hideDialog(false,false);
        }
      );
    } else {
      this.table.updatedUser.id = this.dataService.loginUserId;
      this.dataService.putTable(this.table).subscribe(
        (data) => {
          console.log('return data = ',data);
          this.loadTables();
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
    this.displayTables = this.tables.filter(
      (table) => table.restaurant.id === restaurant.id);
      console.log('on change this.diplayTables = ', this.displayTables);
  }
}
