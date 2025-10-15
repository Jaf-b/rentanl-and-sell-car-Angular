import {Component} from '@angular/core';
import {MatCard, MatCardModule} from '@angular/material/card';
import {MatFormField, MatFormFieldModule, MatLabel} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {MatDivider} from '@angular/material/divider';

@Component({
  selector: 'app-signin',
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButton,
    MatDivider,
  ],
  template: `
    <div class="container">
      <mat-card>
        <mat-card-content>
          <div class="title">
            <span class="h1">Inscription</span>
            <br> <br>
            <span>
            Louer et acheter la voiture de vos rêves tout en restant chez vous en un seul clic, simple rapide et efficace avec
              <b>Rental and Sell Car</b>
          </span>
            <br><br>
            <mat-divider/>
            <br>
          </div>
          <mat-form-field appearance="outline" floatLabel="always">
            <mat-label>Email</mat-label>
            <input type="email" matInput placeholder="ex:joyeux@gmail.com">
          </mat-form-field>
          <mat-form-field appearance="outline">
            <mat-label>Mot de passe</mat-label>
            <input type="password" matInput>
          </mat-form-field>
        </mat-card-content>
        <mat-card-actions>
          <button mat-flat-button type="button">Suivant</button>
        </mat-card-actions>
      </mat-card>
    </div>
  `,
  styles: `
    mat-card {
      width: 60vh;
    }

    mat-card-content {
      display: flex;
      flex-direction: column;
    }

    button {
      width: 100%;
    }

    .container {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .title {
      .h1 {
        font-size: 40px
      }
    }
  `
})
export default class SigninComponent {

}
