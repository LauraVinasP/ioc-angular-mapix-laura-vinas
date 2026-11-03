import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TargetaRutaComponent } from './targeta-ruta.component';

describe('TargetaRutaComponent', () => {
  let component: TargetaRutaComponent;
  let fixture: ComponentFixture<TargetaRutaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TargetaRutaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TargetaRutaComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
