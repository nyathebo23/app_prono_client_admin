import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CompetitionCreateDto } from '../dtos/competitition-create-dto';
import { map, Observable } from 'rxjs';
import { API_ENDPOINTS } from '../../../shared/api/api-endpoints';
import { CompetitionUpdateDto } from '../dtos/competition-update-dto';
import { CompetitionDto } from '../dtos/competition-dto';
import { CompetitionExtendedDto } from '../dtos/competition-extended-dto';
import { Competition } from '../models/competition';
import { CompetitionExtended } from '../models/competition-extended';
import { PlayerSex } from '../../../shared/utils/enums/player-sex';

@Injectable({
  providedIn: 'root',
})
export class CompetitionService {
  private readonly http = inject(HttpClient);

  createCompetition(data: CompetitionCreateDto): Observable<string> {
    return this.http.post<string>(API_ENDPOINTS.COMPETITION, data);
  }

  updateCompetition(id: string, data: CompetitionUpdateDto): Observable<null> {
    return this.http.put<null>(`${API_ENDPOINTS.COMPETITION}${id}`, data);
  }

  getCompetitions(): Observable<Competition[]> {
    return this.http.get<CompetitionDto[]>(API_ENDPOINTS.COMPETITION).pipe(
      map((dtos) => dtos.map((dto) => Competition.fromCompetitionDto(dto))),
    );
  }

  getActiveOrUpcomingCompetitionsBySex(playerSex: PlayerSex): Observable<Competition[]> {
    const params = new HttpParams().set('playerSex', String(playerSex));

    return this.http.get<CompetitionDto[]>(`${API_ENDPOINTS.COMPETITION}active-or-upcoming`, { params }).pipe(
      map((dtos) => dtos.map((dto) => Competition.fromCompetitionDto(dto))),
    );
  }

  getCompetition(id: string): Observable<CompetitionExtended> {
    return this.http.get<CompetitionExtendedDto>(`${API_ENDPOINTS.COMPETITION}${id}`).pipe(
      map((dto) => CompetitionExtended.fromCompetitionExtendedDto(dto)),
    );
  }

  deleteCompetition(id: string): Observable<null> {
    return this.http.delete<null>(`${API_ENDPOINTS.COMPETITION}${id}`);
  }
}
