import { Injectable, signal } from '@angular/core';

const CLAU = 'mapix-historial-cerques';
const MAXIM = 5;

@Injectable({ providedIn: 'root' })
export class HistorialCerquesService {
    readonly termes = signal<string[]>(this.llegir());

    afegir(terme: string): void {
        const net = terme.trim();
        if (!net) return;

        const actual = this.termes();
        // Evita duplicats consecutius, si és igual a l'últim, no fa res
        if (actual[0]?.toLowerCase() === net.toLowerCase()) return;

        const nou = [net, ...actual].slice(0, MAXIM);
        this.termes.set(nou);
        this.desar(nou);
    }

    esborrar(): void {
        this.termes.set([]);
        this.desar([]);
    }

    private llegir(): string[] {
        try {
            const dades = localStorage.getItem(CLAU);
            const llista = dades ? JSON.parse(dades) : [];
            return Array.isArray(llista) ? llista.filter(t => typeof t === 'string') : [];
        } catch {
            return [];
        }
    }

    private desar(llista: string[]): void {
        try {
            localStorage.setItem(CLAU, JSON.stringify(llista));
        } catch {
            console.warn("No s'ha pogut desar l'historial de cerques.");
        }
    }
}