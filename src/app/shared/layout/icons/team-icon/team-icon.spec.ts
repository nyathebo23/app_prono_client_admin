import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamIcon } from './team-icon';

describe('TeamIcon', () => {
  let component: TeamIcon;
  let fixture: ComponentFixture<TeamIcon>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeamIcon]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeamIcon);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
