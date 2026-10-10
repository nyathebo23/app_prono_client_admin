import { Component, computed, effect, inject, output, signal } from '@angular/core';
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

  readonly currentPage = signal(1);
  readonly pageSize = signal(10);
  readonly pageSizeOptions = [5, 10, 20, 50];
  readonly totalItems = computed(() => this.teams().length);
  readonly totalPages = computed(() => Math.max(1, Math.ceil(this.totalItems() / this.pageSize())));
  readonly showPagination = computed(() => this.totalItems() > this.pageSize());
  readonly paginatedTeams = computed(() => {
    const startIndex = (this.currentPage() - 1) * this.pageSize();
    return this.teams().slice(startIndex, startIndex + this.pageSize());
  });
  readonly firstItem = computed(() => this.totalItems() === 0 ? 0 : (this.currentPage() - 1) * this.pageSize() + 1);
  readonly lastItem = computed(() => Math.min(this.currentPage() * this.pageSize(), this.totalItems()));

  constructor() {
    effect(() => {
      this.teams();
      this.currentPage.set(1);
    });
  }

  goToPreviousPage(): void {
    this.currentPage.update((page) => Math.max(1, page - 1));
  }

  goToNextPage(): void {
    this.currentPage.update((page) => Math.min(this.totalPages(), page + 1));
  }

  onPageSizeChange(event: Event): void {
    const selectedSize = Number((event.target as HTMLSelectElement).value);
    if (this.pageSizeOptions.includes(selectedSize)) {
      this.pageSize.set(selectedSize);
      this.currentPage.set(1);
    }
  }

  openUpdateDialog(team: Team): void {
    this.onEdit.emit(team);
  }
}
