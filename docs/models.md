# Models i adaptador

## Fitxers

- `src/app/models/ruta-api.model.ts`: interfície `RutaApi`, estructura exacta que retorna l'API.
- `src/app/models/ruta.model.ts`: interfície `Ruta`, model intern que fa servir l'aplicació.
- `src/app/adapters/ruta.adapter.ts`: funcions `adaptarRuta()` i `adaptarRutes()`.

## Mapatge API -> model intern

| Camp API (`RutaApi`) | Tipus API | Camp intern (`Ruta`) | Tipus intern | Transformació |
|---|---|---|---|---|
| `id` | `string` | `id` | `string` | `String()` |
| `nom` | `string` | `nom` | `string` | `trim()`, per defecte "Ruta sense nom" |
| `nomReal` | `string` | `nomReal` | `string` | `trim()` |
| `comarca` | `string` | `comarca` | `Comarca` | normalització (sense majúscules ni accents) |
| `tematica` | `string` | `tematica` | `Tematica` | (normalització sense majúscules ni accents) |
| `dificultat` | `string` | `dificultat` | `Dificultat` | (normalització sense majúscules ni accents) |
| `dataPublicacio` | `string` | `dataPublicacio` | `string` | format AAAA-MM-DD |
| `distanciaKm` | `number \| string` | `distanciaKm` | `number` | conversió acceptant coma com a decimal |
| `descripcio` | `string` (opcional) | `descripcio` | `string` | `trim()`, si és buida: "Sense descripció" |
| `destacada` | `boolean` (opcional) | `destacada` | `boolean` | per defecte `false` |

## Normalitzacions aplicades

1. Neteja d'espais amb `trim()`.
2. Conversió numèrica segura de `distanciaKm`.
3. Valors per defecte per als camps opcionals.
4. Normalització de comarca, temàtica i dificultat als valors permesos.
5. Dates en un format coherent (AAAA-MM-DD).
6. Substitució de textos buits. 