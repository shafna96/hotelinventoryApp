import { CanDeactivateFn } from "@angular/router";
import { BookingComponent } from "../booking.component";
import { Injectable } from "@angular/core";

export const BookingGuard: CanDeactivateFn<BookingComponent> = (
  component: BookingComponent,
  currentRoute,
  currentState,
  nextState
) => {
  // Check if BookingComponent has a canDeactivate method and call it
  return component.bookingForm.pristine;
};
