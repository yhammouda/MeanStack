import { Component, OnInit, OnDestroy, Inject } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA } from "@angular/material";
import { mimeType } from "./mime-type.validator";
import { Transaction } from "../mission.model";
import { MissionsService } from "../missions.service";
import { v4 } from "uuid";

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
   /*declare variables*/

  form: FormGroup;
  isLoading = false;
  imagePreview: string;
  fees: Fees[] = [
    { name: 'Excess transactions', feesvalue: 'Excess transactions!' },
    { name: 'commissions', feesvalue: 'commissions!' },
  ];

  constructor(@Inject(MAT_DIALOG_DATA) public data: { missionId: string, transactionId: null }, public missionsService: MissionsService) { }



   /*fix date formatter*/
  stringToDate(_date, skipSplit = false) {
    var input = null;
    if (skipSplit) {
      input = _date;
    } else {
      input = new Date(_date).toLocaleString().split(',')[0];
    }
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

      amount: new FormControl(null, { validators: [Validators.pattern(/^[.\d]+$/)] }),

      feesControl: new FormControl('', { validators: [Validators.required] }),

      image: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType]
      })

    });

    if (Boolean(this.data.transactionId)) {
         /*dialog is on update mode*/
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
    } else {
      /*dialog is on create mode*/
      this.form.setValue({
        date: this.stringToDate(new Date(Date.now()).toLocaleString().split(',')[0], true),
        label:null,
        amount:null,
        image:null,
        feesControl : null
      });
    }
  }

  onImagePicked(event: Event) {
    /*each time you select a picture execute this block*/
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ image: file });
    this.form.get("image").updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  onSaveTransaction() {
    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;

    const missionId = this.data.missionId;
    const transactionId = this.data.transactionId;

    if (!Boolean(transactionId)) {
      /*dialog is on create mode*/
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
      /*dialog is on update mode*/
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
