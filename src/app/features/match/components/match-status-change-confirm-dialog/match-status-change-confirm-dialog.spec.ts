import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatchStatusChangeConfirmDialog } from './match-status-change-confirm-dialog';

describe('MatchStatusChangeConfirmDialog', () => {
  let component: MatchStatusChangeConfirmDialog;
  let fixture: ComponentFixture<MatchStatusChangeConfirmDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatchStatusChangeConfirmDialog]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MatchStatusChangeConfirmDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
