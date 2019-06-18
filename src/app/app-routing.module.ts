import { AuthGuard } from "./guards/auth.guard";
import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { LoginGuard } from "./guards/login.guard";

const routes: Routes = [
  { path: "", redirectTo: "login", pathMatch: "full" },
  {
    path: "home",
    loadChildren: "./pages/home/home.module#HomePageModule",
    canActivate: [AuthGuard]
  },
  {
    path: "login",
    loadChildren: "./pages/login/login.module#LoginPageModule",
    canActivate: [LoginGuard]
  },
  {
    path: "client-register",
    loadChildren:
      "./pages/client/client-register/client-register.module#ClientRegisterPageModule",
    canActivate: [AuthGuard]
  },
  {
    path: "client-details/:id",
    loadChildren:
      "./pages/client/client-details/client-details.module#ClientDetailsPageModule",
    canActivate: [AuthGuard]
  },
  {
    path: "record-register",
    loadChildren:
      "./pages/record/record-register/record-register.module#RecordRegisterPageModule"
  },
  {
    path: "clients-list",
    loadChildren:
      "./pages/client/clients-list/clients-list.module#ClientsListPageModule"
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
