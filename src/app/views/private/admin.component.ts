import {Component} from '@angular/core';
import {SidebarComponent} from './shared/sidebar/sidebar.component';

@Component({
  selector: 'app-admin',
  imports: [
    SidebarComponent
  ],
  template: `
    <app-sidebar/>
  `,
  styles: ``
})
export class AdminComponent {

}
