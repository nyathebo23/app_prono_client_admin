import { inject, Service } from '@angular/core';
import { createMutation } from '../../../shared/mutation/create-mutation';
import { CompetitionCreateDto } from '../dtos/competitition-create-dto';
import { CompetitionUpdateDto } from '../dtos/competition-update-dto';
import { CompetitionService } from '../services/competition-service';
import { CompetitionQueryStore } from './competition-query-store';


@Service()
export class CompetitionStore {
    private readonly competitionService = inject(CompetitionService);
    private readonly competitionQueryStore = inject(CompetitionQueryStore);

    private readonly _createMutation = createMutation<string>();
    private readonly _updateMutation = createMutation<null>();
    private readonly _deleteMutation = createMutation<null>();


    readonly createLoading = this._createMutation.loading;
    readonly updateLoading = this._updateMutation.loading;

    readonly createError =  this._createMutation.error;
    readonly updateError =  this._updateMutation.error;



    async createCompetition(data: CompetitionCreateDto): Promise<boolean> {
        const result = await this._createMutation.mutate(this.competitionService.createCompetition(data));
        if (result.success) {
            this.competitionQueryStore.reloadCompetitions();
        }
        return result.success;
    }

    async updateCompetition(id: string, data: CompetitionUpdateDto): Promise<boolean> {
        const result = await this._updateMutation.mutate(this.competitionService.updateCompetition(id, data));
        if (result.success) {
            this.competitionQueryStore.reloadCompetitions();
        }
        return result.success;
    }

    async deleteCompetition(id: string): Promise<boolean> {
        const result = await this._deleteMutation.mutate(this.competitionService.deleteCompetition(id));
        if (result.success) {
            this.competitionQueryStore.reloadCompetitions();
        }
        return result.success;
    }
}
