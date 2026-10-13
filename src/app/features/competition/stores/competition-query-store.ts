import { computed, inject, Service, signal } from '@angular/core';
import { CompetitionService } from '../services/competition-service';
import { rxResource } from '@angular/core/rxjs-interop';
import { createApiErrorResponse } from '../../../shared/api/api-error-response';
import { PlayerSex } from '../../../shared/utils/enums/player-sex';

@Service({autoProvided: false})
export class CompetitionQueryStore {
    private readonly competitionService = inject(CompetitionService);

    readonly competitionsListResource = rxResource({
        stream: () => this.competitionService.getCompetitions(),
        defaultValue: []
    });

    readonly competitionsActiveOrUpcomingResource = rxResource({
        stream: () => this.competitionService.getActiveOrUpcomingCompetitions(),
        defaultValue: []
    });    


    readonly competitionsActiveOrUpcomingResourceError = computed(
        () =>  createApiErrorResponse(this.competitionsActiveOrUpcomingResource.error())
    );

    readonly competitionsListResourceError = computed(
        () =>  createApiErrorResponse(this.competitionsListResource.error())
    );

    reloadCompetitions(): void {
        this.competitionsListResource.reload();
        this.competitionsActiveOrUpcomingResource.reload();
    }
    
}
