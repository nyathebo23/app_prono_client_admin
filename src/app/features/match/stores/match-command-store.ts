import { inject, Service } from '@angular/core';
import { createMutation } from '../../../shared/mutation/create-mutation';
import { MatchCreateDto } from '../dtos/match-create-dto';
import { MatchService } from '../services/match-service';
import { MatchQueryStore } from './match-query-store';
import { MatchUpdateDto } from '../dtos/match-update-dto';
import { MatchStatus } from '../enums/match-status';
import { SetPenShootoutResultDto } from '../dtos/set-pen-shootout-result-dto';

@Service()
export class MatchCommandStore {

    private readonly matchService = inject(MatchService);
    private readonly matchQueryStore = inject(MatchQueryStore);

    private readonly _createMutation = createMutation<string>();
    private readonly _updateMutation = createMutation<string>();
    private readonly _changeStatusMutation = createMutation<null>();
    private readonly _cancelMutation = createMutation<null>();
    private readonly _setPenShootoutResultMutation = createMutation<null>();

    readonly createLoading = this._createMutation.loading;
    readonly createError = this._createMutation.error;

    readonly updateLoading = this._updateMutation.loading;
    readonly updateError = this._updateMutation.error;

    readonly changeStatusLoading = this._changeStatusMutation.loading;
    readonly changeStatusError = this._changeStatusMutation.error;

    readonly cancelLoading = this._cancelMutation.loading;
    readonly cancelError = this._cancelMutation.error;

    readonly setPenShootoutResultLoading = this._setPenShootoutResultMutation.loading;
    readonly setPenShootoutResultError = this._setPenShootoutResultMutation.error;

    async createMatch(data: MatchCreateDto): Promise<boolean> {
        const result = await this._createMutation.mutate(this.matchService.createMatch(data));
        if (result.success) {
            this.matchQueryStore.matchesCompetitionResource.reload();
        }
        return result.success;
    }

    async updateMatch(id: string, data: MatchUpdateDto): Promise<boolean> {
        const result = await this._updateMutation.mutate(this.matchService.updateMatch(id, data));
        if (result.success) {
            this.matchQueryStore.matchesCompetitionResource.reload();
        }
        return result.success;
    }

    async changeMatchStatus(id: string, status: MatchStatus): Promise<boolean> {
        const result = await this._changeStatusMutation.mutate(this.matchService.changeMatchStatus(id, status));
        return result.success;
    }

    async cancelMatch(id: string): Promise<boolean> {
        const result = await this._cancelMutation.mutate(this.matchService.cancelMatch(id));
        return result.success;
    }

    async setPenShootoutResult(id: string, data: SetPenShootoutResultDto): Promise<boolean> {
        const result = await this._setPenShootoutResultMutation.mutate(this.matchService.setPenShootoutResult(id, data));
        return result.success;
    }

}
