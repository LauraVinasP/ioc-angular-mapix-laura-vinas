import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Comarca, FiltresRuta } from '../../models/ruta.model';

@Component({
  imports: [FormsModule],
  selector: 'app-barra-filtres',
  styleUrl: './barra-filtres.component.scss',
  templateUrl: './barra-filtres.component.html',
})
export class BarraFiltresComponent {
  @Output() filtresCanviats = new EventEmitter<FiltresRuta>();

  comarques: Comarca[] = ['Vallès Occidental', 'Vallès Oriental', 'Bages','Osona','Berguedà'];

  filtres: FiltresRuta = {text: '', comarca: 'Totes'};

  aplicaFiltres(): void {
    this.filtresCanviats.emit({ ...this.filtres });
  }

  restableixFiltres(form: NgForm): void {
    this.filtres = { text: '', comarca: 'Totes' };
    form.resetForm(this.filtres);
    this.filtresCanviats.emit({ ...this.filtres });
  }
}
