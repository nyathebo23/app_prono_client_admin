import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatchesByCompetition } from './matches-by-competition';

describe('MatchesByCompetition', () => {
  let component: MatchesByCompetition;
  let fixture: ComponentFixture<MatchesByCompetition>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatchesByCompetition]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MatchesByCompetition);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
