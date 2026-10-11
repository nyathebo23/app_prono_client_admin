import { Component, inject, signal } from '@angular/core';
import { EmptyTable } from '../../../../shared/components/empty-table/empty-table';
import { Competition } from '../../models/competition';
import { CompetitionUpdateDialog } from '../competition-update-dialog/competition-update-dialog';
import { RouterLink } from '@angular/router';
import { CompetitionQueryStore } from '../../stores/competition-query-store';

@Component({
  selector: 'app-competition-list',
  imports: [EmptyTable, CompetitionUpdateDialog, RouterLink],
  templateUrl: './competition-list.html',
  styleUrl: './competition-list.scss',
  providers: [CompetitionQueryStore]
})
export class CompetitionList {

  private readonly competitionQueryStore = inject(CompetitionQueryStore);
  competitions = this.competitionQueryStore.competitionsListResource.value;
  isLoading = this.competitionQueryStore.competitionsListResource.isLoading
  error = this.competitionQueryStore.competitionsListResourceError;
  skeletonRows = Array(10).fill(0);

  modalUpdateOpen = signal(false);


  competitionToEdit = signal<Competition | null>(null);

  openUpdateDialog(competition: Competition) {
      this.modalUpdateOpen.set(true);
      this.competitionToEdit.set(competition);
  }

  closeUpdateDialog() {
    this.modalUpdateOpen.set(false);
  }

}
