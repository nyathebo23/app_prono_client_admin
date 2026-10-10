import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatchLiveList } from './match-live-list';

describe('MatchLiveList', () => {
  let component: MatchLiveList;
  let fixture: ComponentFixture<MatchLiveList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatchLiveList]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MatchLiveList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
