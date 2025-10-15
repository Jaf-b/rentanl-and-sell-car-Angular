import {Component, inject, OnInit, ViewChild, viewChild} from '@angular/core';
import {MatStepper, MatStepperModule} from '@angular/material/stepper';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatCard, MatCardContent} from '@angular/material/card';
import {MatDivider} from '@angular/material/divider';
import {MatInput, MatInputModule, MatLabel} from '@angular/material/input';
import {MatRadioButton, MatRadioGroup} from '@angular/material/radio';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {AuthService} from '../../../core/service/auth.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {databaseService} from '../../../core/service/database.service';
import {shopModel} from '../../../core/model/shop-model';

@Component({
  selector: 'app-add-shop',
  imports: [
    MatStepperModule,
    FormsModule,
    MatCard,
    MatCardContent,
    MatDivider,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule
  ],
  template: `
    <mat-card class="max-width">
      <div class="title">
        <span class="h1">Créer un Nouveau Shop</span>
        <br> <br>
        <span>
            Vender et acheter la voiture de vos rêves tout en restant chez vous en un seul clic, simple rapide et efficace avec
              <b>Rental and Sell Car</b>
          </span>
        <br><br>
        <mat-divider/>
        <br>
      </div>
      <mat-card-content>
        <mat-stepper #stepper style="background-color: transparent"
                     [linear]="isAuthenticated? stepper.next():''">
          <mat-step #step [stepControl]="LogginForm" label="Authentification">
            <form [formGroup]="LogginForm" style="margin-top: 1rem">
              <mat-form-field style="margin-top: 1rem" appearance="outline" floatLabel="always">
                <mat-label>Email</mat-label>
                <input formControlName="email" type="email" matInput placeholder="ex:joyeux@gmail.com">
              </mat-form-field>
              <mat-form-field appearance="outline">
                <mat-label>Mot de passe</mat-label>
                <input formControlName="password" type="password" matInput>
              </mat-form-field>
            </form>
            <button mat-flat-button (click)="onLogin()" type="submit">Connexion</button>
          </mat-step>
          <mat-step label="Information" [stepControl]="ShopForm">
            <form [formGroup]="ShopForm" style="margin-top: 1rem">
              <mat-form-field style="margin-top: 1rem" appearance="outline" floatLabel="always">
                <mat-label>Nom du Service</mat-label>
                <input formControlName="ShopName" type="text" matInput placeholder="ex:JBTPOWERS">
              </mat-form-field>
              <mat-form-field style="margin-top: 1rem" appearance="outline" floatLabel="always">
                <mat-label>Description</mat-label>
                <textarea matInput formControlName="Description" name="" id="" cols="30" rows="3"></textarea>
              </mat-form-field>
            </form>
            <button (click)="addShop()" mat-flat-button type="submit">Creer le shop</button>
          </mat-step>
        </mat-stepper>
      </mat-card-content>
    </mat-card>
  `,
  styles: `
    .max-width {
      width: 400px;
      margin: 1rem auto;
    }

    mat-card-content {
      display: flex;
      flex-direction: column;
    }

    mat-form-field {
      width: 100%;
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
      padding: 1rem;

      .h1 {
        font-size: 30px;
      }
    }
  `
})
export class AddShopComponent implements OnInit {

  ngOnInit(): void {
    if (this.isAuthenticated) {
      const id = localStorage.getItem('UserID')!;
      this.db.getShop(id).subscribe((data: any) => {
        if (data.ShopName) {
          localStorage.setItem('ShopID', data._id);
          location.assign(`/shop/${id}`)
        }

      })
    }
  }

  protected readonly snackbar = inject(MatSnackBar)
  protected readonly db = inject(databaseService);
  auth = inject(AuthService)
  isAuthenticated = this.auth.isAuthenticated
  LogginForm = inject(FormBuilder).nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });
  ShopForm = inject(FormBuilder).nonNullable.group({
    ShopName: ['', Validators.required],
    Description: ['', Validators.required],
  });

  onLogin() {
    const data = this.LogginForm.getRawValue();
    this.LogginForm.markAllAsTouched()
    if (this.LogginForm.valid) {
      this.auth.login(data.email, data.password).subscribe(
        e => {
          if (e.message) {
            this.snackbar.open(e.message, '', {
              duration: 5000,
              horizontalPosition: "right",
              verticalPosition: "top",
            });
          } else {
            localStorage.setItem('jwt', e.Token);
            localStorage.setItem('IsAdmin', e.IsAdmin);
            localStorage.setItem('UserID', e._id);
            localStorage.setItem('UserID', e.UserID);
            location.reload();
            console.log("user : " + e)
          }
        }
      )
    }
  }

  addShop() {
    const UserID = localStorage.getItem('UserID')!
    const FormData = this.ShopForm.getRawValue();
    const shop: shopModel = {
      ShopName: FormData.ShopName,
      Descriprion: FormData.Description,
      UserID: UserID
    }


    this.db.createShop(shop).subscribe(
      e => {
        console.log(e);
        location.assign(`/shop/${UserID}`)
      }
    )
  }
}

