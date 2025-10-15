import {Component, inject} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {RouterLink} from "@angular/router";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatCard, MatCardModule} from '@angular/material/card';
import {MatDivider} from '@angular/material/divider';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    MatCardModule,
    MatDivider
  ],
  template: `
    <div class="container">
      <mat-card>
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
          <form [formGroup]="form" class="form">
            <div style="display:flex;gap:1rem">
              <mat-form-field appearance="outline">
                <mat-label>Username</mat-label>
                <input matInput formControlName="Username">
              </mat-form-field>
              <mat-form-field appearance="outline">
                <mat-label>Phone</mat-label>
                <input matInput formControlName="Phone">
              </mat-form-field>
            </div>
            <mat-form-field appearance="outline">
              <mat-label>Email</mat-label>
              <input matInput formControlName="Email">
            </mat-form-field>
            <mat-form-field appearance="outline">
              <mat-label>Password</mat-label>
              <input matInput formControlName="Password" type="password">
            </mat-form-field>
            <button mat-raised-button color="primary" (click)="submit()">Register</button>
          </form>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: `
    .container {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
    }

    .form {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    mat-card {
      width: 400px;
    }

    .title {
      padding: 1rem;

      .h1 {
        font-size: 30px;
      }
    }
  `
})
export default class RegistrationComponent {
  fb = inject(FormBuilder);
  form: FormGroup = this.fb.group({
    Username: ['', Validators.required],
    Email: ['', [Validators.required, Validators.email]],
    Phone: ['', Validators.required],
    Password: ['', Validators.required],
  });

  submit() {
    if (this.form.valid) {
      console.log(this.form.value);
    }
  }
}
