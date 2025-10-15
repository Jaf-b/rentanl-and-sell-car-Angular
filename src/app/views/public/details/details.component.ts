import {Component, inject, input, OnInit} from '@angular/core';
import {databaseService} from '../../../core/service/database.service';
import {toSignal} from '@angular/core/rxjs-interop';
import {AsyncPipe, JsonPipe} from '@angular/common';
import {map} from 'rxjs';
import {MatCard, MatCardModule} from '@angular/material/card';
import {carModel} from '../../../core/model/car-model';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-details',
  imports: [
    MatCardModule,
    MatButtonModule,
  ],
  template: `
    <div style="display: flex;flex-direction: row-reverse;justify-content:start;padding:1rem;gap:0.5rem">
      <mat-card style="width: 25%;height:500px;">
        <mat-card-content>
          <h1>{{ cars.marque }} {{ cars.modele }} | {{ cars.anneeFabrication }}</h1>
          <span></span>
          <br>
          <span>Transmission : {{ cars.transmission }}</span>
          <br>
          <br>
          <h1>{{ cars.price }}$</h1>
          <br>
          <button style="width:100%;margin-bottom: 0.5rem" mat-stroked-button type="button">Ajouter au Panier</button>
          <button style="width:100%" mat-flat-button type="button">{{ cars.isForSell ? "Acheter" : "Louer" }}</button>
        </mat-card-content>
      </mat-card>
      <mat-card style="display:inline-block; width:55%;height:500px;padding:0.2rem">
        <img style="object-fit: cover;border-radius:10px"
             [src]="currentImg!=''?'http://localhost:1000/'+currentImg:'http://localhost:1000/'+carimg[0]" alt=""
             width="100%"
             height="100%">
      </mat-card>
      <div
        style=" width:15%;height:500px;display: flex;flex-wrap:wrap;flex-direction:column;gap:0.1rem;align-items: center">
        @for (img of carimg; track $index) {
          <mat-card (click)="currentImg = img" style="cursor:pointer;width:80px;padding:0.3rem;margin-bottom: 0.2rem">
            <img style="object-fit: cover;border-radius:5px" [src]="'http://localhost:1000/'+img" alt="" width="100%"
                 height="80px">
          </mat-card>
        }
      </div>
    </div>
  `,
  styles: `
    mat-card, div, img {
      transition: all 0.5s ease-in-out;
    }
  `
})
export class DetailsComponent implements OnInit {
  ngOnInit(): void {
    this.db.getCarsByID(this.id()).subscribe(e => {
      this.carimg = e.images;
      this.cars = e;
    })
  }

  id = input(' ')
  db = inject(databaseService)
  cars: carModel = {
    isForSell: true,
    images: [],
    ShopID: '',
    marque: "",
    modele: "",
    anneeFabrication: "",
    fuel: "diesel",
    numeroChassis: "",
    transmission: "Automatique",
    volant: "droite",
    km: "",
    porte: "",
    place: "",
    couleur: "",
    price: ""
  };
  carimg: string[] = [];
  currentImg = '';

}
