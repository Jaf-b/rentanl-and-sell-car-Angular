import {Component} from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {MatDivider, MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuItem} from '@angular/material/menu';

@Component({
  selector: 'app-sidebar',
  imports: [
    MatSidenavModule,
    RouterOutlet,
    MatDividerModule,
    MatIconModule,
    MatMenuItem,
    RouterLinkActive,
    RouterLink,
  ],
  template: `
    <mat-drawer-container autosize>
      <mat-drawer #drawer mode="side" opened>
        <div>
          <a mat-menu-item routerLink="./dashboard" routerLinkActive="active-link">
            <mat-icon>home</mat-icon>
            <span>Dashboard</span>
          </a>
          <a routerLink="./inventory" mat-menu-item routerLinkActive="active-link">
            <mat-icon>warehouse</mat-icon>
            <span>Inventory</span>
          </a>
          <a routerLink="./caisse" mat-menu-item routerLinkActive="active-link">
            <mat-icon>paid</mat-icon>
            <span>Promote</span>
          </a>
          <a routerLink="./setting" mat-menu-item routerLinkActive="active-link">
            <mat-icon>settings</mat-icon>
            <span>Settings</span>
          </a>
        </div>
      </mat-drawer>
      <mat-divider/>
      <mat-drawer-content class="sidenav-content">
        <router-outlet/>
      </mat-drawer-content>
    </mat-drawer-container>
  `,
  styles: `
    mat-drawer-container {
      height: calc(100vh - 65px);
      display: flex;
      flex-direction: column;
    }

    mat-drawer {
      width: 220px;
      border-right: 1px solid var(--mat-sys-outline-variant);
      border-radius: 0;
    }

    .active-link {
      background-color: var(--mat-sys-outline-variant);
    }

    .active {
      background-color: var(--mat-sys-outline-variant);
    }

    a {
      display: flex;
      align-items: center;
    }
  `,
})
export class SidebarComponent {
}
