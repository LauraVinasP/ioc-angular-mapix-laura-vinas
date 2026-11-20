# Formularis

Tots dos formularis són reactius (`ReactiveFormsModule`) i es construeixen amb `FormBuilder.nonNullable`.

## Formulari de cerca (BarraFiltresComponent)

Fitxers: `src/app/components/barra-filtres/barra-filtres.component.ts` i `.html`

| Camp | Control | Validadors |
|---|---|---|
| Cerca per nom | `text` | Síncron: `Validators.minLength(3)`. Asíncron: `teResultatsValidator` |
| Comarca | `comarca` | Cap ("Totes" o una comarca) |

- **Validador asíncron:** `src/app/validators/te-resultats.validator.ts`. Consulta l'API amb `RutesService.teResultats()` i retorna l'error `senseResultats` si cap ruta coincideix. Si l'API falla, no bloqueja el formulari.
- **Debounce:** 400 ms (`DEBOUNCE_MS`), amb `timer()` dins el validador. Angular cancel·la la validació anterior a cada tecla.
- **Emissió de criteris:** quan `statusChanges` passa a `VALID`, s'emeten els criteris amb l'output `filtresCanviats` (amb `distinctUntilChanged` per no repetir-los). `App` els passa a `RutesService.cercar()`.
- **Missatges:** només es mostren si el camp és `dirty` o `touched`. Mentre valida es mostra "Comprovant si hi ha rutes…". Contenidor amb `aria-live="polite"`.
- **Netejar cerca:** `form.reset()` torna als valors inicials i es mostren totes les rutes.
- **Historial:** les cerques confirmades amb Intro o el botó Cercar es desen amb `HistorialCerquesService`. Clicar un terme el recupera al camp de cerca.

## Formulari de nova ruta (NovaRutaComponent)

Fitxers: `src/app/components/nova-ruta/nova-ruta.component.ts` i `.html`

| Camp | Control | Validadors | 
|---|---|---|
| Nom d'aventura | `nom` | `required`, `minLength(3)` |
| Nom real | `nomReal` | `required` |
| Comarca | `comarca` | Selector amb valors permesos |
| Temàtica | `tematica` | Selector amb valors permesos |
| Dificultat | `dificultat` | Selector amb valors permesos |
| Distància (km) | `distanciaKm` | `required`, `min(0.5)` |
| Descripció | `descripcio` | Cap |

- En enviar, si és invàlid es marquen tots els camps com a tocats per mostrar els errors.
- Si és vàlid, crida `RutesService.crearRuta()` (POST). Mostra un missatge d'èxit (`role="status"`) o d'error (`role="alert"`) i reinicia el formulari.