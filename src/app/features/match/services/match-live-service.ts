import { inject, Service, signal } from '@angular/core';
import { GoalScoredEvent } from '../live-events/goal-scored-event';
import { MatchStatusChangedEvent } from '../live-events/match-status-change-event';
import { GoalCanceledEvent } from '../live-events/goal-canceled-event';
import { SetPenShootoutEvent } from '../live-events/set-pen-shootout-event';
import { MatchQueryStore } from '../stores/match-query-store';
import { API_ENDPOINTS } from '../../../shared/api/api-endpoints';
import { MatchStatus } from '../enums/match-status';
import { GoalUpdatedEvent } from '../live-events/goal-updated-event';

@Service()
export class MatchLiveService {

    private readonly matchQueryStore = inject(MatchQueryStore);
    private eventSource?: EventSource;
    readonly status = signal<'idle' | 'connected' | 'error' | 'disconnected'>(
        'idle'
    );

    connect(options?: { withCredentials?: boolean }) {
        this.disconnect();

        this.eventSource = new EventSource(API_ENDPOINTS.MATCH_LIVE + '/all', {
            withCredentials: options?.withCredentials,
        });

        this.eventSource.addEventListener('GoalCanceledEvent', (event) => {
            const data = JSON.parse(event.data) as GoalCanceledEvent;
            console.log(data);
            this.matchQueryStore.matchesLiveResource.update((matches) => {
                return matches.map((match) => {
                    if (match.id === data.matchId) {
                        const updatedMatch = { ...match };
                        if (updatedMatch.resultExtraTimeTeamAway ) {
                            updatedMatch.resultExtraTimeTeamAway = data.scoreAway;
                            updatedMatch.resultExtraTimeTeamHome = data.scoreHome;
                        }
                        else {
                            updatedMatch.resultTeamAway = data.scoreAway;
                            updatedMatch.resultTeamHome = data.scoreHome;
                        }
                        return updatedMatch;
                    }
                    return match;
                });
            });
        });

        this.eventSource.addEventListener('GoalScoredEvent', (event) => {
            const data = JSON.parse(event.data) as GoalScoredEvent;
            console.log(data);
            this.matchQueryStore.matchesLiveResource.update((matches) => {
                return matches.map((match) => {
                    if (match.id === data.matchId) {
                        const updatedMatch = { ...match };
                        if (updatedMatch.resultExtraTimeTeamAway ) {
                            updatedMatch.resultExtraTimeTeamAway = data.scoreAway;
                            updatedMatch.resultExtraTimeTeamHome = data.scoreHome;
                        }
                        else {
                            updatedMatch.resultTeamAway = data.scoreAway;
                            updatedMatch.resultTeamHome = data.scoreHome;
                        }
                        return updatedMatch;
                    }
                    return match;
                });
            });
        });

        this.eventSource.addEventListener('GoalUpdatedEvent', (event) => {
            const data = JSON.parse(event.data) as GoalUpdatedEvent;
            console.log(data);
            this.matchQueryStore.matchesLiveResource.update((matches) => {
                return matches.map((match) => {
                    if (match.id === data.matchId) {
                        const updatedMatch = { ...match };
                        if (updatedMatch.resultExtraTimeTeamAway ) {
                            updatedMatch.resultExtraTimeTeamAway = data.scoreAway;
                            updatedMatch.resultExtraTimeTeamHome = data.scoreHome;
                        }
                        else {
                            updatedMatch.resultTeamAway = data.scoreAway;
                            updatedMatch.resultTeamHome = data.scoreHome;
                        }
                        return updatedMatch;
                    }
                    return match;
                });
            });
        });

        this.eventSource.addEventListener('MatchStatusChangedEvent', (event) => {
            const data = JSON.parse(event.data) as MatchStatusChangedEvent;
            console.log(data);
            if (data.status === MatchStatus.FIRST_HALF) {
                this.matchQueryStore.matchesLiveResource.reload();
                return;
            }
            if (data.status === MatchStatus.FINISHED) {
                this.matchQueryStore.matchesLiveResource.update((matches) => 
                    matches.filter((match) => match.id !== data.matchId)
                );
                return;
            }

            this.matchQueryStore.matchesLiveResource.update((matches) => {
                return matches.map((match) => {
                    if (match.id === data.matchId) {
                        const updatedMatch = { ...match };
                        updatedMatch.status = data.status;
                        updatedMatch.isInProgress = data.isInProgress;
                        return updatedMatch;
                    }
                    return match;
                });
            });
        });

        this.eventSource.addEventListener('SetPenShootoutEvent', (event) => {
            const data = JSON.parse(event.data) as SetPenShootoutEvent;
            console.log(data);
            this.matchQueryStore.matchesLiveResource.update((matches) => {
                return matches.map((match) => {
                    if (match.id === data.matchId) {
                        const updatedMatch = { ...match };
                        updatedMatch.resultPenShootoutTeamHome = data.scoreTeamHome;
                        updatedMatch.resultPenShootoutTeamAway = data.scoreTeamAway;
                        return updatedMatch;
                    }
                    return match;
                });
            });
        });
        
        this.eventSource.onopen = () => {
            this.status.set('connected');
            console.log('Connected to live match events');
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
