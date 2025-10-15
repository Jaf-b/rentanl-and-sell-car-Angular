import {Component, inject} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {APP_NAME, LOGO} from '../../../constant';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../../../core/service/auth.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
  ],
  template: `
    <div class="container">
      <mat-card>
        <mat-card-content>
          <div class="title">
            <span class="h1">Connexion</span>
            <br> <br>
            <span>
            Louer et acheter la voiture de vos rêves tout en restant chez vous en un seul clic, simple rapide et efficace avec
              <b>Rental and Sell Car</b>
          </span>
            <br><br>
            <mat-divider/>
            <br>
          </div>
          <form [formGroup]="LogginForm">
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
          <button (click)="onLogin()" mat-flat-button type="submit">Suivant</button>
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
      .h1 {
        font-size: 40px;
      }
    }
  `,
})
export default class LoginComponent {
  app_name = APP_NAME;
  logo = LOGO;
  SignIn = false;
  protected readonly auth = inject(AuthService);
  protected readonly snackbar = inject(MatSnackBar)
  // formulaire de connexion
  LogginForm = inject(FormBuilder).nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
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
            localStorage.setItem('IsAdmin', e.IsAdmin)
            localStorage.setItem('UserID', e.UserID);
            location.reload()
          }
        }
      )
    }
  }
}
