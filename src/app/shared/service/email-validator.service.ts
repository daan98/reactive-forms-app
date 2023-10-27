import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { Observable, delay, of } from 'rxjs';

@Injectable({providedIn: 'root'})
export class EmailVlidatorService implements AsyncValidator {
    
    validate(control: AbstractControl) : Observable<ValidationErrors | null> {
        const email = control.value;
        
        const httpCallObservable = new Observable<ValidationErrors | null>((subscriber) => {

            if (email === 'daniel@gmail.com') {
                subscriber.next({ emailTaken: true });
                subscriber.complete();
                return;
            }
            
            subscriber.next(null);
            subscriber.complete();
        }).pipe(
            delay(2000)
        );

        return httpCallObservable;
    }

    /* validate(control: AbstractControl) : Observable<ValidationErrors | null> {
        const email = control.value;

        return of({
            emailTaken: true,
        }).pipe(
            delay(2000),
        )
    }
 */
}

/* validate(control: AbstractControl) : Observable<ValidationErrors | null> {
        const email = control.value;

        return this.http.get<any[]>(`http://localhost:3000/users?q=${email}`)
            .pipe(
                map(resp => {
                    return (resp.length === 0) 
                    ?
                    null
                    :
                    { emailTaken: true }
                })
            )
    }
 */