import { HttpErrorResponse } from '@angular/common/http';

export type ErrorType =
  | 'network'
  | 'badrequest'
  | 'unauthorized'
  | 'forbidden'
  | 'notfound'
  | 'conflict'
  | 'unprocessable'
  | 'server'
  | 'unknown';

export function getErrorType(err: HttpErrorResponse): ErrorType {
  if (err.status === 0) return 'network';
  if (err.status === 400) return 'badrequest';
  if (err.status === 401) return 'unauthorized';
  if (err.status === 403) return 'forbidden';
  if (err.status === 404) return 'notfound';
  if (err.status === 409) return 'conflict';
  if (err.status === 422) return 'unprocessable';
  if (err.status >= 500) return 'server';
  return 'unknown';
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function formatFieldError(value: unknown): string {
  if (typeof value === 'string') return value;
  if (Array.isArray(value)) return value.map(formatFieldError).join('; ');
  if (isRecord(value) && typeof value['message'] === 'string') {
    return value['message'];
  }
  return String(value);
}

function getFieldErrorsMessage(payload: unknown): string | undefined {
  if (!isRecord(payload) || !isRecord(payload['fieldErrors'])) return undefined;

  const entries = Object.entries(payload['fieldErrors']);
  if (entries.length === 0) return undefined;

  return `Erreurs de validation :\n${entries
    .map(([field, message]) => `- ${field} : ${formatFieldError(message)}`)
    .join('\n')}`;
}

export function getErrorMessage(error: HttpErrorResponse): string {
  if ([400, 409, 422].includes(error.status)) {
    const fieldErrorsMessage = getFieldErrorsMessage(error.error);
    if (fieldErrorsMessage) return fieldErrorsMessage;
  }

  const apiMessage = typeof error.error === 'string'
    ? error.error
    : error.error?.message;

  if (apiMessage) return apiMessage;

  switch (error.status) {
    case 0:
      return 'Impossible de contacter le serveur. Vérifiez votre connexion réseau puis réessayez.';
    case 400:
      return 'Les données fournies sont invalides.';
    case 401:
      return 'Vous devez être authentifié pour effectuer cette action.';
    case 403:
      return 'Vous n’êtes pas autorisé à effectuer cette action.';
    case 404:
      return 'La ressource demandée est introuvable.';
    case 409:
      return 'Cette opération entre en conflit avec l’état actuel des données.';
    case 422:
      return 'Les données fournies ne peuvent pas être traitées, elles sont invalides.';
    default:
      if (error.status >= 500) {
        return 'Une erreur du serveur est survenue. Réessayez plus tard.';
      }
      return 'Une erreur inattendue est survenue. Réessayez plus tard.';
  }
}

export type ApiErrorResponse = {
  status?: number;
  message: string;
  errorType?: ErrorType;
};

export function createApiErrorResponse(error: Error | undefined): ApiErrorResponse | undefined {
    if (!error) return undefined;
    if (!(error instanceof HttpErrorResponse)) {
        return {
          message: error.message || 'Une erreur inattendue est survenue. Réessayez plus tard.',
            errorType: 'unknown',
        };
    }
    const errorType = getErrorType(error);
    const message = getErrorMessage(error);
    return {
        status: error.status,
        message,
        errorType
    };
}