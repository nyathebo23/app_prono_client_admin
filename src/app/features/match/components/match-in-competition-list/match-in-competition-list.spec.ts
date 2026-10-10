import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatchInCompetitionList } from './match-in-competition-list';

describe('MatchInCompetitionList', () => {
  let component: MatchInCompetitionList;
  let fixture: ComponentFixture<MatchInCompetitionList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatchInCompetitionList]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MatchInCompetitionList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
