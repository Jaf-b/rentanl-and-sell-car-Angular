import {Component} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-promote',
  imports: [MatCardModule, MatButtonModule, MatIconModule, RouterOutlet],
  template: `
    <router-outlet></router-outlet>
  `,
  styles: ``,
})
export default class PromoteComponent {


}
