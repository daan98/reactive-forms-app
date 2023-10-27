import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ValidatorsService } from 'src/app/shared/service/validators.service';

const initialProduct = {
  name: 'Iphone',
  price: 2000,
  inStorage: 5,
};
@Component({
  templateUrl: './basic-page.component.html',
  styles: [
  ]
})
export class BasicPageComponent implements OnInit {

  public myForm : FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    price: [0, [Validators.required, Validators.min(0)]],
    inStorage: [0, [Validators.required, Validators.min(0)]]
  });

  constructor(
    private fb : FormBuilder,
    private validatorsService : ValidatorsService
    ) {}

  ngOnInit(): void {
    this.myForm.setValue(initialProduct);
  }

  public isValidField(field : string) : boolean | null {
    return this.validatorsService.isValidField(this.myForm, field);
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
        
        case 'minlength':
          return `Mínimo ${errors['minlength'].requiredLength} carácteres`
        default:
          return null;
      }
    }
    return null;
  }

  public handleOnSubmit() : void {
    console.log('price errors: ', this.myForm.controls['price'].errors);
    console.log('name errors: ', this.myForm.controls['name'].errors);
    console.log('inStorage errors: ', this.myForm.controls['inStorage'].errors);
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return
    }

    this.myForm.reset({price: 0, inStorage: 0});
  }
}
