import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { Subscription } from "rxjs";

import { AuthService } from "../../auth/auth.service";
import { MissionsService } from "../missions.service";

@Component({
  selector: "app-post-create",
  templateUrl: "./mission-create.component.html",
  styleUrls: ["./mission-create.component.css"]
})
export class MissionCreateComponent implements OnInit, OnDestroy {
  isLoading = false;
  form: FormGroup;
  imagePreview: string;
  private authStatusSub: Subscription;

  constructor(
    public missionsService: MissionsService,
    public route: ActivatedRoute,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe(authStatus => {
        this.isLoading = false;
      });

    this.form = new FormGroup({
      title: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)]
      })
    });
  }


  onSavMission() {
    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;

    this.missionsService.addMission(
      this.form.value.title
    );
    this.form.reset();
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }
}
