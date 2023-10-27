import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PersonInterface } from '../../interface';
import { ValidatorsService } from 'src/app/shared/service/validators.service';

@Component({
  templateUrl: './switches-page.component.html',
  styles: [
  ]
})
export class SwitchesPageComponent {

  public myForm : FormGroup = this.fb.group({
    gender: ['M', Validators.required],
    wantNotification: [true, Validators.required],
    termConditions: [false, Validators.requiredTrue]
  });
  public person : PersonInterface = {
    gender: 'F',
    wantNotification: true
  }

  constructor(
    private fb : FormBuilder,
    private validatorsService : ValidatorsService
    ) {}

  public handleOnSubmit() : void {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

    const { termConditions, ...newPerson } = this.myForm.value;

    this.person = newPerson;
  }

  public isValidField(field : string) : boolean | null {
    return this.validatorsService.isValidField(this.myForm, field);
  }

  public getFieldError(field : string) : string | null {
    if (!this.myForm.controls[field]) {
      return null;
    }
    
    switch(field) {
      case 'termConditions':
        return 'Debe de aceptar las condiciones de uso';

      default:
        return 'Hubo un error.';
    }
    
    return null;
  }
}
