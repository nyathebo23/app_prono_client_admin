import { Component, effect, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { CompetitionStore } from '../../stores/competition-store';
import { CompetitionAddTeamForm } from '../competition-add-team-form/competition-add-team-form';
import { SingleCompetitionDetailsStore } from '../../stores/single-competition-details-store';

@Component({
  imports: [DatePipe, RouterLink, CompetitionAddTeamForm],
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

  constructor() {
    effect(() => this.competitionsDetailsStore.loadCompetition(this.routeId()));
  }
}
