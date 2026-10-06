import { CommonModule } from '@angular/common';
import { Component, computed, inject, OnInit, signal } from '@angular/core';

import { TeamService } from '../../services/team-service';
import { Team } from '../../dtos/team-dto';
import { TeamCreateDto } from '../../dtos/team-create-dto';

@Component({
  selector: 'app-team-form',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './team-form.html',
  styleUrls: ['./team-form.scss'],
})
export class TeamForm  {
 
}
