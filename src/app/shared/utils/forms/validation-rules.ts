import { SchemaPath, validate } from "@angular/forms/signals";


export function shouldNotStartWithSpace(path: SchemaPath<string>, options?: {message?: string}) {
  validate(path, ({value}) => {
    if (value().length > 0 && !/^\S/.test(value())) {
      return {
        kind: 'textField',
        message: options?.message || "Ce champ ne doit pas commencer par un espace"
      };
    }
    return null;    
  });
}


export function minLength(path: SchemaPath<string>, length: number, options?: { message?: string }) {
  validate(path, ({ value }) => {
    const v = value() || '';
    if (v.length === 0) return null;
    if (v.length < length) return { 
      kind: 'minLength', 
      message: options?.message || `Doit posséder au moins ${length} caractères` 
    };
    return null;
  });
}
export function futureDateConstraint(path: SchemaPath<string>, options?: { message?: string }) {
  validate(path, ({ value }) => {
    const v = value();
    if (!v) return null;
    if (new Date(v) < new Date()) {
      return {
        kind: 'futureDateConstraint',
        message: options?.message || 'Cette date doit être ultérieure à la date actuelle',
      };
    }
    return null;
  });
}

export function rangeDateValidity(
  startDatePath: SchemaPath<string>,
  endDatePath: SchemaPath<string>,
  options?: { message?: string }
) {
  validate(endDatePath, ({ value, valueOf }) => {
    const end = value();
    const start = valueOf(startDatePath);
    if (!end || !start) return null;
    if (new Date(start) >= new Date(end)) {
      return {
        kind: 'rangeDateValidity',
        message: options?.message || 'La date de fin doit être ultérieure à la date de début',
      };
    }
    return null;
  });
}

export function validateDatetime(path: SchemaPath<string>, options?: { message?: string }) {
  validate(path, ({ value }) => {
    const v = value();
    if (!v) return null;
    if (isNaN(new Date(v).getTime())) {
      return {
        kind: 'validateDatetime',
        message: options?.message || 'Date ou heure invalide',
      };
    }
    return null;
  });
}