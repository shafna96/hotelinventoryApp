import { Component, OnInit } from "@angular/core";
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ConfigService } from "../services/config.service";
import { BookingService } from "./booking.service";
import { mergeMap } from "rxjs";
import { CustomValidator } from "./validators/custom-validator";
import { ActivatedRoute, Route } from "@angular/router";

@Component({
  selector: "hinv-booking",
  templateUrl: "./booking.component.html",
  styleUrls: ["./booking.component.scss"],
})
export class BookingComponent implements OnInit {
  bookingForm!: FormGroup;
  get guests() {
    return this.bookingForm.get("guests") as FormArray;
  }
  constructor(
    private configService: ConfigService,
    private fb: FormBuilder,
    private bookingService: BookingService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    const roomId = this.route.snapshot.paramMap.get("id");
    this.bookingForm = this.fb.group(
      {
        roomId: new FormControl(
          { value: roomId, disabled: true },
          { validators: [Validators.required] }
        ),
        guestEmail: [
          "",
          {
            updateOn: "blur",
            validators: [Validators.required, Validators.email],
          },
        ],
        checkinDate: [""],
        checkoutDate: [""],
        bookingStatus: [""],
        bookingAmount: [""],
        bookingDate: [""],
        mobileNumber: ["", { updateOn: "blur" }],
        guestName: [
          "",
          {
            validators: [
              Validators.required,
              Validators.minLength(5),
              CustomValidator.validateName,
              CustomValidator.validateSpecialChar("*"),
            ],
          },
        ],
        address: this.fb.group({
          addressLine1: [""],
          addressLine2: [""],
          city: [""],
          state: [""],
          country: [""],
          zipCode: [""],
        }),
        guests: this.fb.array([this.addGuestControl()]),
        tnc: new FormControl(false, { validators: [Validators.requiredTrue] }),
      },
      { updateOn: "blur", validators: [CustomValidator.validateDate] }
    );
    this.getBookingData();
    // this.bookingForm.valueChanges.subscribe((data) => {
    //   this.bookingService.bookRoom(data).subscribe((data) => {});
    // });

    // this.bookingForm.valueChanges
    //   .pipe(mergeMap((data) => this.bookingService.bookRoom(data)))
    //   .subscribe((data) => console.log(data));
  }

  addBooking() {
    console.log(this.bookingForm.value);
    this.bookingService
      .bookRoom(this.bookingForm.getRawValue())
      .subscribe((data) => {
        console.log(data);
      });
    // this.bookingForm.reset({
    //   roomId: "2",
    //   guestEmail: "",
    //   checkinDate: "",
    //   checkoutDate: "",
    //   bookingStatus: "",
    //   bookingAmount: "",
    //   bookingDate: "",
    //   mobileNumber: "",
    //   guestName: "",
    //   address: this.fb.group({
    //     addressLine1: "",
    //     addressLine2: "",
    //     city: "",
    //     state: "",
    //     country: "",
    //     zipCode: "",
    //   }),
    //   guests: [],
    //   tnc: false,
    // });
  }

  getBookingData() {
    this.bookingForm.patchValue({
      // roomId: "2",
      guestEmail: "test@email.com",
      checkinDate: new Date("10-feb-2020"),
      checkoutDate: "",
      bookingStatus: "",
      bookingAmount: "",
      bookingDate: "",
      mobileNumber: "",
      guestName: "",
      address: this.fb.group({
        addressLine1: "",
        addressLine2: "",
        city: "",
        state: "",
        country: "",
        zipCode: "",
      }),
      guests: [],
      tnc: false,
    });
  }

  addGuest() {
    this.guests.push(this.addGuestControl());
  }
  addGuestControl(): any {
    return this.fb.group({
      guestName: ["", { validators: [Validators.required] }],
      age: new FormControl(""),
    });
  }

  addPassport() {
    this.bookingForm.addControl("passport", new FormControl(""));
  }

  deletePassport() {
    if (this.bookingForm.get("passport")) {
      this.bookingForm.removeControl("passport");
    }
  }
  removeGuest(i: number) {
    this.guests.removeAt(i);
  }
}
