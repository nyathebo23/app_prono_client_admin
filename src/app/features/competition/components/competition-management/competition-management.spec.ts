import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CompetitionManagement } from './competition-management';

describe('CompetitionManagement', () => {
  let component: CompetitionManagement;
  let fixture: ComponentFixture<CompetitionManagement>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompetitionManagement]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CompetitionManagement);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
