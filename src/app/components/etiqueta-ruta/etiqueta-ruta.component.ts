import { Component, Input } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-etiqueta-ruta',
  styleUrl: './etiqueta-ruta.component.scss',
  templateUrl: './etiqueta-ruta.component.html',
})
export class EtiquetaRutaComponent {
  @Input({ required: true}) text!: string;
}
