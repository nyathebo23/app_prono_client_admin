import { computed, inject, Service, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { MatchFilterDto } from '../dtos/match-filter-dto';
import { createApiErrorResponse } from '../../../shared/api/api-error-response';
import { MatchService } from '../services/match-service';

@Service()
export class MatchQueryStore {
  private readonly matchService = inject(MatchService);

  private readonly competitionId = signal<string | null>(null);
  private readonly matchCompetitionFilters = signal<MatchFilterDto>(MatchFilterDto.empty());
  private readonly matchLiveFilters = signal<MatchFilterDto>(MatchFilterDto.empty());

  readonly matchesCompetitionResource = rxResource({
    params: () => {
      const competitionId = this.competitionId();
      return competitionId
        ? { competitionId, filters: this.matchCompetitionFilters() }
        : undefined;
    },
    stream: ({ params }) => this.matchService.getMatchesByCompetition(params.competitionId, params.filters),
    defaultValue: [],
  });

  readonly matchesLiveResource = rxResource({
    params: () => this.matchLiveFilters(),
    stream: ({ params }) => this.matchService.getLiveMatches(params),
    defaultValue: [],
  });

  readonly matchesLiveResourceError = computed(
    () => createApiErrorResponse(this.matchesLiveResource.error())
  );

  readonly matchesCompetitionResourceError = computed(
    () => createApiErrorResponse(this.matchesCompetitionResource.error())
  );

  readonly hasCompetitionId = computed(() => !!this.competitionId());

  loadCompetitionMatches(competitionId: string, filters: MatchFilterDto = MatchFilterDto.empty()): void {
    this.competitionId.set(competitionId);
    this.matchCompetitionFilters.set(filters);
  }

  loadLiveMatches(filters: MatchFilterDto = MatchFilterDto.empty()): void {
    this.matchLiveFilters.set(filters);
  }
}
