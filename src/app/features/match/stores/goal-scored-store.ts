import { inject, Service, signal } from '@angular/core';
import { createMutation } from '../../../shared/mutation/create-mutation';
import { GoalCreateDto } from '../dtos/goal-create-dto';
import { GoalScoredService } from '../services/goal-scored-service';

@Service()
export class GoalScoredStore {
  private readonly goalScoredService = inject(GoalScoredService);
  private readonly matchId = signal<string | null>(null);

  private readonly _createMutation = createMutation<string>();
  private readonly _editMutation = createMutation<null>();
  private readonly _cancelMutation = createMutation<null>();


  async createGoal(data: GoalCreateDto): Promise<boolean> {
    const result = await this._createMutation.mutate(this.goalScoredService.createGoal(data));
    return result.success;
  }

  async editGoal(id: string, data: GoalCreateDto): Promise<boolean> {
    const result = await this._editMutation.mutate(this.goalScoredService.editGoal(id, data));
    return result.success;
  }

  async cancelGoal(id: string): Promise<boolean> {
    const result = await this._cancelMutation.mutate(this.goalScoredService.cancelGoal(id));
    if (result.success) {
    }
    return result.success;
  }
}
