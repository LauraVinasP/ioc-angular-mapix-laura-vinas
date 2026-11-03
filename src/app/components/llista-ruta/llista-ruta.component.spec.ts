import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LlistaRutaComponent } from './llista-ruta.component';

describe('LlistaRutaComponent', () => {
  let component: LlistaRutaComponent;
  let fixture: ComponentFixture<LlistaRutaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LlistaRutaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LlistaRutaComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
