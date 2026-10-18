import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home/home.component').then((m) => m.HomeComponent),
    title: 'Kineth Supermarket | European Supermarket Group'
  },
  {
    path: 'our-stores',
    loadComponent: () =>
      import('./pages/our-stores/our-stores.component').then((m) => m.OurStoresComponent),
    title: 'Our Store Formats | Kineth Supermarket'
  },
  {
    path: 'about-us',
    loadComponent: () =>
      import('./pages/about-us/about-us.component').then((m) => m.AboutUsComponent),
    title: 'About Kineth Supermarket | European Supermarket Group'
  },
  {
    path: 'faq',
    loadComponent: () =>
      import('./pages/faq/faq.component').then((m) => m.FaqComponent),
    title: 'Frequently Asked Questions | Kineth Supermarket'
  },
  {
    path: '404',
    loadComponent: () =>
      import('./pages/not-found/not-found.component').then((m) => m.NotFoundComponent),
    title: 'Page Not Found | Kineth Supermarket'
  },
  {
    path: '**',
    loadComponent: () =>
      import('./pages/not-found/not-found.component').then((m) => m.NotFoundComponent),
    title: 'Page Not Found | Kineth Supermarket'
  }
];
