import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResourceError } from './resource-error';

describe('ResourceError', () => {
  let component: ResourceError;
  let fixture: ComponentFixture<ResourceError>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResourceError]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ResourceError);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('displays the API error and emits retry when requested', () => {
    let retryRequested = false;
    component.retry.subscribe(() => {
      retryRequested = true;
    });
    fixture.componentRef.setInput('error', {
      status: 503,
      message: 'Le serveur est indisponible.',
      errorType: 'server',
    });
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('Erreur du serveur');
    expect(fixture.nativeElement.textContent).toContain('Le serveur est indisponible.');
    expect(fixture.nativeElement.textContent).toContain('Code HTTP 503');

    fixture.nativeElement.querySelector('button').click();

    expect(retryRequested).toBe(true);
  });
});
