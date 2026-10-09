type MutationResult<T> =
  | { success: true; value: T }
  | { success: false };