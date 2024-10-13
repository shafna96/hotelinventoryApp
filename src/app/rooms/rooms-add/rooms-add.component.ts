import { Component, OnInit } from "@angular/core";
import { RoomList } from "../rooms";
import { RoomsService } from "../services/rooms.service";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  NgForm,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: "hinv-rooms-add",
  templateUrl: "./rooms-add.component.html",
  styleUrls: ["./rooms-add.component.scss"],
})
export class RoomsAddComponent implements OnInit {
  addRoomForm!: FormGroup;

  // room: RoomList = {
  //   roomType: "",
  //   amenities: "",
  //   checkinTime: new Date(),
  //   checkoutTime: new Date(),
  //   photos: "",
  //   price: 0,
  //   rating: 0,
  // };

  successMessage: string = "";
  constructor(
    private roomService: RoomsService,
    private fb: FormBuilder,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.addRoomForm = this.fb.group({
      roomType: new FormControl("", { validators: [Validators.required] }),
      amenities: new FormControl("", { validators: [Validators.required] }),
      checkinTime: new FormControl(new Date(), {
        validators: [Validators.required],
      }),
      checkoutTime: new FormControl(new Date(), {
        validators: [Validators.required],
      }),
      photos: new FormControl("", { validators: [Validators.required] }),
      price: new FormControl(0, { validators: [Validators.required] }),
      rating: new FormControl(0, { validators: [Validators.required] }),
    });
  }

  // AddRoom(roomsForm: NgForm) {
  //   this.roomService.addRoom(this.room).subscribe((data) => {
  //     this.successMessage = "Room Added Successfully";
  //     roomsForm.reset({
  //       roomType: "",
  //       amenities: "",
  //       checkinTime: new Date(),
  //       checkoutTime: new Date(),
  //       photos: "",
  //       price: 0,
  //       rating: 0,
  //     });
  //   });
  // }
  addRoom() {
    if (this.addRoomForm.valid) {
      const roomData: RoomList = this.addRoomForm.value;
      this.roomService.addRoom(roomData).subscribe(
        (data) => {
          this.successMessage = "Room Added Successfully";
          this.addRoomForm.reset({
            roomType: "",
            amenities: "",
            checkinTime: new Date(),
            checkoutTime: new Date(),
            photos: "",
            price: 0,
            rating: 0,
          });
        },
        (error) => {
          console.error("Error adding room:", error);
          // Handle error here (optional)
        }
      );
      Swal.fire({
        position: "bottom-end",
        icon: "success",
        title: "Room Added Successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      this.route.navigateByUrl("/rooms");
    } else {
      console.log("Form is invalid");
    }
  }
}
