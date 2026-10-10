import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-match-list',
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './match-list.html',
  styleUrls: ['./match-list.scss'],
})
export class MatchList {}

