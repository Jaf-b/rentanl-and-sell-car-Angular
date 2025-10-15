import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChip } from '@angular/material/chips';
import { MatCardModule } from '@angular/material/card';

export interface Product {
  id: string;
  name: string;
  category: string;
  currentStock: number;
  minStock: number;
  price: number;
}

@Component({
  selector: 'app-stock',
  imports: [MatTableModule, MatButtonModule, MatIconModule, MatCardModule],
  template: `
    <mat-card appearance="outlined">
      <mat-card-content>
        <table mat-table [dataSource]="products" class="stock-table">
          <ng-container matColumnDef="name">
            <th mat-header-cell *matHeaderCellDef>Produit</th>
            <td mat-cell *matCellDef="let product" class="product-name">{{ product.name }}</td>
          </ng-container>

          <ng-container matColumnDef="category">
            <th mat-header-cell *matHeaderCellDef>Catégorie</th>
            <td mat-cell *matCellDef="let product">{{ product.category }}</td>
          </ng-container>

          <ng-container matColumnDef="currentStock">
            <th mat-header-cell *matHeaderCellDef>Stock Actuel</th>
            <td mat-cell *matCellDef="let product" class="stock-quantity">
              {{ product.currentStock }}
            </td>
          </ng-container>

          <ng-container matColumnDef="minStock">
            <th mat-header-cell *matHeaderCellDef>Stock Min</th>
            <td mat-cell *matCellDef="let product">{{ product.minStock }}</td>
          </ng-container>

          <ng-container matColumnDef="price">
            <th mat-header-cell *matHeaderCellDef>Prix Unitaire</th>
            <td mat-cell *matCellDef="let product">{{ formatCurrency(product.price) }}</td>
          </ng-container>

          <ng-container matColumnDef="stockValue">
            <th mat-header-cell *matHeaderCellDef>Valeur Stock</th>
            <td mat-cell *matCellDef="let product" class="stock-value">
              {{ formatCurrency(getStockValue(product)) }}
            </td>
          </ng-container>

          <ng-container matColumnDef="status">
            <th mat-header-cell *matHeaderCellDef>Statut</th>
            <td mat-cell *matCellDef="let product">
              <div class="badge">
                {{ getStockStatusText(product) }}
              </div>
            </td>
          </ng-container>

          <tr mat-header-row *matHeaderRowDef="stockColumns"></tr>
          <tr mat-row *matRowDef="let row; columns: stockColumns"></tr>
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
export default class StockComponent {
  stockColumns: string[] = [
    'name',
    'category',
    'currentStock',
    'minStock',
    'price',
    'stockValue',
    'status',
  ];
  products: Product[] = [
    {
      id: '1',
      name: 'iPhone 15 Pro',
      category: 'Électronique',
      currentStock: 25,
      minStock: 10,
      price: 1199,
    },
    {
      id: '2',
      name: 'MacBook Air M3',
      category: 'Électronique',
      currentStock: 8,
      minStock: 5,
      price: 1299,
    },
    {
      id: '3',
      name: 'Chaise de Bureau',
      category: 'Mobilier',
      currentStock: 3,
      minStock: 5,
      price: 299,
    },
    {
      id: '4',
      name: 'Café Premium',
      category: 'Alimentaire',
      currentStock: 45,
      minStock: 20,
      price: 15,
    },
    {
      id: '5',
      name: 'T-shirt Coton Bio',
      category: 'Vêtements',
      currentStock: 2,
      minStock: 10,
      price: 29,
    },
  ];

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
    }).format(value);
  }

  getStockStatusText(product: Product): string {
    const status = this.getStockStatus(product);
    switch (status) {
      case 'out':
        return 'Rupture';
      case 'low':
        return 'Stock Faible';
      default:
        return 'Normal';
    }
  }

  getStockStatus(product: Product): string {
    if (product.currentStock === 0) return 'out';
    if (product.currentStock <= product.minStock) return 'low';
    return 'normal';
  }

  getStockStatusColor(product: Product): string {
    const status = this.getStockStatus(product);
    switch (status) {
      case 'out':
        return 'warn';
      case 'low':
        return 'accent';
      default:
        return 'primary';
    }
  }

  getStockValue(product: Product): number {
    return product.currentStock * product.price;
  }
}
