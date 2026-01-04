import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import Aura from '@primeuix/themes/aura'; // You can choose Aura, Material, Lara, or Nora

import { routes } from './app.routes';
import { providePrimeNG } from 'primeng/config';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
     providePrimeNG({ 
        theme: {
            preset: Aura,
            options: {
                darkModeSelector: 'system' // Use 'system', 'class', or specify a custom selector
            }
        }
    })
  ]
};
