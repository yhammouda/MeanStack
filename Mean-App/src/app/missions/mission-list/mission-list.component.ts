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
 /*missions = [
  {
    "id": "xyz-dsdsd",
    "title": "This is the title",
    "status": "pending approval",
    "creator": "1",
    "transactions": [
      {
        "id": "guid-guid",
        "date": "2019-01-01",
        "typeOfFees": "Excess transactions",
        "label": "coffee",
        "transactionType": "cash",
        "amount": 20,
        "imagePath": "http://localhost:3000/images/uuuugfdgdf-1610546324774.jpg"
      },
      {
        "id": "another-guid",
        "date": "2019-05-05",
        "typeOfFees": "commissions",
        "label": "coffee",
        "transactionType": "cash",
        "amount": 5,
        "imagePath": "http://localhost:3000/images/uuuugfdgdf-1610546324774.jpg"
      }
    ]
  }
 ];*/
 displayedColumns: string[] = ['label','amount' ,'typeOfFees', 'date', 'transactionType','image','edit'];
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
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.missionsService.getMissions(this.missionPerPage, this.currentPage);

    this.showDialogSub = this.missionsService.getDialogUpdateListener().subscribe(showDialog =>{
      if(!showDialog){
        this.dialog.closeAll();
      }
    });

    this.userId = this.authService.getUserId();
    this.missionsSub = this.missionsService
      .getMissionUpdateListener()
      .subscribe((postData: { missions: Mission[]; missionCount: number }) => {
        this.calculateTotalAmount(postData.missions[0].transactions);
        this.isLoading = false;
        this.totalMissions = postData.missionCount;
        this.missions = postData.missions;
      });
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
        this.userId = this.authService.getUserId();
      });
  }

  calculateTotalAmount(transactions: Transaction[]){
    var totalAmount = 0;
    var i;
    for (i = 0; i < transactions.length; i++) {
      totalAmount += transactions[i].amount;
    }

    console.log(totalAmount);
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
    this.missionsService.deleteMission(missionId,null).subscribe(() => {
    this.missionsService.getMissions(this.missionPerPage, this.currentPage);
    }, () => {
      this.isLoading = false;
    });
  }

  onDeleteTransaction(missionId: string, transactionId: string) {
    this.isLoading = true;
    this.missionsService.deleteMission(missionId,transactionId).subscribe(() => {
    this.missionsService.getMissions(this.missionPerPage, this.currentPage);
    }, () => {
      this.isLoading = false;
    });
  }

  onCreateTransaction(missionId: string){
    this.dialog.open(TransactionCreateComponent, {data: {missionId: missionId }});
  }
  onUpdateTransaction(missionId: string,transactionId:string){
    this.dialog.open(TransactionCreateComponent, {data: {missionId: missionId,transactionId: transactionId}});
  }

  ngOnDestroy() {
    this.missionsSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }
}
