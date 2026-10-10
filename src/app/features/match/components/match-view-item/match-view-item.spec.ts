import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatchViewItem } from './match-view-item';

describe('MatchViewItem', () => {
  let component: MatchViewItem;
  let fixture: ComponentFixture<MatchViewItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatchViewItem]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MatchViewItem);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
