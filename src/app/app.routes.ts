import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'search', loadComponent: () => import('./features/search/search').then((m) => m.Search), title: 'Biblioteca | Archivo del Duelista' },
  { path: 'blue-eyes', loadComponent: () => import('./features/blue-eyes/blue-eyes').then((m) => m.BlueEyes), title: 'Santuario Blue-Eyes | Archivo del Duelista' },
  { path: 'favorites', loadComponent: () => import('./features/favorites/favorites').then((m) => m.Favorites), title: 'Mi carpeta | Archivo del Duelista' },
  { path: 'card/:id', loadComponent: () => import('./features/card-detail/card-detail').then((m) => m.CardDetail), title: 'Ficha de carta | Archivo del Duelista' },
  { path: '', pathMatch: 'full', redirectTo: 'search' },
  { path: '**', redirectTo: 'search' },
];
