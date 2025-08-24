import { Routes } from '@angular/router';
import { HomeComponent } from '../pages/home.component';

/**
 * Константа всех роутов приложения
 * @type {Routes}
 */
export const routes: Routes = [
  { path: '', component: HomeComponent },
  // {
  //   path: 'shop',
  //   loadComponent: () => import('./../pages/home.component').then((m) => m.HomeComponent),
  // }, // заглушка
  // {
  //   path: 'forum',
  //   loadComponent: () => import('./../pages/home.component').then((m) => m.HomeComponent),
  // }, // заглушка
  // {
  //   path: 'about',
  //   loadComponent: () => import('./../pages/home.component').then((m) => m.HomeComponent),
  // },
  // заглушка
  // {
  //   path: 'login',
  //   loadComponent: () => import('./components/login.component').then((m) => m.LoginComponent),
  // }, // если есть
  // {
  //   path: 'signup',
  //   loadComponent: () => import('./components/login.component').then((m) => m.LoginComponent),
  // }, // временно
];
