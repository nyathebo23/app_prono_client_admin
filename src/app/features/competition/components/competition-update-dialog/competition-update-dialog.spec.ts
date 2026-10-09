import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CompetitionUpdateDialog } from './competition-update-dialog';

describe('CompetitionUpdateDialog', () => {
  let component: CompetitionUpdateDialog;
  let fixture: ComponentFixture<CompetitionUpdateDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompetitionUpdateDialog]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CompetitionUpdateDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
