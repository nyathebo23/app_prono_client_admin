import { Component, computed, inject } from '@angular/core';
import { MatchViewItem } from '../match-view-item/match-view-item';
import { MatchQueryStore } from '../../stores/match-query-store';
import { MatchLiveService } from '../../services/match-live-service';
import { ResourceError } from '../../../../shared/components/resource-error/resource-error';

@Component({
  imports: [MatchViewItem, ResourceError],
  selector: 'app-match-live-list',
  styleUrl: './match-live-list.scss',
  templateUrl: './match-live-list.html',
  //providers: [MatchQueryStore, MatchLiveService]
})
export class MatchLiveList {
  private readonly matchQueryStore = inject(MatchQueryStore);

  private readonly matchLiveService = inject(MatchLiveService);
  constructor() {
    this.matchLiveService.connect();
  }
  protected readonly liveMatches = this.matchQueryStore.matchesLiveResource.value;

  protected readonly liveMatchesError = this.matchQueryStore.matchesLiveResourceError;
  protected readonly liveMatchesLoading = this.matchQueryStore.matchesLiveResource.isLoading;

  protected reloadMatches(): void {
    this.matchQueryStore.matchesLiveResource.reload();
  }
}
