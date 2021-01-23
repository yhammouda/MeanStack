import { AbstractControl, ValidationErrors } from "@angular/forms"


/*regex validator for password*/
export const PasswordStrengthValidator = function (control: AbstractControl): ValidationErrors | null {
  let value: string = control.value || '';

  if (!value) {
    return null;
  }

  let upperCaseCharacters = /[A-Z]+/g
  if (upperCaseCharacters.test(value) === false) {
    return { passwordStrength: `password has to contine Upper case characters` };
  }

  let lowerCaseCharacters = /[a-z]+/g
  if (lowerCaseCharacters.test(value) === false) {
    return { passwordStrength: `password has to contine lower case characters` };
  }


  let numberCharacters = /[0-9]+/g
  if (numberCharacters.test(value) === false) {
    return { passwordStrength: `password has to contine number characters` };
  }

  let specialCharacters = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/
  if (specialCharacters.test(value) === false) {
    return { passwordStrength: `password has to contine special character` };
  }
  return null;
}
