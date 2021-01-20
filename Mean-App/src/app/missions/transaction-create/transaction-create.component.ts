import { Component, OnInit, OnDestroy, Inject } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { MatSlideToggleChange, MAT_DIALOG_DATA } from "@angular/material";
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
  useCredit: boolean = false;
  displaySlideToggle: boolean = true;

  form: FormGroup;
  isLoading = false;
  imagePreview: string;
  fees: Fees[] = [
    { name: 'Excess transactions', feesvalue: 'Excess transactions!' },
    { name: 'commissions', feesvalue: 'commissions!' },
  ];

  constructor(@Inject(MAT_DIALOG_DATA) public data: { missionId: string, transactionId: null, transactionType: null }, public missionsService: MissionsService) { }



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

    this.manageForm();

    if (Boolean(this.data.transactionId)) {/*Update */

      /*dialog is on update mode*/
      this.displaySlideToggle = false;
      this.isLoading = true;
      this.missionsService.getTransaction(this.data.missionId, this.data.transactionId).subscribe(postData => {
        this.isLoading = false;
        let date = this.stringToDate(postData.date);

        if (postData.transactionType == 'Cash') {
          this.useCredit = false;
        } else {
          this.useCredit = true;
        }
        this.form.setValue({
          date: date,
          feesControl: postData.typeOfFees ? this.fees[this.fees.findIndex(x => x.feesvalue === postData.typeOfFees)] : null,
          label: postData.label,
          amount: postData.amount,
          image: postData.imagePath,
          description: postData.description,
          transactionType: postData.transactionType
        });
      });
    } else {
      /*dialog is on create mode*/
      this.form.setValue({
        date: this.stringToDate(new Date(Date.now()).toLocaleString().split(',')[0], true),
        label: null,
        amount: null,
        image: null,
        feesControl: null,
        description: null,
        transactionType: null,
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

    if (!Boolean(transactionId)) {  /*Crete mode */
      /*dialog is on create mode*/
      const myguid = v4();

      const transaction: Transaction = {
        id: myguid,
        date: this.form.value.date,
        typeOfFees: this.form.value.feesControl ? this.form.value.feesControl.feesvalue : null,
        label: this.form.value.label,
        amount: this.form.value.amount,
        imagePath: '',
        transactionType: this.useCredit ? 'Credit' : 'Cash',
        description: this.form.value.description
      };

      this.missionsService.addTransaction(
        missionId,
        this.form.value.image ? this.form.value.image : null,
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
        typeOfFees: this.form.value.feesControl ? this.form.value.feesControl.feesvalue : null,
        label: this.form.value.label,
        amount: this.form.value.amount,
        imagePath: this.form.value.image,
        transactionType: this.form.value.transactionType,
        description: this.form.value.description
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

  ngOnDestroy() {}

  manageForm() {

    if ((!this.useCredit && this.data.transactionId == null) || (this.data.transactionType == 'Cash' && this.data.transactionId != null)) {
      this.form = new FormGroup({

        label: new FormControl(null, { validators: [Validators.required, Validators.minLength(3)] }),

        date: new FormControl(null, { validators: [Validators.required] }),

        amount: new FormControl(null, { validators: [Validators.pattern(/^[.\d]+$/)] }),

        feesControl: new FormControl('', { validators: [Validators.required] }),

        description: new FormControl('', { validators: [] }),

        transactionType: new FormControl('', { validators: [] }),

        image: new FormControl(null, {
          validators: [Validators.required],
          asyncValidators: [mimeType]
        })
      });
    } else {

      this.form = new FormGroup({

        label: new FormControl(null, { validators: [] }),

        feesControl: new FormControl('', { validators: [] }),

        image: new FormControl(null, { validators: [] }),

        date: new FormControl(null, { validators: [Validators.required] }),

        amount: new FormControl(null, { validators: [Validators.pattern(/^[.\d]+$/)] }),

        description: new FormControl('', { validators: [Validators.required] }),

        transactionType: new FormControl('', { validators: [] }),
      });
    }
  }


  toggle(event: MatSlideToggleChange) {

    this.useCredit = event.checked;

    this.manageForm();

    if (Boolean(this.data.transactionId)) {
    } else {
      /*dialog is on create mode*/
      this.form.setValue({
        date: this.stringToDate(new Date(Date.now()).toLocaleString().split(',')[0], true),
        label: null,
        amount: null,
        image: null,
        feesControl: null,
        description: null,
        transactionType: null,
      });
    }
  }
}
