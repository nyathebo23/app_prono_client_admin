import { Component, effect, inject, input, output, signal } from '@angular/core';
import { FormField, FormRoot, form, max, min, required } from '@angular/forms/signals';
import { GoalScored } from '../../models/goal-scored';
import { GoalScoredFormModel, toGoalUpdateDto } from '../../models/goal-scored-form-model';
import { GoalScoredService } from '../../services/goal-scored-service';
import { MatchDetailsStore } from '../../stores/match-details-store';
import { createMutation } from '../../../../shared/mutation/create-mutation';

@Component({
  imports: [FormField, FormRoot],
  selector: 'app-goal-scored-update-dialog',
  styleUrl: './goal-scored-update-dialog.scss',
  templateUrl: './goal-scored-update-dialog.html',
})
export class GoalScoredUpdateDialog {

  private readonly goalScoredService = inject(GoalScoredService);
  private readonly matchStore = inject(MatchDetailsStore);

  private readonly _updateMutation = createMutation<null>();
  private readonly goalUpdateLoading = this._updateMutation.loading;
  private readonly goalUpdateError = this._updateMutation.error;

  goalScoredData = input.required<GoalScored>();
  homeTeamName = input<string>('Domicile');
  awayTeamName = input<string>('Extérieur');
  onDialogClosed = output<void>();

  goalScoredModel = signal<GoalScoredFormModel>(GoalScoredFormModel.empty(''));
  GoalScoredFormModel = GoalScoredFormModel;

  constructor() {
    effect(() => {
      this.goalScoredModel.set(GoalScoredFormModel.fromGoal(this.goalScoredData()));
      console.log('Data:', this.goalScoredData());
    });
  }

  goalScoredForm = form(
    this.goalScoredModel,
    (schemaPath) => {
      required(schemaPath.scorer, { message: "Vous devez renseigner le nom du buteur" }),
      required(schemaPath.minute, { message: "Vous devez renseigner la minute du but" }),
      min(schemaPath.minute, 1, { message: "La minute du but doit être supérieure ou égale à 1" }),
      max(schemaPath.minute, 140, { message: "La minute du but doit être inférieure ou égale à 140" })
      //required(schemaPath.isOwnGoal, { message: "Vous devez renseigner si le but est un CSC" }),
      //required(schemaPath.isPenalty, { message: "Vous devez renseigner si le but est un penalty" })
      //required(schemaPath.teamHomeScored, { message: "Vous devez renseigner si le but est marqué par l'équipe à domicile" })
    },
    {
      submission: {
        action: async () => {
          const goal = this.goalScoredData();
          const result = await this._updateMutation.mutate(this.goalScoredService.editGoal(goal.id, toGoalUpdateDto(this.goalScoredModel())));
          if (result.success) {
            this.matchStore.reload();
            this.onDialogClosed.emit();
          }
        },
      },      
    }
  );

  closeDialog(): void {
    this.onDialogClosed.emit();
  }
}
