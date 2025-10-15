import {Component} from '@angular/core';
import {MatDialogModule} from '@angular/material/dialog';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDivider} from '@angular/material/divider';

@Component({
  selector: 'app-choose-product',
  imports: [MatDialogModule, MatCardModule, MatInputModule, MatFormFieldModule, MatDivider],
  template: `
    <h1 mat-dialog-title><b>Choisir Un Produit</b></h1>
    <mat-divider/>
    <mat-dialog-content>
      <span>Filtre :</span>
      <br> <br>
      <form>
        <mat-form-field appearance="outline">
          <mat-label>Nom du Produit</mat-label>
          <input placeholder="ex:Toyota" type="text" matInput>
        </mat-form-field>
        <mat-form-field appearance="outline">
          <mat-label>Catégorie</mat-label>
          <input type="text" placeholder="ex:Voiture électrique" matInput>
        </mat-form-field>
        <mat-form-field appearance="outline">
          <mat-label>Marque</mat-label>
          <input type="text" placeholder="ex: Toyota" matInput>
        </mat-form-field>
      </form>
        

    </mat-dialog-content>
  `,
  styles: `
    form {
      display: flex;
      gap: 0.3rem;
    }


  `
})
export class ChooseProductComponent {

}
