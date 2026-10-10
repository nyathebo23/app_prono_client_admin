import { Component, computed, effect, inject, signal } from '@angular/core';
import { MatchViewItem } from '../match-view-item/match-view-item';
import { MatchQueryStore } from '../../stores/match-query-store';
import { CompetitionQueryStore } from '../../../competition/stores/competition-query-store';

@Component({
  imports: [MatchViewItem],
  selector: 'app-match-in-competition-list',
  styleUrl: './match-in-competition-list.scss',
  templateUrl: './match-in-competition-list.html',
})
export class MatchInCompetitionList {
  private readonly matchQueryStore = inject(MatchQueryStore);
  private readonly competitionQueryStore = inject(CompetitionQueryStore);

  protected readonly selectedCompetitionId = signal<string | null>(null);

  protected readonly competitions = this.competitionQueryStore.competitionsListResource.value;

  protected readonly selectedCompetition = computed(() => 
     this.competitions().find((competition) => competition.id === this.selectedCompetitionId()) ?? null
  );

  protected readonly matches = this.matchQueryStore.matchesCompetitionResource.value;

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
}
