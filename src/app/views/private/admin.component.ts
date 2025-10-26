import {Component} from '@angular/core';
import {SidebarComponent} from './shared/sidebar/sidebar.component';
import { ToolbarComponent } from './shared/toolbar/toolbar.component';

@Component({
  selector: 'app-admin',
  imports: [
    SidebarComponent,
    ToolbarComponent,
  ],
  template: `
    <app-toolbar/>
    <app-sidebar/>
  `,
  styles: ``
})
export class AdminComponent {

}
