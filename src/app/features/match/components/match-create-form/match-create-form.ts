import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TournamentService } from '../../../../services/tournament-service';

@Component({
  selector: 'app-match-create-form',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './match-create-form.html',
  styleUrls: ['./match-create-form.scss'],
})
export class MatchCreateForm {

}
