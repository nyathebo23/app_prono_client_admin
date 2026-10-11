import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { API_ENDPOINTS } from '../../../shared/api/api-endpoints';
import { GoalCreateDto } from '../dtos/goal-create-dto';
import { GoalUpdateDto } from '../dtos/goal-update-dto';

@Service()
export class GoalScoredService {
  private readonly http = inject(HttpClient);

  createGoal(data: GoalCreateDto): Observable<string> {
    return this.http.post<string>(`${API_ENDPOINTS.GOAL_COMMAND}`, data);
  }

  editGoal(id: string, data: GoalUpdateDto): Observable<null> {
    return this.http.patch<null>(`${API_ENDPOINTS.GOAL_COMMAND}/${id}/edit`, data);
  }

  cancelGoal(id: string, matchId: string): Observable<null> {
    return this.http.post<null>(`${API_ENDPOINTS.GOAL_COMMAND}/${id}/cancel`, { matchId });
  }
}
