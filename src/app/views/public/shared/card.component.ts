import {Component, Input} from '@angular/core';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-card',
  imports: [MatCardModule],
  template: `
    <mat-card appearance="raised">
      <mat-card-content>
        <img style="object-fit:cover" width="250px" height="200px"
             [src]="'http://localhost:1000/'+img"
             alt="">
        <br>
        <span style="font-size:20px">{{ Marque }}</span>
        <br>
        <span>{{ Modele }}</span>
        <br>
        <br>

        <span style="font-size:20px">{{ Price }}$</span>
      </mat-card-content>
    </mat-card>
  `,
  styles: `
    mat-card {
      width: fit-content;
    }
  `
})
export class CardComponent {

  @Input({required: true}) img!: string;
  @Input({required: true}) Marque!: string;
  @Input({required: true}) Modele!: string;
  @Input({required: true}) Price!: string;
  @Input({required: true}) anneeFabrication!: string;
}
