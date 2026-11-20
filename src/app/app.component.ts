import { NovaRutaComponent } from './components/nova-ruta/nova-ruta.component';
import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DatePipe } from '@angular/common';
import { FiltresRuta, Ruta } from './models/ruta.model';
import { RutesService } from './services/rutes.service';
import { BarraFiltresComponent } from './components/barra-filtres/barra-filtres.component';
import { LlistaRutaComponent } from './components/llista-ruta/llista-ruta.component';

@Component({
  imports: [RouterOutlet, DatePipe, BarraFiltresComponent, LlistaRutaComponent, NovaRutaComponent],
  selector: 'app-root',
  styleUrl: './app.component.scss',
  templateUrl: './app.component.html',
})
export class App {
  protected readonly title = signal('ioc-angular-mapix-laura-vinas');
  public appName = 'Mapix';

  private rutesService = inject(RutesService);

  // Estats que venen del servei
  readonly carregant = this.rutesService.carregant;
  readonly error = this.rutesService.error;
  filtres: FiltresRuta = { text: '', comarca: 'Totes' };
  rutaSeleccionada: Ruta | null = null;
  
  constructor() {
    this.rutesService.cercar(this.filtres);
  }

  // El servei ja retorna les rutes filtrades i adaptades
  get rutesFiltrades(): Ruta[] {
    return this.rutesService.rutes();
  }

  actualitzaFiltres(filtres: FiltresRuta): void {
      this.filtres = filtres;
      this.rutaSeleccionada = null;
      this.rutesService.cercar(filtres);
  }

  reintentar(): void {
    this.rutesService.reintentar();
  }

  seleccionaRuta(ruta: Ruta): void {
    this.rutaSeleccionada = ruta;
  }

  tancaDetall(): void {
    this.rutaSeleccionada = null;
  }
}