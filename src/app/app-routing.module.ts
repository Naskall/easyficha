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
    path: "client-register/:id",
    loadChildren:
      "./pages/client/client-register/client-register.module#ClientRegisterPageModule",
    canActivate: [AuthGuard]
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
    path: "record-register/:id",
    loadChildren:
      "./pages/record/record-register/record-register.module#RecordRegisterPageModule",
    canActivate: [AuthGuard]
  },
  {
    path: "clients-list",
    loadChildren:
      "./pages/client/clients-list/clients-list.module#ClientsListPageModule",
    canActivate: [AuthGuard]
  },
  {
    path: "record-list",
    loadChildren:
      "./pages/record/record-list/record-list.module#RecordListPageModule",
    canActivate: [AuthGuard]
  },
  {
    path: "record-details",
    loadChildren:
      "./pages/record/record-details/record-details.module#RecordDetailsPageModule",
    canActivate: [AuthGuard]
  },
  {
    path: "record-details/:id",
    loadChildren:
      "./pages/record/record-details/record-details.module#RecordDetailsPageModule",
    canActivate: [AuthGuard]
  },
  { path: 'history', loadChildren: './pages/history/history/history.module#HistoryPageModule' },
  { path: 'monitoring', loadChildren: './pages/monitoring/monitoring/monitoring.module#MonitoringPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
