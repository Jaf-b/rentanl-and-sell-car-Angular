import { Component, inject } from '@angular/core';
import {MatCard, MatCardModule} from '@angular/material/card';
import {MatFormField, MatFormFieldModule, MatLabel} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MatButton, MatButtonModule } from '@angular/material/button';
import {MatDivider} from '@angular/material/divider';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { databaseService } from '../../../core/service/database.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../../core/service/auth.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-signin',
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDivider,
    RouterLink,
    MatIconModule,
    ReactiveFormsModule,
  ],
  template: `
    <div class="container">
      @if (isSingIn) {
        <mat-card >
          <mat-card-content>
            <div class="title">
              <div style="display: flex;justify-content: start;align-items:center;gap:0.5rem">
                  <mat-icon style="cursor: pointer" (click)="isSingIn=false">arrow_left</mat-icon>
                <span style="font-size:30px">Code Validation</span>
              </div>
              <br> <br>
              <span>
           Un code de Vérification a été envoyer dans la boîte mail de votre adresse: << {{userForm.controls.email.getRawValue()}} >>
                veuillez saisir le code pour continuer la connexion
          </span>
              <br><br>
              <mat-divider />
              <br>
            </div>
            <mat-form-field appearance="outline">
              <mat-label>Code</mat-label>
              <input  #validation type="text" matInput >
            </mat-form-field>
          </mat-card-content>
          <mat-card-actions align="end">
            <button style="width:auto" (click)="Registration(validation.value)"  mat-flat-button type="button">Suivant</button>
          </mat-card-actions>
        </mat-card>

      } @else {
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
              <mat-divider />
              <br>
            </div>
            <form [formGroup]="userForm" style="width:100%">
              <mat-form-field appearance="outline" floatLabel="always">
                <mat-label>Email</mat-label>
                <input formControlName="email" type="email" matInput placeholder="ex:joyeux@gmail.com">
              </mat-form-field>
              <mat-form-field appearance="outline">
                <mat-label>Mot de passe</mat-label>
                <input formControlName="password" type="password" matInput>
              </mat-form-field>
            </form>
          </mat-card-content>
          <mat-card-actions>
            <button (click)="OnSingIn()" mat-flat-button type="button">Suivant</button>
          </mat-card-actions>
          <mat-card-footer>
            <p style="text-align: center;margin: 0.5rem">vous n'avez déjà un compte ? cliquez <a
              routerLink="/login">ici</a></p>
          </mat-card-footer>
        </mat-card>
      }

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
mat-form-field{
  width: 100%;
}
    .title {

      .h1 {
        font-size: 40px
      }
    }
  `
})
export default class SigninComponent {
  isSingIn: Boolean = false;
 protected readonly fb = inject(FormBuilder);
 protected readonly auth = inject(AuthService);
 protected readonly snackbar = inject(MatSnackBar)
 codeValidation = toSignal(this.auth.getValidationCode())
  userForm = this.fb.nonNullable.group({
    email: ['', [Validators.required,Validators.email]],
    password: ['', Validators.required]
  })
  OnSingIn(): void {
    this.userForm.markAllAsTouched()
    if(this.userForm.valid) {
      this.isSingIn = true;
      this.snackbar.open(this.codeValidation()!,"ok",{
        duration:5000,
        verticalPosition:'top',
        horizontalPosition:'right',
      })
    }
  }
  Registration(value:string){
    const code = this.codeValidation()!
    if(code && Number(code) === Number(value)){
      console.log("yes")
      this.auth.sigin(this.userForm.controls.email.getRawValue(),this.userForm.controls.email.getRawValue(),false).subscribe(
        (e)=>{
          localStorage.setItem('jwt', e.Token);
          localStorage.setItem('IsAdmin', e.IsAdmin)
          localStorage.setItem('UserID', e.UserID);
          this.snackbar.open("compte créer avec succès","ok",{duration:2000,
          verticalPosition:'top',
          horizontalPosition:'right',});
          location.reload();
        })

    }
    else{
      console.log("Damn")
    }
  }
}
