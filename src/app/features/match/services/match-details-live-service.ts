import { inject, Service, signal } from '@angular/core';
import { API_ENDPOINTS } from '../../../shared/api/api-endpoints';
import { MatchDetailsStore } from '../stores/match-details-store';
import { GoalScoredEvent } from '../live-events/goal-scored-event';
import { GoalUpdatedEvent } from '../live-events/goal-updated-event';
import { MatchStatusChangedEvent } from '../live-events/match-status-change-event';
import { GoalCanceledEvent } from '../live-events/goal-canceled-event';
import { SetPenShootoutEvent } from '../live-events/set-pen-shootout-event';
import { GoalScored } from '../models/goal-scored';

@Service()
export class MatchDetailsLiveService {

    private readonly matchDetailsStore = inject(MatchDetailsStore);
    private eventSource?: EventSource;
    readonly status = signal<'idle' | 'connected' | 'error' | 'disconnected'>(
        'idle'
    );

    connect(options?: { withCredentials?: boolean }) {
        this.disconnect();
        const matchId = this.matchDetailsStore.matchId();
        if (!matchId) {
            console.error('Cannot connect to match live service: matchId is null');
            return;
        }
        this.eventSource = new EventSource(API_ENDPOINTS.MATCH_LIVE + '/' + matchId, {
            withCredentials: options?.withCredentials,
        });

        this.eventSource.addEventListener('GoalCanceledEvent', (event) => {
            const data = JSON.parse(event.data) as GoalCanceledEvent;
            console.log(data);
            this.matchDetailsStore.matchDetailsResource.update((match) => {
                if (match && match.id === data.matchId) {
                    const updatedMatch = { ...match };
                    updatedMatch.resultTeamHome = data.scoreHome;
                    updatedMatch.resultTeamAway = data.scoreAway;
                    updatedMatch.goals = updatedMatch.goals.map((goal) => goal.id !== data.goalId ? goal : { ...goal, isCanceled: true });
                    return updatedMatch;
                }
                return match;
            });
            
        });

        this.eventSource.addEventListener('GoalScoredEvent', (event) => {
            const data = JSON.parse(event.data) as GoalScoredEvent;
            console.log(data);
            this.matchDetailsStore.matchDetailsResource.update((match) => {
                if (match && match.id === data.matchId) {
                    const updatedMatch = { ...match };
                    updatedMatch.resultTeamHome = data.scoreHome;
                    updatedMatch.resultTeamAway = data.scoreAway;
                    updatedMatch.goals = [...updatedMatch.goals, GoalScored.fromGoalScoredEvent(data)];
                    return updatedMatch;
                }
                return match;
            });
        });

        this.eventSource.addEventListener('GoalUpdatedEvent', (event) => {
            const data = JSON.parse(event.data) as GoalUpdatedEvent;
            console.log(data);

            this.matchDetailsStore.matchDetailsResource.update((match) => {
                if (match && match.id === data.matchId) {
                    const updatedMatch = { ...match };
                    updatedMatch.resultTeamHome = data.scoreHome;
                    updatedMatch.resultTeamAway = data.scoreAway;
                    updatedMatch.goals = updatedMatch.goals.map((goal) => {
                        if (goal.id === data.goalId) {
                            return new GoalScored(
                                data.goalId,
                                data.matchId,
                                data.scorer,
                                data.minute,
                                data.isOwnGoal,
                                data.isPenalty,
                                data.teamHomeScored,
                                goal.isCanceled
                            );
                        }
                        return goal;
                    });
                    return updatedMatch;
                }
                return match;
            });
        });
        this.eventSource.addEventListener('MatchStatusChangedEvent', (event) => {
            const data = JSON.parse(event.data) as MatchStatusChangedEvent;
            console.log(data);
            this.matchDetailsStore.matchDetailsResource.update((match) => {
                if (match && match.id === data.matchId) {
                    const updatedMatch = { ...match };
                    updatedMatch.status = data.status;
                    updatedMatch.isInProgress = data.isInProgress;
                    return updatedMatch;
                }
                return match;
            });
        });

        this.eventSource.addEventListener('SetPenShootoutEvent', (event) => {
            const data = JSON.parse(event.data) as SetPenShootoutEvent;
            console.log(data);
            this.matchDetailsStore.matchDetailsResource.update((match) => {
                if (match && match.id === data.matchId) {
                    const updatedMatch = { ...match };
                    updatedMatch.resultPenShootoutTeamHome = data.scoreTeamHome;
                    updatedMatch.resultPenShootoutTeamAway = data.scoreTeamAway;
                    return updatedMatch;
                }
                return match;
            });
        });
        
        this.eventSource.onopen = () => {
            this.status.set('connected');
            //this.scheduleTick();
        };

        this.eventSource.onerror = () => {
            this.status.set('error');
        };

  }

  disconnect() {
    this.eventSource?.close();
    this.eventSource = undefined;

    this.status.set('disconnected');
  }

  ngOnDestroy() {
    this.disconnect();
  }
}
