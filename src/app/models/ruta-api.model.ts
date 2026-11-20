export interface RutaApi {
    id: string;
    nom: string;
    nomReal: string; 
    comarca: string;
    tematica: string;
    dificultat: string;
    dataPublicacio: string;
    distanciaKm: number | string;
    descripcio?: string;
    destacada?: boolean;
}