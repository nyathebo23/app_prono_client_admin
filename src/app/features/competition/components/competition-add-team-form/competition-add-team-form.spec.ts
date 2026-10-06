import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetitionAddTeamForm } from './competition-add-team-form';

describe('CompetitionAddTeamForm', () => {
  let component: CompetitionAddTeamForm;
  let fixture: ComponentFixture<CompetitionAddTeamForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompetitionAddTeamForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompetitionAddTeamForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
