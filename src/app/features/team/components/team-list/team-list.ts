import { Component, inject, output } from '@angular/core';
import { TeamStore } from '../../stores/team-store';
import { EmptyTable } from '../../../../shared/components/empty-table/empty-table';
import { Team } from '../../models/team';

@Component({
  selector: 'app-team-list',
  imports: [EmptyTable],
  templateUrl: './team-list.html',
  styleUrls: ['./team-list.scss'],
})
export class TeamList {
  private readonly teamStore = inject(TeamStore);

  readonly onEdit = output<Team>();

  teams = this.teamStore.teamsResource.value;
  isLoading = this.teamStore.teamsResource.isLoading;
  error = this.teamStore.teamsResourceError;
  skeletonRows = Array(10).fill(0);

  openUpdateDialog(team: Team): void {
    this.onEdit.emit(team);
  }
}
