import { RutaApi } from "../models/ruta-api.model";
import { Comarca, Dificultat, Ruta, Tematica } from "../models/ruta.model";

const COMARQUES: Comarca[] = ['Vallès Occidental', 'Vallès Oriental', 'Bages', 'Berguedà', 'Osona'];
const TEMATIQUES: Tematica[] = ['Bosc encantat', 'Castells', 'Dracs', 'Exploradors', 'Pirates'];
const DIFICULTATS: Dificultat[] = ['Fàcil', 'Mitjana', 'Difícil'];

//Netjem espais
function netejarText(valor: string | undefined, perDefecte = ''): string {
    const net = (valor ?? '').trim();
    return net.length > 0? net : perDefecte;
}

//Conversió de números
function aNumero(valor: number | string): number {
    const num = typeof valor === 'number' ? valor : Number(String(valor).replace(',','.'));
    return Number.isFinite(num) ? num : 0;
}

//passar tot a minúscules pe fer una comparació correcta
function simplificar(valor: string): string {
    return valor.trim().toLowerCase().normalize('NFC').replace(/[\u0300-\u036f]/g, '');
}

//Normalitzar categories i buscar valors coincidents
function normalitzar<T extends string>(valor: string | undefined, permesos: T[], perDefecte: T): T {
    const buscat = simplificar(valor ?? '');
    return permesos.find(p => simplificar(p) === buscat) ?? perDefecte;
}

//donar format a les dates 
function aData(valor: string): string {
    const data = new Date(valor);
    return isNaN(data.getTime()) ? '' : data.toISOString().slice(0,10);
}

export function adaptarRuta(api: RutaApi): Ruta {
    return {
        id: String(api.id),
        nom: netejarText(api.nom, 'Ruta sense nom'),
        nomReal: netejarText(api.nomReal),
        comarca: normalitzar(api.comarca, COMARQUES, 'Vallès Occidental'),
        tematica: normalitzar(api.tematica, TEMATIQUES, 'Exploradors'),
        dificultat: normalitzar(api.dificultat, DIFICULTATS, 'Fàcil'),
        dataPublicacio: aData(api.dataPublicacio),
        distanciaKm: aNumero(api.distanciaKm),
        descripcio: netejarText(api.descripcio, 'Sense descripció'),
        destacada: api.destacada ?? false,
    };
}

export function adaptarRutes(llista: RutaApi[]): Ruta[] {
    return llista.map(adaptarRuta);
}
