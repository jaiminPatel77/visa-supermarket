import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home/home.component').then((m) => m.HomeComponent),
    title: 'Eurova Market Group | European Retail Group'
  },
  {
    path: 'our-stores',
    loadComponent: () =>
      import('./pages/our-stores/our-stores.component').then((m) => m.OurStoresComponent),
    title: 'Our Store Formats | Eurova Market Group'
  },
  {
    path: 'about-us',
    loadComponent: () =>
      import('./pages/about-us/about-us.component').then((m) => m.AboutUsComponent),
    title: 'About Eurova Market Group'
  },
  {
    path: 'faq',
    loadComponent: () =>
      import('./pages/faq/faq.component').then((m) => m.FaqComponent),
    title: 'Frequently Asked Questions | Eurova Market Group'
  },
  {
    path: '404',
    loadComponent: () =>
      import('./pages/not-found/not-found.component').then((m) => m.NotFoundComponent),
    title: 'Page Not Found | Eurova Market Group'
  },
  {
    path: '**',
    loadComponent: () =>
      import('./pages/not-found/not-found.component').then((m) => m.NotFoundComponent),
    title: 'Page Not Found | Eurova Market Group'
  }
];
