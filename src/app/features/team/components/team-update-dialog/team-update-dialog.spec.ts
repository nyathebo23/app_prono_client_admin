import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TeamUpdateDialog } from './team-update-dialog';

describe('TeamUpdateDialog', () => {
  let component: TeamUpdateDialog;
  let fixture: ComponentFixture<TeamUpdateDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeamUpdateDialog]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TeamUpdateDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
