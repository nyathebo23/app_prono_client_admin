import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RemoveTeamConfirmDialog } from './remove-team-confirm-dialog';

describe('RemoveTeamConfirmDialog', () => {
  let component: RemoveTeamConfirmDialog;
  let fixture: ComponentFixture<RemoveTeamConfirmDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RemoveTeamConfirmDialog]
    })
      .compileComponents();

    fixture = TestBed.createComponent(RemoveTeamConfirmDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
