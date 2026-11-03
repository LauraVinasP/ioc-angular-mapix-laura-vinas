import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TargetaRutaComponent } from './targeta-ruta.component';
import { RUTES_MOCK } from '../../mocks/rutes-mock';

describe('TargetaRutaComponent', () => {
  let component: TargetaRutaComponent;
  let fixture: ComponentFixture<TargetaRutaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TargetaRutaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TargetaRutaComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('ruta', RUTES_MOCK[0]);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});