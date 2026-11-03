export type Comarca = 'Vallès Occidental' | 'Vallès Oriental' | 'Bages' | 'Osona' | 'Berguedà';

export type Tematica = 'Bosc encantat' | 'Castells' | 'Pirates' | 'Exploradors' | 'Dracs';

export type Dificultat = 'Fàcil' | 'Mitjana' | 'Difícil';

export interface Ruta {
    id: number;
    nom: string;
    nomReal: string;
    comarca: Comarca;
    tematica: Tematica;
    dificultat: Dificultat;
    dataPublicacio: string;
    distanciaKm: number;
    descripcio: string;
    destacada?: boolean;
}

export interface FiltresRuta {
    text: string;
    comarca: Comarca | 'Totes';
}

