import { Component, effect, inject, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { CompetitionAddTeamForm } from '../competition-add-team-form/competition-add-team-form';
import { SingleCompetitionDetailsStore } from '../../stores/single-competition-details-store';
import { TeamInCompetition } from '../../models/team-in-competition';
import { DeleteTeamConfirmDialog } from '../delete-team-confirm-dialog/delete-team-confirm-dialog';
import { RemoveTeamConfirmDialog } from '../remove-team-confirm-dialog/remove-team-confirm-dialog';

@Component({
  imports: [DatePipe, RouterLink, CompetitionAddTeamForm, DeleteTeamConfirmDialog, RemoveTeamConfirmDialog],
  selector: 'app-competition-details',
  styleUrl: './competition-details.scss',
  templateUrl: './competition-details.html',
})
export class CompetitionDetails {
  private readonly route = inject(ActivatedRoute);
  private readonly competitionsDetailsStore = inject(SingleCompetitionDetailsStore);
  private readonly routeId = toSignal(
    this.route.paramMap.pipe(map((params) => params.get('id'))),
    { initialValue: this.route.snapshot.paramMap.get('id') },
  );

  readonly competition = this.competitionsDetailsStore.competitionResource.value;
  readonly isLoading = this.competitionsDetailsStore.competitionResource.isLoading;
  readonly error = this.competitionsDetailsStore.competitionResourceError;
  readonly teamToRemove = signal<TeamInCompetition | null>(null);
  readonly teamToDelete = signal<TeamInCompetition | null>(null);

  constructor() {
    effect(() => this.competitionsDetailsStore.loadCompetition(this.routeId()));
  }

  openRemoveTeamDialog(team: TeamInCompetition): void {
    this.teamToRemove.set(team);
  }

  closeRemoveTeamDialog(): void {
    this.teamToRemove.set(null);
  }

  openDeleteTeamDialog(team: TeamInCompetition): void {
    this.teamToDelete.set(team);
  }

  closeDeleteTeamDialog(): void {
    this.teamToDelete.set(null);
  }
}
