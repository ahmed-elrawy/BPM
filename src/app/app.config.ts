import { ApplicationConfig, provideBrowserGlobalErrorListeners,APP_INITIALIZER, provideZoneChangeDetection  } from '@angular/core';
import { provideRouter } from '@angular/router';
import Aura from '@primeuix/themes/aura'; // You can choose Aura, Material, Lara, or Nora

import { routes } from './app.routes';
import { providePrimeNG } from 'primeng/config';
import { KeycloakService, KeycloakBearerInterceptor } from 'keycloak-angular';
// import { initializeKeycloak } from './enviroments/enviroments';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { initializeKeycloak } from '../environments/environment.config';

export const appConfig: ApplicationConfig = {
  providers: [
        // provideZoneChangeDetection({ eventCoalescing: true }),

    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()),
     providePrimeNG({ 
        theme: {
            preset: Aura,
            options: {
                darkModeSelector: 'system' // Use 'system', 'class', or specify a custom selector
            }
        }
    }),
    KeycloakService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: KeycloakBearerInterceptor,
      multi: true
    },
    
    // Keycloak Initialization
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService]
    }
  ]
};
