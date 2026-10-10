import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { map, Observable } from 'rxjs';
import { SearchTeamQueryDto } from '../dtos/search-team-query-dto';
import { TeamCreateDto } from '../dtos/team-create-dto';
import { TeamDto } from '../dtos/team-dto';
import { Team } from '../models/team';
import { API_ENDPOINTS } from '../../../shared/api/api-endpoints';
import { TeamUpdateDto } from '../dtos/team-update-dto';

@Service()
export class TeamService {
  private readonly http = inject(HttpClient);

  getTeams(): Observable<Team[]> {
    return this.http.get<TeamDto[]>(API_ENDPOINTS.TEAM).pipe(
      map((dtos) => dtos.map((dto) => Team.fromTeamDto(dto))),
    );
  }

  searchTeams(query: SearchTeamQueryDto = SearchTeamQueryDto.empty()): Observable<Team[]> {
    return this.http
      .get<TeamDto[]>(`${API_ENDPOINTS.TEAM}/search`, {
        params: query.toHttpParams(),
      })
      .pipe(map((dtos) => dtos.map((dto) => Team.fromTeamDto(dto))));
  }

  createTeam(data: TeamCreateDto): Observable<TeamDto> {
    return this.http.post<TeamDto>(API_ENDPOINTS.TEAM, data);
  }

  updateTeam(id: string, data: TeamUpdateDto): Observable<TeamDto> {
    return this.http.patch<TeamDto>(`${API_ENDPOINTS.TEAM}/${id}`, data);
  }

  deleteTeam(id: string): Observable<void> {
    return this.http.delete<void>(`${API_ENDPOINTS.TEAM}/${id}`);
  }
}
