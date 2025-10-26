import {Component, inject} from '@angular/core';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatDivider} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {MatRadioGroup, MatRadioModule} from '@angular/material/radio';
import {databaseService} from '../service/database.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-car-dialog',
  imports: [MatDialogModule, NgbModule,MatButtonModule, MatInputModule, MatSelectModule, MatFormFieldModule, ReactiveFormsModule, MatDivider, MatRadioModule],
  template: `
    <span mat-dialog-title>Ajouter une Voiture</span>
    <mat-divider/>
    <mat-dialog-content>
      <form [formGroup]="CarForm">
        <div style="display:flex;align-items: center;overflow:hidden">
          <ngb-carousel>
            <ng-template ngbSlide>
              @for (img of previews; track $index) {
                <img width="100%" style="object-fit: cover" [src]="img" alt="" srcset="">
              } @empty {
                <img style="cursor:pointer;margin-left:150px" (click)="file.click()" src="./img/images.png" alt=""
                     srcset="">
              }

            </ng-template>
          </ngb-carousel>

        </div>
        <input formControlName="images" #file type="file" hidden (change)="getAndPrevisualiseImg($event)"
               accept="image/*" name="uploadImage[]"
               id=""
               multiple
               #image>
        <mat-form-field appearance="outline">
          <mat-label>Marque</mat-label>
          <input formControlName="marque" type="text" matInput>
        </mat-form-field>
        <mat-form-field appearance="outline">
          <mat-label>Modèle</mat-label>
          <input formControlName="modele" type="text" matInput>
        </mat-form-field>
        <mat-radio-group formControlName="isForSell" aria-label="Select an option">
          <mat-label>Opération:</mat-label>
          <mat-radio-button value="true">Vente</mat-radio-button>
          <mat-radio-button value="false">location</mat-radio-button>
        </mat-radio-group>
        <div>
          <mat-form-field appearance="outline">
            <mat-label>Année de Fabrication</mat-label>
            <input formControlName="anneeFabrication" type="text" matInput>
          </mat-form-field>
          <mat-form-field appearance="outline">
            <mat-label>Carburant</mat-label>
            <mat-select formControlName="fuel">
              <mat-option value="essence">Essence</mat-option>
              <mat-option value="diesel">Diesel</mat-option>
            </mat-select>
          </mat-form-field>
        </div>
        <mat-form-field appearance="outline">
          <mat-label>Numéro de chassis</mat-label>
          <input formControlName="numeroChassis" type="text" matInput>
        </mat-form-field>
        <div>
          <mat-form-field appearance="outline">
            <mat-label>Transmission</mat-label>
            <mat-select formControlName="transmission">
              <mat-option value="Manuel">Manuel</mat-option>
              <mat-option value="Automatique">Automatique</mat-option>
            </mat-select>
          </mat-form-field>
          <mat-form-field appearance="outline">
            <mat-label>Volant</mat-label>
            <mat-select formControlName="volant">
              <mat-option value="gauche">Main gauche</mat-option>
              <mat-option value="droite">Main droite</mat-option>
            </mat-select>
          </mat-form-field>
        </div>
        <mat-form-field appearance="outline">
          <mat-label>Kilométrage</mat-label>
          <input formControlName="km" type="text" matInput>
        </mat-form-field>
        <div>
          <mat-form-field appearance="outline">
            <mat-label>Nombre de Place</mat-label>
            <input formControlName="place" type="text" matInput>
          </mat-form-field>
          <mat-form-field appearance="outline">
            <mat-label>Nombre de Porte</mat-label>
            <input formControlName="porte" type="text" matInput>
          </mat-form-field>
        </div>
        <mat-form-field appearance="outline">
          <mat-label>couleur</mat-label>
          <input formControlName="couleur" type="text" matInput>
        </mat-form-field>
        <mat-form-field appearance="outline">
          <mat-label>Prix</mat-label>
          <input formControlName="price" type="text" matInput>
        </mat-form-field>
      </form>
    </mat-dialog-content>
    <mat-divider/>
    <mat-dialog-actions>
      <button mat-stroked-button mat-dialog-close>Annuler</button>
      <button mat-flat-button #btn (click)="AddCar(image);btn.disabled">Ajouter</button>
    </mat-dialog-actions>
  `,
  styles: `
    form {
      display: flex;
      flex-direction: column;
      gap: 0.3rem;
    }

    div {
      display: flex;
      gap: 1rem;

      mat-form-field {
        width: 50%;
      }
    }
  `,
})
export class CarDialogComponent {
  private readonly snackbar = inject(MatSnackBar);
  private readonly Dialog = inject(MatDialog);
  private readonly fb = inject(FormBuilder);
  private readonly db = inject(databaseService)
  CarForm = this.fb.nonNullable.group({
    isForSell: ['true', Validators.required],
    images: ['', Validators.required],
    marque: ['', Validators.required],
    modele: ['', Validators.required],
    anneeFabrication: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
    fuel: ['', Validators.required],
    numeroChassis: ['', Validators.required],
    transmission: ['', Validators.required],
    volant: ['', Validators.required],
    km: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
    porte: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
    place: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
    couleur: ['', Validators.required],
    price: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
  })

  previews: string[] = []

  getAndPrevisualiseImg(e: any) {
    const files = e.target.files;
    this.previews = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.previews.push(e.target.result);
      }
      reader.readAsDataURL(file);
    }
  }

  AddCar(image: any) {

    const formData = new FormData();
    // @ts-ignore
    for (let i = 0; i < image.files.length; i++) {
      formData.append('images', image.files[i]);
    }
    const data = this.CarForm.getRawValue();
    formData.append("km", data.km)
    formData.append("fuel", data.fuel)
    formData.append("couleur", data.couleur)
    formData.append("anneeFabrication", data.anneeFabrication)
    formData.append("isForSell", data.isForSell)
    formData.append("marque", data.marque)
    formData.append("modele", data.modele)
    formData.append("numeroChassis", data.numeroChassis)
    formData.append("place", data.place)
    formData.append("porte", data.porte)
    formData.append("transmission", data.transmission)
    formData.append("volant", data.volant)
    formData.append("price", data.price)
    formData.append("ShopID", localStorage.getItem("ShopID")!)
    this.db.AddCar(formData).subscribe((e) => {
      this.Dialog.closeAll();
      this.snackbar.open("Voiture augmenter avec succès", "ok", {
        duration: 2000,
        horizontalPosition: "right",
        verticalPosition: 'top'
      })
    });
  }

}
