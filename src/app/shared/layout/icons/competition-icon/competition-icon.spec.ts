import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetitionIcon } from './competition-icon';

describe('CompetitionIcon', () => {
  let component: CompetitionIcon;
  let fixture: ComponentFixture<CompetitionIcon>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompetitionIcon]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompetitionIcon);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
