import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';


export const authGuard: CanActivateFn = () => {
  const oauth = inject(OAuthService);
  if (oauth.hasValidAccessToken()) return true;
  oauth.initCodeFlow();
  return false;
};