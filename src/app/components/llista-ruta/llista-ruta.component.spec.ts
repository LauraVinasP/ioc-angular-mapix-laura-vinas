import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LlistaRutaComponent } from './llista-ruta.component';
import { RUTES_MOCK } from '../../mocks/rutes-mock';

describe('LlistaRutaComponent', () => {
  let component: LlistaRutaComponent;
  let fixture: ComponentFixture<LlistaRutaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LlistaRutaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LlistaRutaComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('rutes', RUTES_MOCK);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});