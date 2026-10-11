import { Component, computed, inject } from '@angular/core';
import { MatchViewItem } from '../match-view-item/match-view-item';
import { MatchQueryStore } from '../../stores/match-query-store';

@Component({
  imports: [MatchViewItem],
  selector: 'app-match-live-list',
  styleUrl: './match-live-list.scss',
  templateUrl: './match-live-list.html',
  providers: [MatchQueryStore]
})
export class MatchLiveList {
  private readonly matchQueryStore = inject(MatchQueryStore);

  protected readonly liveMatches = computed(
    () => this.matchQueryStore.matchesLiveResource.value() ?? [],
  );

  protected readonly liveMatchesError = this.matchQueryStore.matchesLiveResourceError;
  protected readonly liveMatchesLoading = this.matchQueryStore.matchesLiveResource.isLoading;
}
