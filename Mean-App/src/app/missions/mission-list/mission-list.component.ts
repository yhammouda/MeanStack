import { Component, OnInit, OnDestroy } from "@angular/core";
import { PageEvent } from "@angular/material";
import { Subscription } from "rxjs";

import { Mission, Transaction } from "../mission.model"
import { AuthService } from "../../auth/auth.service";
import { MatDialog } from "@angular/material";
import { TransactionCreateComponent } from "../transaction-create/transaction-create.component";
import { MissionsService } from "../missions.service";
@Component({
  selector: "app-mission-list",
  templateUrl: "./mission-list.component.html",
  styleUrls: ["./mission-list.component.css"]
})
export class MissionListComponent implements OnInit, OnDestroy {

  /*declare variables*/
  displayedColumns: string[] = ['label', 'amount', 'typeOfFees', 'date', 'transactionType', 'image', 'edit'];
  missions: Mission[] = [];
  isLoading = false;
  totalMissions = 0;
  missionPerPage = 2;
  currentPage = 1;
  pageSizeOptions = [1, 2, 5, 10];
  userIsAuthenticated = false;
  userId: string;
  private missionsSub: Subscription;
  private authStatusSub: Subscription;
  private showDialogSub: Subscription;

  constructor(
    private dialog: MatDialog,
    public missionsService: MissionsService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.isLoading = true;
    this.missionsService.getMissions(this.missionPerPage, this.currentPage);

    this.showDialogSub = this.missionsService.getDialogUpdateListener().subscribe(showDialog => {
      if (!showDialog) {
        this.dialog.closeAll();
      }
    });

    this.userId = this.authService.getUserId();
    this.missionsSub = this.missionsService
      .getMissionUpdateListener()
      .subscribe((postData: { missions: Mission[]; missionCount: number }) => {
        this.isLoading = false;
        this.totalMissions = postData.missionCount;
        this.calculateAmountForMissions(postData.missions);
        this.missions = postData.missions;
        console.log(this.missions)
      });
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
        this.userId = this.authService.getUserId();
      });
  }
  calculateAmountForMissions(missions: Mission[]) {
    var i;
    var totalAmount = 0;
    for (i = 0; i < missions.length; i++) {
      totalAmount = 0;
      if(missions[i].transactions){
        totalAmount = this.calculateTotalAmountPerMission(missions[i].transactions)
        missions[i].totalAmount = totalAmount;
      }
    }
  }

  calculateTotalAmountPerMission(transactions: Transaction[]) {
    var totalAmount = 0;
    var i;
    for (i = 0; i < transactions.length; i++) {
      totalAmount += transactions[i].amount;
    }
    return totalAmount;
  }

  onChangedPage(pageData: PageEvent) {
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.missionPerPage = pageData.pageSize;
    this.missionsService.getMissions(this.missionPerPage, this.currentPage);
  }

  onDeleteMission(missionId: string) {
    this.isLoading = true;
    this.missionsService.deleteMission(missionId, null).subscribe(() => {
      this.missionsService.getMissions(this.missionPerPage, this.currentPage);
    }, () => {
      this.isLoading = false;
    });
  }

  onDeleteTransaction(missionId: string, transactionId: string) {
    this.isLoading = true;
    this.missionsService.deleteMission(missionId, transactionId).subscribe(() => {
      this.missionsService.getMissions(this.missionPerPage, this.currentPage);
    }, () => {
      this.isLoading = false;
    });
  }

  onCreateTransaction(missionId: string) {
    this.dialog.open(TransactionCreateComponent, { data: { missionId: missionId } });
  }
  onUpdateTransaction(missionId: string, transactionId: string) {
    this.dialog.open(TransactionCreateComponent, { data: { missionId: missionId, transactionId: transactionId } });
  }

  ngOnDestroy() {
    this.missionsSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }
}
