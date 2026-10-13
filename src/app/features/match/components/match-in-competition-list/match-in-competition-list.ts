import { Component, computed, effect, inject, signal } from '@angular/core';
import { MatchViewItem } from '../match-view-item/match-view-item';
import { MatchQueryStore } from '../../stores/match-query-store';
import { CompetitionQueryStore } from '../../../competition/stores/competition-query-store';
import { MatchLiveService } from '../../services/match-live-service';
import { ResourceError } from '../../../../shared/components/resource-error/resource-error';
import { MatchStatus } from '../../enums/match-status';

@Component({
  imports: [MatchViewItem, ResourceError],
  selector: 'app-match-in-competition-list',
  styleUrl: './match-in-competition-list.scss',
  templateUrl: './match-in-competition-list.html',
})
export class MatchInCompetitionList {
  private readonly matchQueryStore = inject(MatchQueryStore);
  private readonly competitionQueryStore = inject(CompetitionQueryStore);

  private readonly matchLiveService = inject(MatchLiveService);
  protected readonly selectedCompetitionId = signal<string | null>(null);

  protected readonly competitions = this.competitionQueryStore.competitionsActiveOrUpcomingResource.value;
  protected readonly competitionsError = this.competitionQueryStore.competitionsActiveOrUpcomingResourceError;
  protected readonly competitionsLoading = this.competitionQueryStore.competitionsActiveOrUpcomingResource.isLoading;

  protected readonly selectedCompetition = computed(() => 
     this.competitions().find((competition) => competition.id === this.selectedCompetitionId()) ?? null
  );

  protected readonly matches = this.matchQueryStore.matchesCompetitionResource.value;
  protected readonly selectedMatchGroup = signal<'live-and-scheduled' | 'other'>('live-and-scheduled');
  protected readonly liveAndScheduledMatches = computed(() =>
    this.matches().filter((match) => match.isInProgress || match.status === MatchStatus.SCHEDULED),
  );
  protected readonly otherMatches = computed(() =>
    this.matches()
      .filter((match) => !match.isInProgress && match.status !== MatchStatus.SCHEDULED)
      .reverse(),
  );
  protected readonly visibleMatches = computed(() =>
    this.selectedMatchGroup() === 'live-and-scheduled'
      ? this.liveAndScheduledMatches()
      : this.otherMatches(),
  );

  protected readonly matchesInCompetitionError = this.matchQueryStore.matchesCompetitionResourceError;
  protected readonly matchesInCompetitionLoading = this.matchQueryStore.matchesCompetitionResource.isLoading;

  constructor() {
    effect(() => {
      const list = this.competitions();
      const current = this.selectedCompetitionId();

      if (!list.length) {
        return;
      }

      const hasCurrentSelection = current !== null && list.some((competition) => competition.id === current);
      if (!hasCurrentSelection) {
        this.selectedCompetitionId.set(list[0].id);
      }      
    });

    effect(() => {
      const competitionId = this.selectedCompetitionId();
      if (competitionId) {
        this.matchQueryStore.loadCompetitionMatches(competitionId);
      }
    });
  }

  protected selectCompetition(competitionId: string): void {
    this.selectedCompetitionId.set(competitionId);
  }

  protected selectMatchGroup(group: 'live-and-scheduled' | 'other'): void {
    this.selectedMatchGroup.set(group);
  }

  protected reloadCompetitions(): void {
    this.competitionQueryStore.reloadCompetitions();
  }

  protected reloadMatches(): void {
    this.matchQueryStore.matchesCompetitionResource.reload();
  }
}
