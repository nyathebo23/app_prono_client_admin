import { Component, signal } from '@angular/core';
import { TeamList } from '../team-list/team-list';
import { TeamForm } from '../team-form/team-form';
import { TeamUpdateDialog } from '../team-update-dialog/team-update-dialog';
import { Team } from '../../models/team';
import { TeamStore } from '../../stores/team-store';

@Component({
  selector: 'app-team-management',
  imports: [TeamList, TeamForm, TeamUpdateDialog],
  styleUrl: './team-management.scss',
  templateUrl: './team-management.html',
  providers: [TeamStore]
})
export class TeamManagement {
  modalUpdateOpen = signal(false);
  teamToEdit = signal<Team | null>(null);

  openUpdateDialog(team: Team): void {
    this.teamToEdit.set(team);
    this.modalUpdateOpen.set(true);
  }

  closeUpdateDialog(): void {
    this.modalUpdateOpen.set(false);
    this.teamToEdit.set(null);
  }
}
