
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RutesService } from '../../services/rutes.service';
import { COMARQUES, Comarca, DIFICULTATS, Dificultat, TEMATIQUES, Tematica } from '../../models/ruta.model';

@Component({
  selector: 'app-nova-ruta',
  imports: [ReactiveFormsModule],
  templateUrl: './nova-ruta.component.html',
  styleUrl: './nova-ruta.component.scss',
})
export class NovaRutaComponent {
  private fb = inject(FormBuilder);
  private rutesService = inject(RutesService);

  readonly comarques = COMARQUES;
  readonly tematiques = TEMATIQUES;
  readonly dificultats = DIFICULTATS;

  readonly desant = signal(false);
  readonly missatge = signal<string | null>(null);
  readonly errorDesar = signal<string | null>(null);

  form = this.fb.nonNullable.group({
    nom: ['', [Validators.required, Validators.minLength(3)]],
    nomReal: ['', Validators.required],
    comarca: ['Vallès Occidental' as Comarca],
    tematica: ['Exploradors' as Tematica],
    dificultat: ['Fàcil' as Dificultat],
    distanciaKm: [1, [Validators.required, Validators.min(0.5)]],
    descripcio: [''],
  });

  desar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.desant.set(true);
    this.missatge.set(null);
    this.errorDesar.set(null);

    this.rutesService.crearRuta({
      ...this.form.getRawValue(),
      dataPublicacio: new Date().toISOString().slice(0, 10),
      destacada: false,
    }).subscribe({
      next: (ruta) => {
        this.missatge.set(`Ruta "${ruta.nom}" creada correctament.`);
        this.form.reset();
        this.desant.set(false);
      },
      error: () => {
        this.errorDesar.set("No s'ha pogut desar la ruta.");
        this.desant.set(false);
      },
    });
  }
}