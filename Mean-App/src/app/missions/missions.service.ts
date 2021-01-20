import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";

import { Mission, Transaction } from "./mission.model";

@Injectable({ providedIn: "root" })
export class MissionsService {
  private missions: Mission[] = [];
  private missionsUpdated = new Subject<{ missions: Mission[]; missionCount: number ;}>();
  public showDialog = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router) { }

  getMissionUpdateListener() {
    return this.missionsUpdated.asObservable();
  }
  getDialogUpdateListener() {
    return this.showDialog.asObservable();
  }
  addMission(title: string) {
    const postData = new FormData();
    postData.append("title", title);
    postData.append("status", 'Pending Approval');

    this.http
      .post<{ message: string; mission: Mission }>(
        "http://localhost:3000/api/missions",
        postData
      )
      .subscribe(responseData => {
        this.router.navigate(["/missions"]);
      });
  }


  addTransaction(id: string, image: File, transaction: Transaction) {
    const postData = new FormData();
    postData.append("id", id);

    if(transaction.transactionType == 'Cash'){
      postData.append("image", image, transaction.id);
    }

    postData.append("transaction", JSON.stringify(transaction));

    return this.http
      .post<{ message: string }>(
        "http://localhost:3000/api/missions/addTransaction",
        postData
      )
  }

  updateTransaction(idmission: string, idtransaction: string, transaction: Transaction) {
    let postData: Transaction | FormData;

    if (typeof transaction.imagePath === "object") {
      postData = new FormData();
      postData.append("image", transaction.imagePath, transaction.id);
      postData.append("transaction", JSON.stringify(transaction));
    } else {
      postData = transaction;
    }
    return this.http
      .put<{ message: string }>("http://localhost:3000/api/missions/" + idmission + "/" + idtransaction, postData);
  }

  getMissions(missionsPerPage: number, currentPage: number) {
    const queryParams = `?pagesize=${missionsPerPage}&page=${currentPage}`;
    this.http
      .get<{ message: string; missions: any; maxMissions: number }>(
        "http://localhost:3000/api/missions" + queryParams
      )
      .pipe(
        map(postData => {
          return {
            missions: postData.missions.map(post => {
              return {
                title: post.title,
                content: post.content,
                id: post._id,
                creator: post.creator,
                status:post.status,
                transactions: post.transactions
              };
            }),
            maxMissions: postData.maxMissions
          };
        })
      )
      .subscribe(transformedPostData => {
        this.missions = transformedPostData.missions;
        this.missionsUpdated.next({
          missions: [...this.missions],
          missionCount: transformedPostData.maxMissions
        });
      });
  }

  getTransaction(idmission: string, idtransaction: string) {
    return this.http.get<Transaction>("http://localhost:3000/api/missions/" + idmission + "/" + idtransaction);
  }
  deleteMission(idmission: string, idtransaction: string) {
    if(!Boolean(idtransaction)){
      return this.http.delete("http://localhost:3000/api/missions/" + idmission);
    }
    else
    {
      return this.http.delete("http://localhost:3000/api/missions/" + idmission + "/" + idtransaction);
    }
  }
}
