export const toLocalInput = (isoDate: Date): string => {
  if (!isoDate) return '';
  isoDate.setMinutes(isoDate.getMinutes() - isoDate.getTimezoneOffset());
  return isoDate.toISOString().slice(0, 16);
};

// input datetime-local → API (UTC)
export const toUtcIso = (local: string): string => new Date(local).toISOString();

