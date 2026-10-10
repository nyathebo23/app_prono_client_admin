import { Component, effect, inject, input, output, signal } from '@angular/core';
import { FormField, FormRoot, form, max, min, required } from '@angular/forms/signals';
import { GoalScoredStore } from '../../stores/goal-scored-store';
import { GoalScored } from '../../models/goal-scored';
import { GoalScoredFormModel, toGoalUpdateDto } from '../../models/goal-scored-form-model';

@Component({
  imports: [FormField, FormRoot],
  selector: 'app-goal-scored-update-dialog',
  styleUrl: './goal-scored-update-dialog.scss',
  templateUrl: './goal-scored-update-dialog.html',
})
export class GoalScoredUpdateDialog {

  private readonly goalScoredStore = inject(GoalScoredStore);

  protected readonly goalUpdateLoading = this.goalScoredStore.editLoading;
  protected readonly goalUpdateError = this.goalScoredStore.editError;

  goalScoredData = input.required<GoalScored>();
  homeTeamName = input<string>('Domicile');
  awayTeamName = input<string>('Extérieur');
  onDialogClosed = output<void>();
  goalUpdated = output<void>();

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
          const result = await this.goalScoredStore.editGoal(goal.id, toGoalUpdateDto(this.goalScoredModel()));
          if (result) {
            this.goalUpdated.emit();
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
