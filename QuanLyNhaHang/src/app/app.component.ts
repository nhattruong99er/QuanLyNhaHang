import { Router, ActivatedRoute } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router ){}

  title = 'Quản lý nhà hàng - Admin';
  items: MenuItem[] = [];

  ngOnInit(){
    this.items = [
      {
        label: 'Nhà hàng',
        icon: 'pi pi-fw pi-home',
        // command: () => this.router.navigate(['/restaurant']),
        routerLink: ['/restaurant'],
        routerLinkActiveOptions: {
          exact: true,
        }
      },

      {
        label: 'Quyền',
        icon: 'pi pi-fw pi-user-edit',
        // command: () => this.router.navigate(['/role']),
        routerLink: ['/role'],
        routerLinkActiveOptions: {
          exact: true,
        }
      },

      {
        label: 'Tình trạng',
        icon: 'pi pi-fw pi-flag',
        // command: () => this.router.navigate(['/role']),
        routerLink: ['/status'],
        routerLinkActiveOptions: {
          exact: true,
        }
      },

      {
        label: 'Quản lý thức ăn',
        icon: 'pi pi-fw pi-share-alt',
        // command: () => this.router.navigate(['/qlthucan']),
        routerLink: ['/food'],
        routerLinkActiveOptions: {
          exact: true,
        }
      },

      {
        label: 'Bàn ăn',
        icon: 'pi pi-fw pi-table',
        // command: () => this.router.navigate(['/banan']),
        routerLink: ['/table'],
        routerLinkActiveOptions: {
          exact: true,
        }
      },

      {
        label: 'Login',
        icon: 'pi pi-fw pi-sign-in',
        // command: () => this.router.navigate(['/login']),
        routerLink: ['/login'],
        routerLinkActiveOptions: {
          exact: true,
        }
      },
    ];
  }
}
