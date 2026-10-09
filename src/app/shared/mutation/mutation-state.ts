import { Observable } from "rxjs";

export interface MutationState<T> {
  loading: () => boolean;
  error: () => string | null;
  mutate: (obs$: Observable<T>) => Promise<{ success: boolean; value?: T }>;
}