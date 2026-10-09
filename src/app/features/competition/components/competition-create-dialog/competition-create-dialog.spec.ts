import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CompetitionCreateDialog } from './competition-create-dialog';

describe('CompetitionCreateDialog', () => {
  let component: CompetitionCreateDialog;
  let fixture: ComponentFixture<CompetitionCreateDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompetitionCreateDialog]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CompetitionCreateDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
