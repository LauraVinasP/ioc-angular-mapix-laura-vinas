import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Ruta } from '../../models/ruta.model';
import { EtiquetaRutaComponent } from '../etiqueta-ruta/etiqueta-ruta.component';


@Component({
  imports: [EtiquetaRutaComponent, DatePipe],
  selector: 'app-targeta-ruta',
  styleUrl: './targeta-ruta.component.scss',
  templateUrl: './targeta-ruta.component.html',
})

export class TargetaRutaComponent {
  @Input({ required: true }) ruta!: Ruta;
  @Input() seleccionada = false; 
  @Output() selecciona = new EventEmitter<Ruta>();

  avisaSeleccio(): void {
    this.selecciona.emit(this.ruta);
  }
}