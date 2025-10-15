import {Component} from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';

export interface SaleEntry {
  id: string;
  productId: string;
  productName: string;
  customer: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  date: string;
  reference: string;
}

@Component({
  selector: 'app-sales',
  imports: [MatTableModule, MatButtonModule, MatIconModule, MatCardModule],
  template: `
    <mat-card appearance="outlined">
      <mat-card-content>
        <button mat-flat-button>
          <mat-icon>add</mat-icon>
          Nouvelle Vente
        </button>
        <table mat-table [dataSource]="sales" class="sales-table">
          <ng-container matColumnDef="date">
            <th mat-header-cell *matHeaderCellDef>Date</th>
            <td mat-cell *matCellDef="let sale">{{ sale.date }}</td>
          </ng-container>

          <ng-container matColumnDef="reference">
            <th mat-header-cell *matHeaderCellDef>Référence</th>
            <td mat-cell *matCellDef="let sale" class="reference">{{ sale.reference }}</td>
          </ng-container>

          <ng-container matColumnDef="productName">
            <th mat-header-cell *matHeaderCellDef>Produit</th>
            <td mat-cell *matCellDef="let sale">{{ sale.productName }}</td>
          </ng-container>

          <ng-container matColumnDef="customer">
            <th mat-header-cell *matHeaderCellDef>Client</th>
            <td mat-cell *matCellDef="let sale">{{ sale.customer }}</td>
          </ng-container>

          <ng-container matColumnDef="quantity">
            <th mat-header-cell *matHeaderCellDef>Quantité</th>
            <td mat-cell *matCellDef="let sale" class="quantity-out">-{{ sale.quantity }}</td>
          </ng-container>

          <ng-container matColumnDef="unitPrice">
            <th mat-header-cell *matHeaderCellDef>Prix Unitaire</th>
            <td mat-cell *matCellDef="let sale">{{ formatCurrency(sale.unitPrice) }}</td>
          </ng-container>

          <ng-container matColumnDef="totalPrice">
            <th mat-header-cell *matHeaderCellDef>Total</th>
            <td mat-cell *matCellDef="let sale" class="total-price">
              {{ formatCurrency(sale.totalPrice) }}
            </td>
          </ng-container>

          <tr mat-header-row *matHeaderRowDef="salesColumns"></tr>
          <tr mat-row *matRowDef="let row; columns: salesColumns"></tr>
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
export default class SalesComponent {
  salesColumns: string[] = [
    'date',
    'reference',
    'productName',
    'customer',
    'quantity',
    'unitPrice',
    'totalPrice',
  ];

  sales: SaleEntry[] = [
    {
      id: 'v1',
      productId: '1',
      productName: 'iPhone 15 Pro',
      customer: 'Client A',
      quantity: 2,
      unitPrice: 1199,
      totalPrice: 2398,
      date: '2024-01-16',
      reference: 'VTE-2024-001',
    },
    {
      id: 'v2',
      productId: '2',
      productName: 'MacBook Air M3',
      customer: 'Entreprise XYZ',
      quantity: 5,
      unitPrice: 1299,
      totalPrice: 6495,
      date: '2024-01-15',
      reference: 'VTE-2024-002',
    },
    {
      id: 'v3',
      productId: '4',
      productName: 'Café Premium',
      customer: 'Restaurant ABC',
      quantity: 10,
      unitPrice: 15,
      totalPrice: 150,
      date: '2024-01-17',
      reference: 'VTE-2024-003',
    },
  ];

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
    }).format(value);
  }
}
