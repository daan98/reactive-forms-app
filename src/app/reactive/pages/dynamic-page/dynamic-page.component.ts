import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './dynamic-page.component.html',
  styles: [
  ]
})
export class DynamicPageComponent {

  public newFavorite : FormControl<string | null> = this.fb.control('', [Validators.required]);
  public myForm      : FormGroup   = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    favoriteGames: this.fb.array([
      ['Metal Gear', Validators.required],
      ['Mario Kart 8', Validators.required],
      ['Mortal Kombat 1', Validators.required]
    ])
  });

  constructor(private fb : FormBuilder) {  }
  
  public get favoriteGamesGetter() {
    return this.myForm.get('favoriteGames') as FormArray;
  }
  
  public isNewFavoriteEmpty() {
    return this.newFavorite.errors;
  }

  public isValidField(field : string) : boolean | null {
    return this.myForm.controls[field].errors && this.myForm.controls[field].touched;
  }

  public isVlidFieldArray(field : FormArray, i : number) : boolean | null {
    if (!field.controls[i]) {
      return null;
    }

    return field.controls[i].errors && field.controls[i].touched;
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
          return 'Hubo un error.';
      }
    }
    return null;
  }

  public getFieldArrayError(field : FormArray, i : number) : string | null {
    if (!field.controls[i]) {
      return null;
    }

    const errors = field.controls[i].errors || {};

    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Este campo es requerido';
      
        default:
          return 'Hubo un error.';
      }
    }

    return null;
  }

  public handleOnDeleteFavorite(i : number) : void {
    this.favoriteGamesGetter.removeAt(i);
  }

  public handleOnSubmit() : void {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

    (this.myForm.controls['favoriteGames'] as FormArray) = this.fb.array([]);
    this.myForm.reset();
  }

  public addFavoriteGame() : void {
    if (this.newFavorite.invalid) {
      return;
    }

    const newFavorite = this.newFavorite.value;

    this.favoriteGamesGetter.push(
      this.fb.control(newFavorite, [Validators.required])
    );
    
    this.newFavorite.reset();
  }
}
