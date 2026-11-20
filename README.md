# Mapix 

## Autor/a 

Laura Viñas Pérez

## Descripció 

Aplicació de mapes interactius de rutes de muntanya destinada a famílies amb nens. Els mapes contindran pistes per seguir el camí correcte i activitats i reptes per fer durant l’excursió. L’objectiu és enfocar les rutes de manera més atractiva al públic infantil per incentivar fer excursions de manera divertida.

## Versions utilitzades

- Node.js 24.21.0
- npm 11.19.0
- Angular CLI 22.2.2
- Angular 22
- Git 2.52.0
- TypeScript 6.0.x

## Com crear i executar el projecte

Comanda utilitzada per generar el projecte:

ng new ioc-angular-mapix-laura-vinas --routing --style=scss --ssr=false --standalone=true --file-name-style-guide=2016 --skip-git=true -–package-manager=npm

Per executar-lo després de clonar el repositori es necessiten dues terminals:

1. `npm install`
2. `npm run api` a la Terminal 1 (arrenca l'API local a http://localhost:3000)
3. `ng serve -o` a la Terminal 2 (s'obre el navegador amb "http://localhost:4200")

Altres comandes: 

- `npm run build`: compila l'aplicació
- `npm test`: executa els tests (Vitest)

## Branques

- `main` : estat inicial del projecte. 
- `ra1-setup`: EAC1, preparació de l'entorn. 
- `ra2-components`: EAC2, components i interfície d'usuari
- `ra3-serveis`: EAC3, serveis HTTP, API local i formularis reactius.
- `ra4-navegacio`: reservada per a la propera EAC.


## Estat de la EAC1

Aquesta EAC ha consistit en:
- Instal·lar tot el programari necessari. 
- Crear el projecte amb una estructura clara. 
- Pujar el projecte a git, generar diverses branques i fer push.
- Generar un HTML basic amb el contingut de la pàgina.  
- Modificar la estètica de la pàgina inicial.   

## Estat de la EAC2 

L'aplicació mostra un llistat de 10 rutes. 
Permet filtrar per text i comarca. 
En seleccionar una ruta, es veu el detall. 

### Model i dades

- `src/app/models/ruta.model.ts`: interfície `Ruta`, tipus `Comarca`, `Tematica` i `Dificultat`, i interfície `FiltresRuta`.
- `src/app/mocks/rutes-mock.ts`: 10 rutes d'exemple (`RUTES_MOCK`). A partir de l'EAC3, ja no s'utilitza. Les dades venen de l'API. 

### Components creats


- `App`: Guarda l'estat (rutes, filtres i ruta seleccionada), calcula les rutes filtrades i mostra el panell de detall.
- `BarraFiltresComponent`: Formulari de cerca per text i comarca amb validacions (`required`, `minlength`). 
- `LlistaRutaComponent`: Comptador de resultats, llistat amb `@for` i missatge quan no hi ha resultats.
- `TargetaRutaComponent`: Resum d'una ruta i botó per veure'n el detall. 
- `EtiquetaRutaComponent`: Etiqueta visual de temàtica, dificultat o ruta destacada.

### Accessibilitat i responsive

- Enllaç de salt al contingut principal.
- Focus visible amb `:focus-visible`.
- `label` associats als camps del formulari.
- `role="status"`, `role="alert"` i `aria-live` als missatges dinàmics.
- Layout d'una columna en mòbil i dues columnes a partir de 900 px.

## Estat de la EAC3

L'aplicació obté les rutes d'una API local amb json-server, permet crear-ne de noves (POST) i té un formulari reactiu de cerca amb validació asíncrona i historial.

### API local

- Fitxer de dades: `api/db.json` (10 rutes inicials + les creades amb POST).
- Script: `npm run api` → `json-server api/db.json --port 3000`.
- Endpoint: `http://localhost:3000/rutes`.
- URL base centralitzada a `src/app/config/api.config.ts`.

### Models i adaptador

- `src/app/models/ruta-api.model.ts`: `RutaApi`, resposta de l'API.
- `src/app/models/ruta.model.ts`: `Ruta`, model intern.
- `src/app/adapters/ruta.adapter.ts`: `adaptarRuta()` i `adaptarRutes()`, amb normalització de dades.

### Serveis

- `RutesService`: GET, POST, estats de càrrega i error, reintent i cerca amb `switchMap`.
- `HistorialCerquesService`: historial de cerques a `localStorage`.

### Formularis

- `BarraFiltresComponent`: cerca reactiva amb validació síncrona (`minLength`), asíncrona (`teResultatsValidator`), debounce de 400 ms i historial.
- `NovaRutaComponent`: formulari reactiu per crear rutes.

### Errors i accessibilitat

- Banner d'error amb botó **Reintentar** quan l'API no respon.
- Estat de càrrega amb `role="status"` i errors amb `role="alert"`.

### Documentació tècnica

- `docs/models.md`: mapatge API → model intern.
- `docs/serveis.md`: serveis, mètodes i flux amb `switchMap`.
- `docs/formularis.md`: formularis, validadors i historial.

## Enllaç del repositori 

https://github.com/LauraVinasP/ioc-angular-mapix-laura-vinas