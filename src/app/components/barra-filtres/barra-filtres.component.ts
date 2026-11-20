import { Component, EventEmitter, Output, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { distinctUntilChanged, filter, map } from 'rxjs';
import { COMARQUES, Comarca, FiltresRuta } from '../../models/ruta.model';
import { RutesService } from '../../services/rutes.service';
import { HistorialCerquesService } from '../../services/historial-cerques.service';
import { teResultatsValidator } from '../../validators/te-resultats.validator';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-barra-filtres',
  styleUrl: './barra-filtres.component.scss',
  templateUrl: './barra-filtres.component.html',
})
export class BarraFiltresComponent {
  @Output() filtresCanviats = new EventEmitter<FiltresRuta>();

  private fb = inject(FormBuilder);
  private rutesService = inject(RutesService);
  private historial = inject(HistorialCerquesService);

  readonly comarques = COMARQUES;
  readonly termesHistorial = this.historial.termes;

  form = this.fb.nonNullable.group({
    text: ['', {
      validators: [Validators.minLength(3)],
      asyncValidators: [teResultatsValidator(this.rutesService)],
    }],
    comarca: ['Totes' as Comarca | 'Totes'],
  });

  get text() {
    return this.form.controls.text;
  }

  constructor() {
    // Quan el formulari passa a vàlid s'emeten els criteris i es guarda el terme a l'historial
    this.form.statusChanges.pipe(
      filter(estat => estat === 'VALID'),
      map(() => this.form.getRawValue()),
      distinctUntilChanged((a, b) => a.text.trim() === b.text.trim() && a.comarca === b.comarca),
      takeUntilDestroyed(),
    ).subscribe(criteris => {
      const text = criteris.text.trim();
      this.filtresCanviats.emit({ text, comarca: criteris.comarca });
    });
  }

  recuperaCerca(terme: string): void {
    this.text.setValue(terme);
    this.text.markAsTouched();
  }

  desaCerca(): void {
    const text = this.text.value.trim();
    if (this.form.valid && text) {
      this.historial.afegir(text);
    }
  }

  netejaCerca(): void {
    this.form.reset();
  }

  esborraHistorial(): void {
    this.historial.esborrar();
  }
}