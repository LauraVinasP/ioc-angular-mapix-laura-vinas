import { Injectable, inject, signal } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, Subject, catchError, map, of, switchMap, tap } from 'rxjs';
import { API_URL } from '../config/api.config';
import { RutaApi } from '../models/ruta-api.model';
import { FiltresRuta, Ruta } from '../models/ruta.model';
import { adaptarRuta, adaptarRutes } from '../adapters/ruta.adapter';

@Injectable({ providedIn: 'root' })
export class RutesService {
    private http = inject(HttpClient);
    private url = `${API_URL}/rutes`;

    // Estats que llegeix la interfície
    readonly rutes = signal<Ruta[]>([]);
    readonly carregant = signal(false);
    readonly error = signal<string | null>(null);

    // Cada cerca nova entra per Subject
    private cerques$ = new Subject<FiltresRuta>();
    private ultimsFiltres: FiltresRuta = { text: '', comarca: 'Totes' };

    constructor() {
        this.cerques$.pipe(
            tap(() => {
                this.carregant.set(true);
                this.error.set(null);
            }),
            // switchMap: si arriba una cerca nova es cancel·la la petició anterior
            switchMap(filtres => this.obtenirRutes(filtres).pipe(
                catchError(() => {
                    this.error.set("No s'ha pogut connectar amb l'API.");
                    return of([] as Ruta[]);
                })
            ))
        ).subscribe(rutes => {
            this.rutes.set(rutes);
            this.carregant.set(false);
        });
    }

    cercar(filtres: FiltresRuta): void {
        this.ultimsFiltres = filtres;
        this.cerques$.next(filtres);
    }

    reintentar(): void {
        this.cerques$.next(this.ultimsFiltres);
    }

    // GET: la comarca es filtra a l'API i el text, aquí
    obtenirRutes(filtres: FiltresRuta): Observable<Ruta[]> {
        let params = new HttpParams();
        if (filtres.comarca !== 'Totes') {
            params = params.set('comarca', filtres.comarca);
        }
        return this.http.get<RutaApi[]>(this.url, { params }).pipe(
            map(adaptarRutes),
            map(rutes => this.filtrarPerText(rutes, filtres.text))
        );
    }

    // POST: crea una ruta i l'afegeix al llistat
    crearRuta(nova: Omit<Ruta, 'id'>): Observable<Ruta> {
        return this.http.post<RutaApi>(this.url, nova).pipe(
            map(adaptarRuta),
            tap(creada => this.rutes.update(llista => [...llista, creada]))
        );
    }

    // Per a la validació asíncrona: hi ha alguna ruta amb aquest text?
    teResultats(text: string): Observable<boolean> {
        return this.http.get<RutaApi[]>(this.url).pipe(
            map(adaptarRutes),
            map(rutes => this.filtrarPerText(rutes, text).length > 0)
        );
    }

    private filtrarPerText(rutes: Ruta[], text: string): Ruta[] {
        const buscat = text.trim().toLowerCase();
        if (!buscat) return rutes;
        return rutes.filter(r =>
            r.nom.toLowerCase().includes(buscat) ||
            r.nomReal.toLowerCase().includes(buscat)
        );
    }
}