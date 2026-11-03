import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EtiquetaRutaComponent } from './etiqueta-ruta.component';

describe('EtiquetaRutaComponent', () => {
  let component: EtiquetaRutaComponent;
  let fixture: ComponentFixture<EtiquetaRutaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EtiquetaRutaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EtiquetaRutaComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
