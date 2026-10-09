import { signal } from "@angular/core";
import { MutationState } from "./mutation-state";
import { getErrorMessage } from "../api/api-error-response";
import { HttpErrorResponse } from "@angular/common/http";
import { firstValueFrom, Observable } from "rxjs";

export function createMutation<T>(): MutationState<T> {
  const _loading = signal(false);
  const _error = signal<string | null>(null);

  return {
    loading: _loading.asReadonly(),
    error: _error.asReadonly(),
    async mutate(source$: Observable<T>): Promise<MutationResult<T>> {
      _loading.set(true);
      _error.set(null);

      try {
        const value = await firstValueFrom(source$);
        _loading.set(false);
        return { success: true, value };
      } catch (err: HttpErrorResponse | any) {
        _loading.set(false);
        _error.set(getErrorMessage(err));
        return { success: false };
      }
    }
  };
}