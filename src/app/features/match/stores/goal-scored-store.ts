import { inject, Service, signal } from '@angular/core';
import { createMutation } from '../../../shared/mutation/create-mutation';
import { GoalCreateDto } from '../dtos/goal-create-dto';
import { GoalUpdateDto } from '../dtos/goal-update-dto';
import { GoalScoredService } from '../services/goal-scored-service';

@Service()
export class GoalScoredStore {
  private readonly goalScoredService = inject(GoalScoredService);
  private readonly matchId = signal<string | null>(null);

  private readonly _createMutation = createMutation<string>();
  private readonly _editMutation = createMutation<null>();
  private readonly _cancelMutation = createMutation<null>();

  readonly createLoading = this._createMutation.loading;
  readonly createError = this._createMutation.error;
  readonly editLoading = this._editMutation.loading;
  readonly editError = this._editMutation.error;
  readonly cancelLoading = this._cancelMutation.loading;
  readonly cancelError = this._cancelMutation.error;

  async createGoal(data: GoalCreateDto): Promise<boolean> {
    const result = await this._createMutation.mutate(this.goalScoredService.createGoal(data));
    return result.success;
  }

  async editGoal(id: string, data: GoalUpdateDto): Promise<boolean> {
    const result = await this._editMutation.mutate(this.goalScoredService.editGoal(id, data));
    return result.success;
  }

  async cancelGoal(id: string): Promise<boolean> {
    const result = await this._cancelMutation.mutate(this.goalScoredService.cancelGoal(id));
    return result.success;
  }
}
