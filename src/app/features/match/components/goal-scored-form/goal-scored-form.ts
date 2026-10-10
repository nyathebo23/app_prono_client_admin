import { Component, effect, inject, input, output, signal } from '@angular/core';
import { GoalScoredFormModel, toGoalCreateDto } from '../../models/goal-scored-form-model';
import { form, max, min, required } from '@angular/forms/signals';
import { GoalScoredStore } from '../../stores/goal-scored-store';
import { FormField, FormRoot } from '@angular/forms/signals';

@Component({
  imports: [FormRoot, FormField],
  selector: 'app-goal-scored-form',
  styleUrl: './goal-scored-form.scss',
  templateUrl: './goal-scored-form.html',
})
export class GoalScoredForm {
  private readonly goalScoredStore = inject(GoalScoredStore);

  protected readonly goalCreateLoading = this.goalScoredStore.createLoading;
  protected readonly goalCreateError = this.goalScoredStore.createError;

  matchId = input.required<string>();
  homeTeamName = input<string>('Domicile');
  awayTeamName = input<string>('Extérieur');
  goalCreated = output<void>();
  goalScoredModel = signal<GoalScoredFormModel>(GoalScoredFormModel.empty(''));

  GoalScoredFormModel = GoalScoredFormModel;

  constructor() {
    effect(() => {
      this.goalScoredModel.set(GoalScoredFormModel.empty(this.matchId()));
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
          const result = await this.goalScoredStore.createGoal(toGoalCreateDto(this.goalScoredModel()));
          console.log('Goal creation result:', result);
          if (result) {
            this.goalCreated.emit();
            this.goalScoredModel.set(GoalScoredFormModel.empty(this.matchId()));
          }
        },
      },      
    }
  );
}
