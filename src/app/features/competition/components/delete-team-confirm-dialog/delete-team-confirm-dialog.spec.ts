import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DeleteTeamConfirmDialog } from './delete-team-confirm-dialog';

describe('DeleteTeamConfirmDialog', () => {
  let component: DeleteTeamConfirmDialog;
  let fixture: ComponentFixture<DeleteTeamConfirmDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteTeamConfirmDialog]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DeleteTeamConfirmDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
