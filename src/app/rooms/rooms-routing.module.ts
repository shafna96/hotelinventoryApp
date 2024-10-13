import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RoomsComponent } from "./rooms.component";
import { RoomsAddComponent } from "./rooms-add/rooms-add.component";
import { roomGuard } from "./guards/room.guard";

const routes: Routes = [
  {
    path: "",
    component: RoomsComponent,
    // canActivateChild: [roomGuard],
    children: [
      { path: "add", component: RoomsAddComponent },
      { path: "edit/:id", component: RoomsAddComponent },
      // { path: ":id", component: RoomsBookingComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RoomsRoutingModule {}
