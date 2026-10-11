import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { map, Observable } from 'rxjs';
import { MatchCreateDto } from '../dtos/match-create-dto';
import { MatchDto } from '../dtos/match-dto';
import { MatchUpdateDto } from '../dtos/match-update-dto';
import { API_ENDPOINTS } from '../../../shared/api/api-endpoints';
import { MatchStatus } from '../enums/match-status';
import { SetPenShootoutResultDto } from '../dtos/set-pen-shootout-result-dto';
import { MatchItemDto } from '../dtos/match-item-dto';
import { MatchFilterDto } from '../dtos/match-filter-dto';
import { Match } from '../models/match';
import { MatchSummarized } from '../models/match-summarized';

@Service()
export class MatchService {
  private readonly http = inject(HttpClient);

  getMatchesByCompetition(
    competitionId: string,
    filters: MatchFilterDto = MatchFilterDto.empty(),
  ): Observable<MatchSummarized[]> {
    return this.http
      .get<MatchItemDto[]>(`${API_ENDPOINTS.MATCH_QUERY}/competition/${competitionId}`, {
        params: filters.toHttpParams(),
      })
      .pipe(map((dtos) => dtos.map((dto) => MatchSummarized.fromMatchDto(dto))));
  }

  getMatchById(id: string): Observable<Match> {
    return this.http.get<MatchDto>(`${API_ENDPOINTS.MATCH_QUERY}/${id}`).pipe(
      map((dto) => Match.fromMatchDto(dto)),
    );
  }

  getLiveMatches(filters: MatchFilterDto = MatchFilterDto.empty()): Observable<MatchSummarized[]> {
    return this.http
      .get<MatchItemDto[]>(`${API_ENDPOINTS.MATCH_QUERY}/live`, {
        params: filters.toHttpParams(),
      })
      .pipe(map((dtos) => dtos.map((dto) => MatchSummarized.fromMatchDto(dto))));
  }

  createMatch(data: MatchCreateDto): Observable<string> {
    return this.http.post<string>(`${API_ENDPOINTS.MATCH_COMMAND}/create`, data);
  }

  updateMatch(id: string, data: MatchUpdateDto): Observable<null> {
    return this.http.put<null>(`${API_ENDPOINTS.MATCH_COMMAND}/${id}/edit-infos`, data);
  }

  changeMatchStatus(id: string, status: MatchStatus): Observable<null> {
    return this.http.post<null>(`${API_ENDPOINTS.MATCH_COMMAND}/${id}/change-status`, { newMatchStatus: status });
  }

  cancelMatch(id: string): Observable<null> {
    return this.http.post<null>(`${API_ENDPOINTS.MATCH_COMMAND}/${id}/cancel`, {});
  }

  setPenShootoutResult(id: string, data: SetPenShootoutResultDto): Observable<null> {
    return this.http.post<null>(`${API_ENDPOINTS.MATCH_COMMAND}/${id}/penalty-shootout-result`, data);
  }

  deleteMatch(id: string): Observable<void> {
    return this.http.delete<void>(`${API_ENDPOINTS.MATCH_COMMAND}/${id}`);
  }
}
