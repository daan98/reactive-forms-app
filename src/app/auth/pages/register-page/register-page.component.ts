import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailVlidatorService } from 'src/app/shared/service/email-validator.service';
import { ValidatorsService } from 'src/app/shared/service/validators.service';

@Component({
  templateUrl: './register-page.component.html',
  styles: [
  ]
})
export class RegisterPageComponent {
  
  public myForm : FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.pattern(this.validatorService.firstNameAndLastnamePattern)]],
    email: ['', [Validators.required, Validators.pattern(this.validatorService.emailPattern)], [this.emailValidatorService]],
    username: ['', [Validators.required, this.validatorService.cantBeStrider]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    password2: ['', [Validators.required]],
  }, {
    validators: [this.validatorService.areFieldsEquals('password', 'password2')]
  });

  constructor(
    private fb : FormBuilder,
    private validatorService : ValidatorsService,
    private emailValidatorService : EmailVlidatorService
    ) {}

  public handleOnSubmit() : void {
    if (this.myForm.invalid) {
      return this.myForm.markAllAsTouched();
    }
  }

  public isValidField(field : string) : boolean | null {
    return this.validatorService.isValidField(this.myForm, field);
  }

  public getFieldError(field : string) : string | null {
    if (!this.myForm.controls[field]) {
      return null;
    }

    const errors = this.myForm.controls[field].errors || {};

    for (const key of Object.keys(errors)) {
      switch(key) {
        case 'required':
          return 'Este campo es requerido';
        
        case 'emailTaken':
          return `Este email ya se encuentra en uso`;

        default:
          return 'Hubo un error.';
      }
    }
    return null;
  }
}
