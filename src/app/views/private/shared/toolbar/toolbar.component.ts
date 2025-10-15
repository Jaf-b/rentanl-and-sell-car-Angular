import {Component, inject} from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {LOGO} from '../../../../constant';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {RouterLink} from '@angular/router';
import {AuthService} from '../../../../core/service/auth.service';

@Component({
  selector: 'app-toolbar',
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, MatDividerModule, MatMenuModule, RouterLink],
  template: `
    <mat-toolbar style="gap:1rem">
      <div class="container">
        <div class="logo-container">
          <button type="button" mat-icon-button>
            <mat-icon class="">menu</mat-icon>
          </button>
        </div>
        <span class="title">Rental and Sell Car</span>
      </div>
      <span class="spacer"></span>
      <button mat-icon-button type="button">
        <mat-icon>favorite</mat-icon>
      </button>
      <button mat-icon-button type="button">
        <mat-icon>shopping_bag</mat-icon>
      </button>
      @if (auth.isAuthenticated) {
        <img [matMenuTriggerFor]="menuRef" src="./img/avatar.png" width="35px" height="35px"
             style="border-radius: 100%;cursor:pointer" alt="">
        <mat-menu #menuRef="matMenu">
          <button mat-menu-item [matMenuTriggerFor]="menuRef2">
            <mat-icon class="mat-18">dark_mode</mat-icon>
            Thème
          </button>
          <button (click)="logout()" mat-menu-item>
            <mat-icon class="mat-18">logout</mat-icon>
            Se deconnecter
          </button>
          <button (click)="addShop()" mat-menu-item>
            <mat-icon class="mat-18">add_circle</mat-icon>
            Creer votre Shop
          </button>
        </mat-menu>
        <mat-menu #menuRef2="matMenu">
          <button mat-menu-item>
            <mat-icon class="mat-18">dark_mode</mat-icon>
            Mode sombre
          </button>
          <button mat-menu-item>
            <mat-icon class="mat-18">light_mode</mat-icon>
            Mode clair
          </button>
        </mat-menu>
      } @else {
        <button mat-flat-button type="button">
          <a style="color:white" routerLink="/login">Se Connecter</a>
        </button>
      }

    </mat-toolbar>
    <mat-divider/>

  `,
  styles: `
    .logo-icon {
      width: 40px;
      height: 40px;
      font-size: 20px;
      background: linear-gradient(135deg, #2563eb, #1d4ed8);
      color: white;
      border-radius: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 8px 32px rgba(37, 99, 235, 0.3);
    }

    .spacer {
      flex: 1 1 auto;
    }

    .logo-container {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 0.5rem;
    }

    .title {
      font-size: 22px;
    }

    .container {
      display: flex;
      gap: 1rem;
      align-items: center;
    }

    a {
      text-decoration: none;
    }
  `,
})
export class ToolbarComponent {
  protected readonly logo = LOGO;
  protected readonly auth = inject(AuthService);

  logout() {
  }

  addShop() {
    location.assign('/add-shop');
  }
}
