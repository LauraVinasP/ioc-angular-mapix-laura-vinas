import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NovaRutaComponent } from './nova-ruta.component';

describe('NovaRutaComponent', () => {
  let component: NovaRutaComponent;
  let fixture: ComponentFixture<NovaRutaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NovaRutaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NovaRutaComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
