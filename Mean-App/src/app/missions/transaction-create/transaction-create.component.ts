import { Component, OnInit, OnDestroy,Inject } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA } from "@angular/material";
import { mimeType } from "./mime-type.validator";
import {ErrorStateMatcher} from '@angular/material/core';
import { Transaction } from "../mission.model";
import { MissionsService } from "../missions.service";
import { v4 } from "uuid";

// import { Subscription } from "rxjs";

// import { ErrorService } from "./error.service";
interface Fees {
  name: string;
  feesvalue: string;
}

@Component({
  templateUrl: "./transaction-create.component.html",
  selector: "mission-create",
  styleUrls: ["./transaction-create.component.css"]
})

export class TransactionCreateComponent implements OnInit, OnDestroy{

  form: FormGroup;
  isLoading = false;
  imagePreview: string;
  private mode = "create";
  private postId: string;

  fees: Fees[] = [
    {name: 'Excess transactions', feesvalue: 'Excess transactions!'},
    {name: 'commissions', feesvalue: 'commissions!'},
  ];

  constructor(@Inject(MAT_DIALOG_DATA) public data: { missionId: string },public missionsService: MissionsService) {}

  ngOnInit() {
    this.form = new FormGroup({

      label: new FormControl(null, {validators: [Validators.required, Validators.minLength(3)]}),

      date: new FormControl(null, { validators: [Validators.required] }),
      amount: new FormControl(null, { validators: [Validators.pattern("^[0-9]*$"),Validators.required ]}),

      feesControl :new FormControl('', { validators: [Validators.required] }),

      image: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType]
      })
    });
    this.mode = "create";
    this.postId = null;
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ image: file });
    this.form.get("image").updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  onSavePost() {
    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;
    if (this.mode === "create")
    {
      const myguid = v4();
      const missionId = this.data.missionId;

      const transaction : Transaction = {
        id : myguid,
        date: this.form.value.date,
        typeOfFees: this.form.value.feesControl.feesvalue,
        label: this.form.value.label,
        amount: parseInt(this.form.value.amount),
        imagePath: '',
        transactionType: 'Cash',
      };

      this.missionsService.addTransaction(
        missionId,
        this.form.value.image,
        transaction
      ).subscribe(responseData => {
        this.isLoading = false;
        if (responseData.message === 'Update successful!') {
          this.missionsService.showDialog.next(false);
          this.missionsService.getMissions(2, 0);
        }
      });
    } else {
      /*
      this.postsService.updatePost(
        this.postId,
        this.form.value.title,
        this.form.value.content,
        this.form.value.image
      );
      */
    }
    this.form.reset();
  }

  ngOnDestroy() {
    //this.authStatusSub.unsubscribe();
  }
}
