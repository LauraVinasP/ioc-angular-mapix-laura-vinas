import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { Observable, catchError, map, of, switchMap, timer } from 'rxjs';
import { RutesService } from '../services/rutes.service';

export const DEBOUNCE_MS = 400;

export function teResultatsValidator(rutesService: RutesService): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
        const text = (control.value ?? '').trim();

        // Si està buit o és massa curt, no consultem l'API
        // (del mínim de caràcters ja se n'encarrega el validador síncron)
        if (text.length < 3) {
            return of(null);
        }

        // Debounce: espera 400 ms abans de consultar l'API
        return timer(DEBOUNCE_MS).pipe(
            switchMap(() => rutesService.teResultats(text)),
            map(hiHa => (hiHa ? null : { senseResultats: true })),
            // Si l'API falla, no bloquegem el formulari
            catchError(() => of(null))
        );
    };
}