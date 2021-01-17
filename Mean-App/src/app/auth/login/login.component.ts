import { Component, OnInit, OnDestroy } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Subscription } from "rxjs";

import { AuthService } from "../auth.service";

@Component({
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit, OnDestroy {

  /*declare variables*/
  isLoading = false;
  hide = true;
  private authStatusSub: Subscription;

  constructor(public authService: AuthService) {}

  ngOnInit() {
    /* A callback method that is invoked immediately after the default change detector has checked the directive's data-bound properties*/
    /*alwawsy listen to subject if was logout*/
    this.authStatusSub = this.authService.getAuthStatusListener().subscribe(
      authStatus => {
        this.isLoading = false;
      }
    );
  }

  onLogin(form: NgForm) {

    /*when use click the login button */
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    this.authService.login(form.value.email, form.value.password);
  }

  ngOnDestroy() {
    /*A callback method that performs custom clean-up, invoked immediately before a directive, pipe, or service*/
    this.authStatusSub.unsubscribe();
  }
}
