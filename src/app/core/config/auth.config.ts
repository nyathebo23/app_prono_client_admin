export const authConfig = {
    issuer: 'http://localhost:8180/auth/realms/dev-match-realm',
    redirectUri: window.location.origin,
    clientId: 'foot-match-admin-angular-pkce',
    responseType: 'code',
    strictDiscoveryDocumentValidation: true,
    scope: 'openid profile email offline_access',
}