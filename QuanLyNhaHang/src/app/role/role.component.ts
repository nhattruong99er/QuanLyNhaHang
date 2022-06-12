import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Role } from '../models/role.model';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent implements OnInit {

  constructor(private dataService: DataService) { }

  roles: Role[] = [];

  ngOnInit(): void {
    this.dataService.getAllRoles().subscribe((data) =>{
      this.roles = data;
      console.log('Role: ', data);
    })
  }

}
