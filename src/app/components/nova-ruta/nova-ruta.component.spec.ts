import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NovaRuta } from './nova-ruta.component';

describe('NovaRuta', () => {
  let component: NovaRuta;
  let fixture: ComponentFixture<NovaRuta>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NovaRuta],
    }).compileComponents();

    fixture = TestBed.createComponent(NovaRuta);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
