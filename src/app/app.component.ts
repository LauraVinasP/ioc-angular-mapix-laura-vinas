import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DatePipe } from '@angular/common';
import { FiltresRuta, Ruta } from './models/ruta.model';
import { RUTES_MOCK } from './mocks/rutes-mock';
import { BarraFiltresComponent } from './components/barra-filtres/barra-filtres.component';
import { LlistaRutaComponent } from './components/llista-ruta/llista-ruta.component';

@Component({
  imports: [RouterOutlet, DatePipe, BarraFiltresComponent, LlistaRutaComponent],
  selector: 'app-root',
  styleUrl: './app.component.scss',
  templateUrl: './app.component.html',
})
export class App {
  protected readonly title = signal('ioc-angular-mapix-laura-vinas');
  public appName = 'Mapix';

  rutes: Ruta[] = RUTES_MOCK;
  filtres: FiltresRuta = { text: '', comarca: 'Totes' };
  rutaSeleccionada: Ruta | null = null;

  get rutesFiltrades(): Ruta[] {
    const text = this.filtres.text.trim().toLowerCase();

    return this.rutes.filter((ruta) => {
      const coincideixText =
        text === '' ||
        ruta.nom.toLowerCase().includes(text) ||
        ruta.nomReal.toLowerCase().includes(text);
      const coincideixComarca =
        this.filtres.comarca === 'Totes' || ruta.comarca === this.filtres.comarca;

      return coincideixText && coincideixComarca;
    });
  }

  actualitzaFiltres(filtres: FiltresRuta): void {
    this.filtres = filtres;
    const seleccionadaVisible = this.rutesFiltrades.some(
      (ruta) => ruta.id === this.rutaSeleccionada?.id,
    );
    if (!seleccionadaVisible) {
      this.rutaSeleccionada = null;
    }
  }

  seleccionaRuta(ruta: Ruta): void {
    this.rutaSeleccionada = ruta;
  }

  tancaDetall(): void {
    this.rutaSeleccionada = null;
  }
}