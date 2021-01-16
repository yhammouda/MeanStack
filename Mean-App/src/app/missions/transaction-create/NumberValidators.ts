import { AbstractControl, ValidatorFn } from '@angular/forms';

export class NumberValidators {

  static isNumberCheck(): ValidatorFn {
    return  (c: AbstractControl): {[key: string]: boolean} | null => {
      let number = /^[.\d]+$/.test(c.value) ? +c.value : NaN;
      if (number !== number) {
        return { 'value': true };
      }

      return null;
    };
  }
}
