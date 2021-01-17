import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from "@angular/forms";
import { Subscription } from "rxjs";

import { AuthService } from "../auth.service";
import { PasswordStrengthValidator } from "./password-strength.validators";

@Component({
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"]
})
export class SignupComponent implements OnInit, OnDestroy {
  isLoading = false;
  form: FormGroup;
  private authStatusSub: Subscription;

  constructor(public authService: AuthService,public fb: FormBuilder) {}

  ngOnInit() {
    this.authStatusSub = this.authService.getAuthStatusListener().subscribe(
      authStatus => {
        this.isLoading = false;
      }
    );

    /*set rules for each field => ex required mean that field is mandatory else a message appear on the UI*/
      /*you can use regex pattern or custom validation as (PasswordStrengthValidator class) */
    this.form = this.fb.group({
      password: ['', [Validators.required, PasswordStrengthValidator]],
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      email: ['', [Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"),Validators.required]]
    });
  }

  onSignup() {
    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;
    this.authService.createUser(this.form.value.email, this.form.value.password,this.form.value.firstname,this.form.value.lastname);
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }
}
