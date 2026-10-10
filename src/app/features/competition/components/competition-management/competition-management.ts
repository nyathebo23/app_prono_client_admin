import { Component, signal } from '@angular/core';
import { CompetitionList } from '../competition-list/competition-list';
import { CompetitionForm } from '../competition-form/competition-form';


@Component({
  imports: [CompetitionList, CompetitionForm],
  selector: 'app-competition-management',
  styleUrl: './competition-management.scss',
  templateUrl: './competition-management.html',
})
export class CompetitionManagement {
  readonly activeTab = signal<'list' | 'create'>('list');

  readonly tabs = [
    { id: 'list', label: 'Liste des compétitions', panel: 'competition-list-panel' },
    { id: 'create', label: 'Créer une compétition', panel: 'competition-create-panel' },
  ] as const;


  selectTab(id: 'list' | 'create'): void {
    this.activeTab.set(id);
  }

  moveToTabList() {
    this.selectTab('list');
  }
 
}
