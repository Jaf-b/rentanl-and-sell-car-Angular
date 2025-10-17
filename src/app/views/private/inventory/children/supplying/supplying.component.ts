import {Component, inject, OnInit} from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatDialog} from '@angular/material/dialog';
import {CarDialogComponent} from '../../../../../core/mat-dialog-component/car-dialog.component';
import {databaseService} from '../../../../../core/service/database.service';
import {toSignal} from '@angular/core/rxjs-interop';
import {async} from 'rxjs';
import {AsyncPipe} from '@angular/common';
import {carModel} from '../../../../../core/model/car-model';

export interface SupplyEntry {
  id: string;
  productId: string;
  productName: string;
  supplier: string;
  quantity: number;
  unitCost: number;
  totalCost: number;
  date: string;
  reference: string;
}

@Component({
  selector: 'app-supplying',
  imports: [MatTableModule, MatIconModule, MatButtonModule, MatCardModule],
  template: `
    <mat-card appearance="outlined">
      <mat-card-content>
        <button (click)="openDialog()" mat-flat-button>
          <mat-icon>add</mat-icon>
          Nouvel Approvisionnement
        </button>
        <table mat-table [dataSource]="dataSource" class="supply-table">
          <ng-container matColumnDef="marque">
            <th mat-header-cell *matHeaderCellDef>Marque</th>
            <td mat-cell *matCellDef="let supply">{{ supply.marque }}</td>
          </ng-container>

          <ng-container matColumnDef="modele">
            <th mat-header-cell *matHeaderCellDef>Modèle</th>
            <td mat-cell *matCellDef="let supply" class="reference">{{ supply.modele }}</td>
          </ng-container>

          <ng-container matColumnDef="anneeFabrication">
            <th mat-header-cell *matHeaderCellDef>Année de Fabrication</th>
            <td mat-cell *matCellDef="let supply">{{ supply.anneeFabrication }}</td>
          </ng-container>

          <ng-container matColumnDef="fuel">
            <th mat-header-cell *matHeaderCellDef>Carburation</th>
            <td mat-cell *matCellDef="let supply">{{ supply.fuel }}</td>
          </ng-container>

          <ng-container matColumnDef="numeroChassis">
            <th mat-header-cell *matHeaderCellDef>Numéro de chassis</th>
            <td mat-cell *matCellDef="let supply" class="quantity-in">{{ supply.numeroChassis }}</td>
          </ng-container>

          <ng-container matColumnDef="transmission">
            <th mat-header-cell *matHeaderCellDef>Transmission</th>
            <td mat-cell *matCellDef="let supply">{{ supply.transmission }}</td>
          </ng-container>

          <ng-container matColumnDef="volant">
            <th mat-header-cell *matHeaderCellDef>Volant</th>
            <td mat-cell *matCellDef="let supply" class="total-cost">
              {{ supply.volant }}
            </td>
          </ng-container>
          <ng-container matColumnDef="km">
            <th mat-header-cell *matHeaderCellDef>Kilométrage</th>
            <td mat-cell *matCellDef="let supply" class="total-cost">
              {{ supply.km }} Km
            </td>
          </ng-container>
          <ng-container matColumnDef="couleur">
            <th mat-header-cell *matHeaderCellDef>Couleur</th>
            <td mat-cell *matCellDef="let supply" class="total-cost">
              {{ supply.couleur }}
            </td>
          </ng-container>
          <ng-container matColumnDef="price">
            <th mat-header-cell *matHeaderCellDef>Prix</th>
            <td mat-cell *matCellDef="let supply" class="total-cost">
              {{ formatCurrency(supply.price) }}
            </td>
          </ng-container>
          <ng-container matColumnDef="action">
            <th mat-header-cell *matHeaderCellDef>Action</th>
            <td mat-cell *matCellDef="let supply" class="total-cost">
              <mat-icon (click)="deleteCar(supply._id)" style="cursor:pointer">delete</mat-icon>
            </td>
          </ng-container>
          <tr mat-header-row *matHeaderRowDef="supplyColumns"></tr>
          <tr mat-row *matRowDef="let row; columns: supplyColumns"></tr>
        </table>
      </mat-card-content>
    </mat-card>
  `,
  styles: `
    mat-card {
      margin: 1rem;

      mat-card-content {
        display: flex;
        flex-direction: column;
        align-items: end;
        justify-content: center;
        gap: 1rem;
      }
    }

    button {
      margin-top: 1rem;
      border-radius: 10px;
    }
  `,
})
export default class SupplyingComponent implements OnInit {
  db = inject(databaseService);

  ngOnInit(): void {
    const ShopID = localStorage.getItem('ShopID');
    this.db.getCarsByShopId(ShopID!).subscribe(
      e => {
        this.dataSource = new MatTableDataSource(e);
      }
    )
  }

  private readonly matDialog = inject(MatDialog);
  supplyColumns: string[] = [

    'marque',
    'modele',
    'anneeFabrication',
    'fuel',
    'numeroChassis',
    'transmission',
    'volant',
    'km',
    'couleur',
    'price',
    'action'
  ];


  formatCurrency(value: number): string {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
    }).format(value);
  }

  dataSource: any;

  openDialog() {
    this.matDialog.open(CarDialogComponent, {
      width: "35rem",
      disableClose: true,
    })
  }

  deleteCar(id: string) {
    this.db.deleteCar(id).subscribe(
      e => console.log(e)
    )
  }
}
