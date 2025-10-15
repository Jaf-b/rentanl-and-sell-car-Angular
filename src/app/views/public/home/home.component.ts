import {Component, inject, OnInit} from '@angular/core';
import {ToolbarComponent} from '../../private/shared/toolbar/toolbar.component';
import {SidebarComponent} from '../../private/shared/sidebar/sidebar.component';
import {MatCardModule} from '@angular/material/card';
import {Router, RouterLink} from '@angular/router';
import {CardComponent} from '../shared/card.component';
import {databaseService} from '../../../core/service/database.service';
import {toObservable, toSignal} from '@angular/core/rxjs-interop';
import {carModel} from '../../../core/model/car-model';

@Component({
  selector: 'app-home',
  imports: [MatCardModule, CardComponent],
  template: `
    <div class="container">
      <mat-card>
        <img src="./img/sara-kurfess-6AT_1VDx-GQ-unsplash.jpg" alt="" srcset="">
      </mat-card>
    </div>
    <br> <br>
    <h1 style="text-align: center">Découvrez nos Collections</h1>
    <br>
    <div class="container2 max-width">
      @for (car of carList(); track $index) {
        <app-card (click)="Details(car?._id)" style="cursor:pointer" [img]="car.images[0]" [Marque]="car.marque"
                  [Modele]="car.modele"
                  [anneeFabrication]="car.anneeFabrication"
                  [Price]="car.price"/>
      }

    </div>

  `,
  styles: `
    mat-card {
      padding: 0.1rem;
      margin-top: 1rem;
      width: 90%;
      height: 400px;
    }

    .container {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 10px;
    }

    .container2 {
      display: flex;
      gap: 1rem;
    }



  `,
})
export default class HomeComponent {
  protected readonly route = inject(Router)
  protected readonly db = inject(databaseService)
  carList = toSignal(this.db.getCars());

  Details(id: any) {
    this.route.navigateByUrl(`/details/${id}`);
  }


}
