# Serveis

## RutesService

Fitxer: `src/app/services/rutes.service.ts`

Servei responsable de tota la comunicació amb l'API. Els components no construeixen URLs ni fan peticions HTTP directament.

- **URL base:** `API_URL` a `src/app/config/api.config.ts` (`http://localhost:3000`).
- **HttpClient:** s'injecta amb `inject(HttpClient)`. A Angular 22 està per defecte, per tant, no s'ha configurat `provideHttpClient()`.

### Estat exposat (senyals)

| Senyal | Tipus | Descripció |
|---|---|---|
| `rutes` | `Ruta[]` | Rutes adaptades i filtrades |
| `carregant` | `boolean` | `true` quan una petició està en curs |
| `error` | `string \| null` | Missatge d'error si l'API no respon |

### Mètodes

| Mètode | Petició | Descripció |
|---|---|---|
| `cercar(filtres)` | — | Guarda els filtres i els emet al flux `cerques$` |
| `reintentar()` | — | Torna a emetre els últims filtres |
| `obtenirRutes(filtres)` | `GET /rutes?comarca=...` | Obté rutes, les adapta i filtra per text |
| `crearRuta(nova)` | `POST /rutes` | Crea una ruta i l'afegeix al llistat |
| `teResultats(text)` | `GET /rutes` | Usat pel validador asíncron |

### Flux amb switchMap

Al constructor, el `Subject` `cerques$` passa per:

1. `tap`: posa `carregant` a `true` i neteja l'error.
2. `switchMap`: crida `obtenirRutes()` i cancel·la la petició anterior si n'arriba una de nova.
3. `catchError`: si falla, deixa el missatge a `error` i retorna una llista buida perquè el flux continuï.
4. `subscribe`: guarda les rutes i posa `carregant` a `false`.

## HistorialCerquesService

Fitxer: `src/app/services/historial-cerques.service.ts`

- Guarda els darrers 5 termes de cerca a `localStorage` amb la clau `mapix-historial-cerques`.
- Evita duplicats consecutius (sense distingir majúscules).
- Lectura i escriptura protegides amb `try/catch`.