import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideAppInitializer, inject, PLATFORM_ID } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay, withNoIncrementalHydration } from '@angular/platform-browser';
import { provideOAuthClient, OAuthService, DefaultOAuthInterceptor, OAuthModuleConfig } from 'angular-oauth2-oidc';
import { authConfig } from './core/config/auth.config';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { environment } from '../environment/environment.development';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideClientHydration(withEventReplay(), withNoIncrementalHydration()),
    provideHttpClient(withInterceptorsFromDi()),

    provideOAuthClient({
        resourceServer: {
          allowedUrls: [environment.apiUrl],
          sendAccessToken: true,
        },
    }),
    provideAppInitializer(() => {
      const platformId = inject(PLATFORM_ID);
      if (!isPlatformBrowser(platformId)) return;
      const oauth = inject(OAuthService);
      oauth.configure(authConfig);
      return oauth.loadDiscoveryDocumentAndTryLogin();
    }),
  ],

};
