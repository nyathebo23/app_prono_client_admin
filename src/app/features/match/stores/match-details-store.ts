import { computed, inject, Service, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';
import { createApiErrorResponse } from '../../../shared/api/api-error-response';
import { Match } from '../models/match';
import { MatchService } from '../services/match-service';

@Service()
export class MatchDetailsStore {
    private readonly matchService = inject(MatchService);

    readonly matchId = signal<string | null>(null);

    readonly matchDetailsResource = rxResource({
        params: () => this.matchId() ?? undefined,
        stream: ({ params }) => params ? this.matchService.getMatchById(params) : of(null),
        defaultValue: null as Match | null,
    });

    readonly matchDetailsResourceError = computed(
        () => createApiErrorResponse(this.matchDetailsResource.error())
    );

    reload() {
        this.matchDetailsResource.reload();
    }
}
