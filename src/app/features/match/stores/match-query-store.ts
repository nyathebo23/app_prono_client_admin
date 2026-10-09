import { httpResource } from '@angular/common/http';
import { computed, Service, signal } from '@angular/core';
import { API_ENDPOINTS } from '../../../shared/api/api-endpoints';
import { MatchFilterDto } from '../dtos/match-filter-dto';
import { MatchItemDto } from '../dtos/match-item-dto';
import { createApiErrorResponse } from '../../../shared/api/api-error-response';

@Service()
export class MatchQueryStore {
  private readonly competitionId = signal<string | null>(null);
  private readonly filters = signal<MatchFilterDto>(MatchFilterDto.empty());

  readonly matchesCompetitionResource = httpResource<MatchItemDto[]>(() => {
    const id = this.competitionId();

    if (!id) {
      return undefined;
    }
    return {
      url: `${API_ENDPOINTS.MATCH_QUERY}competition/${id}`,
      params: this.filters().toHttpParams(),
      defaultValue: []
    };
  });

  readonly matchesLiveResource = httpResource<MatchItemDto[]>(() => ({
    url: API_ENDPOINTS.MATCH_LIVE,
    params: this.filters().toHttpParams(),
    defaultValue: []
  }));

  readonly matchesLiveResourceError = computed(
    () => createApiErrorResponse(this.matchesLiveResource.error())
  );

  readonly matchesCompetitionResourceError = computed(
    () => createApiErrorResponse(this.matchesCompetitionResource.error())
  ); 

  readonly hasCompetitionId = computed(() => !!this.competitionId());

  loadCompetitionMatches(competitionId: string, filters: MatchFilterDto = MatchFilterDto.empty()): void {
    this.competitionId.set(competitionId);
    this.filters.set(filters);
  }

  loadLiveMatches(filters: MatchFilterDto = MatchFilterDto.empty()): void {
    this.filters.set(filters);
  }
}
