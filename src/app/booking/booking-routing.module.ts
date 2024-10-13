import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BookingComponent } from "./booking.component";
import { RoomsBookingComponent } from "../rooms/rooms-booking/rooms-booking.component";
import { BookingGuard } from "./guards/booking.guard";

const routes: Routes = [
  {
    path: "",
    component: BookingComponent,
    children: [{ path: ":id", component: RoomsBookingComponent }],
    canDeactivate: [BookingGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookingRoutingModule {}
