import { computed, inject, Service, signal } from '@angular/core';
import { CompetitionService } from '../services/competition-service';
import { rxResource } from '@angular/core/rxjs-interop';
import { createApiErrorResponse } from '../../../shared/api/api-error-response';

@Service()
export class SingleCompetitionDetailsStore {

    private readonly competitionService = inject(CompetitionService);

    readonly selectedCompetitionId = signal<string | null>(null);
    
    readonly competitionResource = rxResource({
        params: () => this.selectedCompetitionId() ?? undefined,
        stream: ({params}) => this.competitionService.getCompetition(params),
        defaultValue: undefined
    });

    readonly competitionResourceError = computed(
        () => createApiErrorResponse(this.competitionResource.error())    
    );

    loadCompetition(id: string | null): void {
        this.selectedCompetitionId.set(id);
    }
}
