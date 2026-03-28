import { AbstractControl, ValidationErrors } from '@angular/forms';

export const noWhitespaceOnly = (control: AbstractControl): ValidationErrors | null =>
  typeof control.value === 'string' && !control.value.trim().length
    ? { whitespace: true }
    : null;
