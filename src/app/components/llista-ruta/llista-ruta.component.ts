import { Component, EventEmitter, Input, Output } from '@angular/core';
import {Ruta } from '../../models/ruta.model';
import { TargetaRutaComponent } from '../targeta-ruta/targeta-ruta.component';

@Component({
  imports: [TargetaRutaComponent],
  selector: 'app-llista-ruta',
  styleUrl: './llista-ruta.component.scss',
  templateUrl: './llista-ruta.component.html',
})
export class LlistaRutaComponent {
  @Input({ required: true }) rutes!: Ruta[];
  @Input() rutaSeleccionadaId: number | null = null;
  @Output() selecciona = new EventEmitter<Ruta>();

  propagaSeleccio(ruta: Ruta): void {
    this.selecciona.emit(ruta);
  }
}
