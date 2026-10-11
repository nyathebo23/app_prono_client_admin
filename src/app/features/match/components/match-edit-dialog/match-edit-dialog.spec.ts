import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatchEditDialog } from './match-edit-dialog';

describe('MatchEditDialog', () => {
  let component: MatchEditDialog;
  let fixture: ComponentFixture<MatchEditDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatchEditDialog]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MatchEditDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
