import { Component, OnInit, OnDestroy, Inject } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA } from "@angular/material";
import { mimeType } from "./mime-type.validator";
import { ErrorStateMatcher } from '@angular/material/core';
import { Transaction } from "../mission.model";
import { MissionsService } from "../missions.service";
import { v4 } from "uuid";
import { NumberValidators } from "./NumberValidators";
import { transition } from "@angular/animations";

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

export class TransactionCreateComponent implements OnInit, OnDestroy {

  form: FormGroup;
  isLoading = false;
  imagePreview: string;
  fees: Fees[] = [
    { name: 'Excess transactions', feesvalue: 'Excess transactions!' },
    { name: 'commissions', feesvalue: 'commissions!' },
  ];

  constructor(@Inject(MAT_DIALOG_DATA) public data: { missionId: string, transactionId: null }, public missionsService: MissionsService) { }


  stringToDate(_date) {
    var input = new Date(_date).toLocaleString().split(',')[0];
    var yourdate = input.split("/").reverse();
    var tmp = this.fixDate(yourdate[2]);
    yourdate[2] = this.fixDate(yourdate[1]);
    yourdate[1] = tmp;
    return yourdate.join("-");
  }

  fixDate(x: string) {
    if (x.length < 2)
      return "0" + x;
    else
      return x;
  }

  ngOnInit() {
    this.form = new FormGroup({

      label: new FormControl(null, { validators: [Validators.required, Validators.minLength(3)] }),

      date: new FormControl(null, { validators: [Validators.required] }),

      amount: new FormControl(null, { validators: [Validators.pattern(/^[.\d]+$/), Validators.required] }),

      feesControl: new FormControl('', { validators: [Validators.required] }),

      image: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType]
      })

    });

    if (Boolean(this.data.transactionId)) {
      this.isLoading = true;
      this.missionsService.getTransaction(this.data.missionId, this.data.transactionId).subscribe(postData => {
        this.isLoading = false;
        let date = this.stringToDate(postData.date);
        this.form.setValue({
          date: date,
          feesControl: this.fees[this.fees.findIndex(x => x.feesvalue === postData.typeOfFees)],
          label: postData.label,
          amount: postData.amount,
          image: postData.imagePath,
          //transactionType: postData.transactionType
        });
      });
    }
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

    const missionId = this.data.missionId;
    const transactionId = this.data.transactionId;

    if (!Boolean(transactionId)) {
      const myguid = v4();

      const transaction: Transaction = {
        id: myguid,
        date: this.form.value.date,
        typeOfFees: this.form.value.feesControl.feesvalue,
        label: this.form.value.label,
        amount: this.form.value.amount,
        imagePath: '',
        transactionType: 'Cash',
      };

      this.missionsService.addTransaction(
        missionId,
        this.form.value.image,
        transaction
      ).subscribe(responseData => {
        this.isLoading = false;
        this.missionsService.showDialog.next(false);
        this.missionsService.getMissions(2, 0);

      });
    } else {
      const transaction: Transaction = {
        id: transactionId,
        date: this.form.value.date,
        typeOfFees: this.form.value.feesControl.feesvalue,
        label: this.form.value.label,
        amount: this.form.value.amount,
        imagePath: this.form.value.image,
        transactionType: 'Cash',
      };
      this.missionsService.updateTransaction(
        missionId, transactionId, transaction
      ).subscribe(responseData => {
        this.isLoading = false;
        this.missionsService.showDialog.next(false);
        this.missionsService.getMissions(2, 0);
      });
    }
    this.form.reset();
  }

  ngOnDestroy() {
    //this.authStatusSub.unsubscribe();
  }
}
