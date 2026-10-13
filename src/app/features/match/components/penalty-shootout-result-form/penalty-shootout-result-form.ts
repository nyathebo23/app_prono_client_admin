import { Component, inject, input, output, signal } from '@angular/core';
import { FormField, FormRoot, form, min, required } from '@angular/forms/signals';
import { createMutation } from '../../../../shared/mutation/create-mutation';
import { SetPenShootoutResultDto } from '../../dtos/set-pen-shootout-result-dto';
import { MatchService } from '../../services/match-service';
import { MatchDetailsStore } from '../../stores/match-details-store';

@Component({
  imports: [FormField, FormRoot],
  selector: 'app-penalty-shootout-result-form',
  styleUrl: './penalty-shootout-result-form.scss',
  templateUrl: './penalty-shootout-result-form.html',
})
export class PenaltyShootoutResultForm {

  private readonly matchService = inject(MatchService);
  private readonly _saveMutation = createMutation<null>();
  private readonly matchStore = inject(MatchDetailsStore);

  readonly matchId = input.required<string>();
  readonly homeTeamName = input.required<string>();
  readonly awayTeamName = input.required<string>();

  protected readonly isLoading = this._saveMutation.loading;
  protected readonly error = this._saveMutation.error;
  private readonly resultModel = signal<SetPenShootoutResultDto>({ scoreTeamHome: 0, scoreTeamAway: 0 });

  protected readonly resultForm = form(
    this.resultModel,
    (schemaPath) => {
      required(schemaPath.scoreTeamHome, { message: 'Renseignez le nombre de tirs au but' });
      required(schemaPath.scoreTeamAway, { message: 'Renseignez le nombre de tirs au but' });
      min(schemaPath.scoreTeamHome, 0, { message: 'Le score ne peut pas être négatif' });
      min(schemaPath.scoreTeamAway, 0, { message: 'Le score ne peut pas être négatif' });
    },
    {
      submission: {
        action: async () => {
          const result = await this._saveMutation.mutate(
            this.matchService.setPenShootoutResult(this.matchId(), this.resultModel()),
          );
          if (result.success) {
            this.matchStore.reload();
          }
        },
      },
    },
  );
}
