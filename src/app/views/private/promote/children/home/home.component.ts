import {Component, inject} from '@angular/core';
import {MatButton, MatButtonModule} from '@angular/material/button';
import {MatCard, MatCardContent, MatCardModule} from '@angular/material/card';
import {MatDialog} from '@angular/material/dialog';
import {ChooseProductComponent} from '../../../shared/choose-product/choose-product.component';

@Component({
  selector: 'app-home',
  imports: [
    MatButtonModule,
    MatCardModule,
  ],
  template: `
    <div class="container">
      <mat-card appearance="outlined">
        <mat-card-content>
          <div>
            <span class="title">Créateur des Bannières</span>
            <br>
            <span class="subtitle">
            Concevez des banières promotionnelles époustouflates qui captent l'attention et génèrent des clics
          </span>
          </div>
          <div class="features">
            <ul>
              <li>Templates professionnels prêts à l'emploi</li>
              <li>Personnalisation complète en temps réel</li>
              <li>Optimisé pour tous les appareils</li>
              <li>Export haute qualité instantané</li>
            </ul>
          </div>
          <button mat-flat-button type="button" (click)="chooseProductDialog()">Créer ma première bannière</button>
        </mat-card-content>
      </mat-card>
      <mat-card appearance="outlined">
        <mat-card-content>
          <div>
            <span class="title">Badges de Réductions</span>
            <br>
            <span class="subtitle">
            Ajoutez des Badges accrocheurs qui créent l'urgence et poussent à l'achat immédiat
          </span>
          </div>
          <div class="features">
            <ul>
              <li>8 + styles de badges personnalisables en un seul clic</li>
              <li>Positionnement intelligent</li>
              <li>Couleurs et textes sur mesures refletant vos choix</li>
              <li>Application en masse sur vos produits</li>
            </ul>
          </div>
          <button mat-flat-button type="button" (click)="chooseProductDialog()">Ajouter un Badges maintenant</button>
        </mat-card-content>
      </mat-card>
      <mat-card appearance="outlined">
        <mat-card-content>
          <div>
            <span class="title">Créateur des Pages</span>
            <br>
            <span class="subtitle">
            Concevez une pages pour votre boutique pour promouvoir vos produits, gagner en productivités et en Visibilité
          </span>
          </div>
          <div class="features">
            <ul>
              <li>Templates professionnels prêts à l'emploi</li>
              <li>Personnalisation complète en temps réel</li>
              <li>Optimisé pour tous les appareils</li>
              <li>Déploiement Gratuits</li>
            </ul>
          </div>
          <button mat-flat-button type="button">Créer ma page maintenant</button>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: `
    button {
      border-radius: 10px;
    }

    mat-card:hover {
      transform: scale(1.04);
      border-color: var(--mat-sys-primary);
    }

    mat-card {
      width: 23vw;
      height: 50vh;
      transition: all 0.2s ease-in-out;

      mat-card-content {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
      }
    }

    .title {
      font-size: 22px
    }

    .subtitle {
      font-size: 13px;
      font-weight: 500;
    }

    ul {
      margin-left: -20px;
    }

    .container {
      margin: 1rem;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 1rem
    }`
})
export class HomeComponent {

  Dialog: MatDialog = inject(MatDialog);

  //Methode

  chooseProductDialog() {
    this.Dialog.open(ChooseProductComponent, {
      panelClass: "my-Dialog",
      minWidth: "50rem"
    })
  }

}
