import { SchemaPath, validate } from "@angular/forms/signals";

export function differentTeams(
  teamHomePath: SchemaPath<string>,
  teamAwayPath: SchemaPath<string>,
  options?: { message?: string },
) {
  validate(teamAwayPath, ({ value, valueOf }) => {
    const teamAwayId = value();
    const teamHomeId = valueOf(teamHomePath);

    if (!teamHomeId || !teamAwayId || teamHomeId !== teamAwayId) {
      return null;
    }

    return {
      kind: 'differentTeams',
      message: options?.message || 'Les équipes à domicile et à l’extérieur doivent être différentes',
    };
  });
}
