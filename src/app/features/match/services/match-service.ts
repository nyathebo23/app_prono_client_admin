import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MatchCreateDto } from '../dtos/match-create-dto';
import { matchesReqUrl } from '../../../shared/utils/urls';
import { MatchDto } from '../dtos/match-dto';
import { MatchUpdateDto } from '../dtos/match-update-dto';

@Injectable({
  providedIn: 'root',
})
export class MatchService {
  constructor(private readonly http: HttpClient) {}

  getMatches(): Observable<MatchDto[]> {
    return this.http.get<MatchDto[]>(matchesReqUrl);
  }

  getMatch(id: string): Observable<MatchDto> {
    return this.http.get<MatchDto>(`${matchesReqUrl}${id}`);
  }

  createMatch(data: MatchCreateDto): Observable<MatchDto> {
    return this.http.post<MatchDto>(matchesReqUrl, data);
  }

  updateMatch(id: string, data: MatchUpdateDto): Observable<MatchDto> {
    return this.http.put<MatchDto>(`${matchesReqUrl}${id}`, data);
  }

  deleteMatch(id: string): Observable<void> {
    return this.http.delete<void>(`${matchesReqUrl}${id}`);
  }
}
