import { Injectable } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors } from '@angular/forms';

@Injectable({providedIn: 'root'})
export class ValidatorsService {
    public firstNameAndLastnamePattern: string = '([a-zA-Z]+) ([a-zA-Z]+)';

    public emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";


    constructor() { }

    public cantBeStrider = (control : FormControl) : ValidationErrors | null => {
        const value : string = control.value.trim().toLowerCase();

        if (value === 'strider') {
            return {
                isStrider: true
            };
        }

        return null;
    }

    public isValidField(form : FormGroup, field : string) : boolean | null {
        return form.controls[field].errors && form.controls[field].touched;
    }

    public areFieldsEquals(field1 : string, field2 : string) : ValidationErrors | null {
        return (formGroup : FormGroup) : ValidationErrors | null => {
            const firstFieldValue  = formGroup.get(field1)?.value;
            const secondFieldValue = formGroup.get(field2)?.value;

            if (firstFieldValue !== secondFieldValue) {
                formGroup.get(field2)?.setErrors({ notEqual: true });
                return { notEqual: true };
            }

            formGroup.get(field2)?.setErrors(null);
            return null;
        }
    }
}