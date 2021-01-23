import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { LoginComponent } from "./auth/login/login.component";
import { SignupComponent } from "./auth/signup/signup.component";
import { AuthGuard } from "./auth/auth.guard";
import { MissionListComponent } from "./missions/mission-list/mission-list.component";
import { MissionCreateComponent } from "./missions/mission-create/mission-create.component";

const routes: Routes = [
  { path: "", component: LoginComponent },
  { path: "missions", component: MissionListComponent, canActivate: [AuthGuard]  },
  { path: "createmission", component: MissionCreateComponent, canActivate: [AuthGuard]  },
  { path: "signup", component: SignupComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {}
