import { provideHttpClient, withFetch } from '@angular/common/http'
import {
  type ApplicationConfig,
  LOCALE_ID,
  provideZoneChangeDetection,
} from '@angular/core'
import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser'
import { provideRouter } from '@angular/router'
import { routes } from './app.routes'

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch()),
    { provide: LOCALE_ID, useValue: 'fr-FR' },
  ],
}
