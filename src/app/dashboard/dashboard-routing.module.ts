import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { loginGuard } from "../guards/login.guard";
import { EmployeeComponent } from "../employee/employee.component";

const routes: Routes = [
  { path: "employee", component: EmployeeComponent, canActivate: [loginGuard] },
  {
    path: "rooms",
    loadChildren: () =>
      import("../rooms/rooms.module").then((m) => m.RoomsModule),
    canActivate: [loginGuard],
  },
  {
    path: "booking/:id",
    loadChildren: () =>
      import("../booking/booking.module").then((m) => m.BookingModule),
    canActivate: [loginGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
