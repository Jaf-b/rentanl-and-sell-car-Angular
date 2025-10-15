import {Component} from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {MatTabsModule} from '@angular/material/tabs';

@Component({
  selector: 'app-inventory',
  imports: [RouterOutlet, MatTabsModule, RouterLink, RouterLinkActive],
  template: `
    <nav mat-tab-nav-bar mat-align-tabs="center" [tabPanel]="tabNavPanel">
      <a mat-tab-link routerLink="./supplying" routerLinkActive="active"
      >Approvisionnement</a
      >
      <a mat-tab-link routerLink="./reservation" routerLinkActive="active">Reservations</a>
      <a mat-tab-link routerLink="./sales" routerLinkActive="active">Ventes</a>
      <a mat-tab-link routerLink="./stock" routerLinkActive="active">stock</a>
    </nav>
    <mat-tab-nav-panel #tabNavPanel></mat-tab-nav-panel>
    <router-outlet/>
  `,
  styles: `
    .active {
      background-color: gray;
      transition: 0.5s all ease-in-out;
    }
  `,
})
export default class InventoryComponent {
}
