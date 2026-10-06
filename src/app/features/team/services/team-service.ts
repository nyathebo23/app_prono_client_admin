import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TeamDto } from '../dtos/team-dto';
import { TeamCreateDto } from '../dtos/team-create-dto';
import { teamsReqUrl } from '../../../shared/utils/urls';

@Injectable({
  providedIn: 'root',
})
export class TeamService {
  constructor(private readonly http: HttpClient) {}

  getTeams(): Observable<TeamDto[]> {
    return this.http.get<TeamDto[]>(teamsReqUrl);
  }

  createTeam(data: TeamCreateDto): Observable<TeamDto> {
    return this.http.post<TeamDto>(teamsReqUrl, data);
  }

  updateTeam(id: string, data: TeamCreateDto): Observable<TeamDto> {
    return this.http.put<TeamDto>(`${teamsReqUrl}${id}`, data);
  }

  deleteTeam(id: string): Observable<void> {
    return this.http.delete<void>(`${teamsReqUrl}${id}`);
  }
}
