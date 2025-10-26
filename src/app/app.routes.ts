import {Routes} from '@angular/router';
import {inject} from '@angular/core';
import {AuthService} from './core/service/auth.service';

export const routes: Routes = [
  {
    path: 'login',
    title: 'login',
    canMatch: [() => !inject(AuthService).isAuthenticated],
    loadComponent: () => import('./views/public/login/login.component').then(n => n.default),
  },
  {
    path: 'registration',
    title: 'Registration',
    canMatch: [() => !inject(AuthService).isAuthenticated],
    loadComponent: () => import('./views/public/registration/registration.component').then(n => n.default),
  },
  {
    path: 'add-shop',
    title: 'Add Shop',
    loadComponent: () => import('./views/public/add-shop/add-shop.component').then(n => n.AddShopComponent),
  },
  {
    path: 'sigin',
    title: 'Registration',
    canMatch: [() => !inject(AuthService).isAuthenticated],
    loadComponent: () => import('./views/public/signin/signin.component').then(n => n.default),
  },
  {
    path: 'home',
    title: 'Home',
    loadComponent: () => import('./views/public/home/home.component').then(n => n.default),
  },
  {
    path: "details/:id",
    title: 'detail',
    loadComponent: () => import('./views/public/details/details.component').then(n => n.DetailsComponent)
  },
  {
    path: 'shop/:id',
    loadComponent: () => import('./views/private/admin.component').then(m => m.AdminComponent),
    canMatch: [() => inject(AuthService).isAdmin],
    children: [
      {
        path: 'dashboard',
        title: 'Dashboard',
        loadComponent: () =>
          import('./views/private/dashboard/dashboard.component').then(n => n.default),
      },
      {
        path: 'inventory',
        title: 'Inventory',
        loadChildren: () => [
          {
            path: 'sales',
            title: 'Ventes',
            loadComponent: () =>
              import('./views/private/inventory/children/sales/sales.component').then(
                m => m.default,
              ),
          },
          {
            path: 'supplying',
            title: 'Achats',
            loadComponent: () =>
              import('./views/private/inventory/children/supplying/supplying.component').then(
                m => m.default,
              ),
          },
          {
            path: 'reservation',
            title: 'Reservation',
            loadComponent: () =>
              import('./views/private/inventory/children/reservation/reservation.component').then(
                m => m.default,
              ),
          },
          {
            path: 'stock',
            title: 'Stock',
            loadComponent: () =>
              import('./views/private/inventory/children/stock/stock.component').then(
                m => m.default,
              ),
          },
          {
            path: '',
            pathMatch: 'full',
            redirectTo: 'supplying',
          },
        ],
        loadComponent: () =>
          import('./views/private/inventory/inventory.component').then(n => n.default),
      },
      {
        path: 'promote',
        title: 'Promote',
        loadChildren: () => [
          {
            path: 'home',
            title: 'Promouvoir | Produits',
            loadComponent: () =>
              import(
                './views/private/promote/children/home/home.component'
                ).then(m => m.HomeComponent),
          },
          {
            path: 'reduction',
            title: 'Ajouter | Reduction',
            loadComponent: () =>
              import(
                './views/private/promote/children/add-reduction-badge/add-reduction-badge.component'
                ).then(m => m.AddReductionBadgeComponent),
          },
          {
            path: 'banner',
            title: 'Ajouter | Banniere',
            loadComponent: () =>
              import('./views/private/promote/children/create-banner/create-banner.component').then(
                m => m.CreateBannerComponent,
              ),
          },
          {
            path: '',
            redirectTo: 'home',
            pathMatch: 'full'
          },
          {
            path: '**',
            pathMatch: 'full',
            redirectTo: 'home',
          },
        ],
        loadComponent: () =>
          import('./views/private/promote/promote.component').then(n => n.default),
      },
      {
        path: 'setting',
        title: 'Setting',
        loadComponent: () =>
          import('./views/private/setting/setting.component').then(n => n.default),
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard',
      },
    ],
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'home',
  },
];
