import {Component, inject} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {SidebarComponent} from './views/private/shared/sidebar/sidebar.component';
import {ToolbarComponent} from './views/private/shared/toolbar/toolbar.component';
import {AuthService, User} from './core/service/auth.service';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ToolbarComponent, MatButtonModule],
  template: `
    <app-toolbar/>
    <router-outlet/>
  `,
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'manage-shop';
}
