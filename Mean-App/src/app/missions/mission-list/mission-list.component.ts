import { Component, OnInit, OnDestroy } from "@angular/core";
import { PageEvent } from "@angular/material";
import { Subscription } from "rxjs";

import { Mission } from "../mission.model"
import { PostsService } from "../missions.service";
import { AuthService } from "../../auth/auth.service";
import { MatDialog } from "@angular/material";
import { MissionCreateComponent } from "../mission-create/mission-create.component";

@Component({
  selector: "app-mission-list",
  templateUrl: "./mission-list.component.html",
  styleUrls: ["./mission-list.component.css"]
})
export class MissionListComponent implements OnInit, OnDestroy {
 missions = [
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
 ];
 displayedColumns: string[] = ['id', 'date', 'typeOfFees', 'label','image','edit'];
  //posts: Mission[] = [];
  isLoading = false;
  totalPosts = 0;
  postsPerPage = 2;
  currentPage = 1;
  pageSizeOptions = [1, 2, 5, 10];
  userIsAuthenticated = false;
  userId: string;
  private postsSub: Subscription;
  private authStatusSub: Subscription;

  constructor(
    private dialog: MatDialog,
    public postsService: PostsService,
    private authService: AuthService
  ) {}

  ngOnInit() {
  /*
    this.isLoading = true;
    this.postsService.getPosts(this.postsPerPage, this.currentPage);
    this.userId = this.authService.getUserId();
    this.postsSub = this.postsService
      .getPostUpdateListener()
      .subscribe((postData: { posts: Mission[]; postCount: number }) => {
        this.isLoading = false;
        this.totalPosts = postData.postCount;
        this.posts = postData.posts;
      });
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
        this.userId = this.authService.getUserId();
      });
      */
  }

  onChangedPage(pageData: PageEvent) {
    /*
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.postsPerPage = pageData.pageSize;
    this.postsService.getPosts(this.postsPerPage, this.currentPage);
    */
  }

  onDelete(postId: string) {
    console.log(postId)
    /*
    this.isLoading = true;
    this.postsService.deletePost(postId).subscribe(() => {
      this.postsService.getPosts(this.postsPerPage, this.currentPage);
    }, () => {
      this.isLoading = false;
    });
    */
  }
  onCreateMission(){
    this.dialog.open(MissionCreateComponent, {data: {message: "Mission under Creation"}});
  }
  ngOnDestroy() {
    /*
    this.postsSub.unsubscribe();
    this.authStatusSub.unsubscribe();
    */
  }
}
