import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { EmployeeComponent } from "./employee/employee.component";
import { NotfoundComponent } from "./notfound/notfound.component";
import { loginGuard } from "./guards/login.guard";
import { RegisterComponent } from "./register/register.component";

const routes: Routes = [
  { path: "employee", component: EmployeeComponent, canActivate: [loginGuard] },
  // {
  //   path: "",
  //   component: DashboardComponent,
  //   canActivate: [loginGuard],
  // },
  { path: "register", component: RegisterComponent },
  // { path: "login", component: LoginComponent },
  {
    path: "rooms",
    loadChildren: () =>
      import("./rooms/rooms.module").then((m) => m.RoomsModule),
    canActivate: [loginGuard],
  },
  { path: "", redirectTo: "/rooms", pathMatch: "full" },
  {
    path: "booking/:id",
    loadChildren: () =>
      import("./booking/booking.module").then((m) => m.BookingModule),
    // canActivate: [loginGuard],
  },
  {
    path: "auth",
    loadChildren: () => import("./auth/auth.module").then((m) => m.AuthModule),
  },
  { path: "**", component: NotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
