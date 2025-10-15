import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBar } from '@angular/material/progress-bar';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-dashboard',
  imports: [MatCardModule, MatTableModule, MatIconModule, MatButtonModule, MatProgressBar],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export default class DashboardComponent {
  displayedColumns: string[] = ['order', 'client', 'date', 'amount', 'status'];
  data: string[] = ['one', 'two', 'three', 'four', 'five'];
}
