import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchIcon } from './match-icon';

describe('MatchIcon', () => {
  let component: MatchIcon;
  let fixture: ComponentFixture<MatchIcon>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatchIcon]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatchIcon);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
