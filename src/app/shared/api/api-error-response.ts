import { HttpErrorResponse } from "@angular/common/http";

export type ErrorType = 'network' | 'badrequest' | 'unauthorized' | 'forbidden' | 'server' | 'unknown';

export function getErrorType(err: HttpErrorResponse): ErrorType {
  if (err.status === 0) return 'network';
  if (err.status === 400) return 'badrequest';
  if (err.status === 404) return 'network';
  if (err.status === 401) return 'unauthorized';
  if (err.status === 403) return 'forbidden'; 
  if (err.status >= 500) return 'server';
  return 'unknown';
}

export function getErrorMessage(error: HttpErrorResponse): string {
    if (error.status === 401) {
      return error.error?.message || 'You have to be authenticated to perform this action !';
    }
    else if (error.status === 400) {
      if (typeof error.error == 'string') return error.error;
      return  error.error?.message || 'Invalid data provided !';
    }
      else if (error.status === 0) {
      return 'Unable to connect to the server. Please check your network connection and try again.';
    } else {
      return 'An unexpected error occurred. Please try again later.';
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
            message: error.message || 'An unexpected error occurred. Please try again later.',
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