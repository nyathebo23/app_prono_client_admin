import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CompetitionQueryStore } from '../../../competition/stores/competition-query-store';

@Component({
  selector: 'app-match-list',
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './match-list.html',
  styleUrls: ['./match-list.scss'],
  providers: [CompetitionQueryStore],
})
export class MatchList {}

