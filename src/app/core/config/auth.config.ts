export const authConfig = {
    issuer: 'http://localhost:8180/realms/dev-match-realm',
    redirectUri: 'http://localhost:4200',
    clientId: 'matchpronos',
    responseType: 'code',
    strictDiscoveryDocumentValidation: true,
    scope: 'openid profile email offline_access',
}