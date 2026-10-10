import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { API_ENDPOINTS } from '../../../shared/api/api-endpoints';
import { Observable } from 'rxjs';
import { CompetitionAddTeamDto } from '../dtos/competition-add-team-dto';

@Service()
export class TeamInCompetitionService {
    private readonly http = inject(HttpClient);

    enrollTeamToCompetition(data: CompetitionAddTeamDto): Observable<string> {
      return this.http.post<string>(API_ENDPOINTS.TEAM_IN_COMPETITION, data);
    }

    removeTeamFromCompetition(competitionId: string, teamId: string): Observable<null> {
      const params = new HttpParams()
        .set('competitionId', competitionId)
        .set('teamId', teamId);
      return this.http.post<null>(`${API_ENDPOINTS.TEAM_IN_COMPETITION}`, null, { params });
    }

    removeByTeamInCompetitionId(id: string): Observable<null> {  
      return this.http.post<null>(`${API_ENDPOINTS.TEAM_IN_COMPETITION}/${id}`, {});
    }

    deleteTeamFromCompetition(competitionId: string, teamId: string): Observable<null> {
      const params = new HttpParams()
        .set('competitionId', competitionId)
        .set('teamId', teamId);
      return this.http.delete<null>(`${API_ENDPOINTS.TEAM_IN_COMPETITION}`, { params });
    }

    deleteByTeamInCompetitionId(id: string): Observable<null> {  
      return this.http.delete<null>(`${API_ENDPOINTS.TEAM_IN_COMPETITION}/${id}`, {});
    }

}
