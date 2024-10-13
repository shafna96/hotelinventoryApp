import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { NotfoundComponent } from "./notfound/notfound.component";
import { loginGuard } from "./guards/login.guard";

const routes: Routes = [
  {
    path: "",
    redirectTo: "/rooms",
    pathMatch: "full",
  },
  {
    path: "auth",
    loadChildren: () => import("./auth/auth.module").then((m) => m.AuthModule),
  },
  {
    path: "",
    loadChildren: () =>
      import("./dashboard/dashboard.module").then((m) => m.DashboardModule),
    canActivate: [loginGuard], // Apply loginGuard to protect dashboard routes
  },
  {
    path: "**",
    component: NotfoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
