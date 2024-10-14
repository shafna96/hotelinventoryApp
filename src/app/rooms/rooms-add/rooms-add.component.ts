import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from "@angular/core";
import { RoomList } from "../rooms";
import { RoomsService } from "../services/rooms.service";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import Swal from "sweetalert2";
import { BsModalRef } from "ngx-bootstrap/modal";

@Component({
  selector: "hinv-rooms-add",
  templateUrl: "./rooms-add.component.html",
  styleUrls: ["./rooms-add.component.scss"],
})
export class RoomsAddComponent implements OnInit {
  addRoomForm!: FormGroup;
  @Output() formSubmitted = new EventEmitter<void>();
  successMessage: string = "";
  @Input() isEditMode: boolean = false;
  @Input() roomId: number | null = null;
  // @Input() roomData: RoomList | null = null;

  constructor(
    private roomService: RoomsService,
    private fb: FormBuilder,
    private route: Router,
    private activatedRoute: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    public bsModalRef: BsModalRef
  ) {}

  // ngOnInit(): void {
  //   // Retrieve the modal properties passed via initialState
  //   // if (this.bsModalRef.content) {
  //   //   this.isEditMode = this.bsModalRef.content.isEditMode;
  //   //   this.roomId = this.bsModalRef.content.roomId;
  //   // }

  //   console.log("Edit Mode:", this.isEditMode, "Room ID:", this.roomId);

  //   this.addRoomForm = this.fb.group({
  //     roomType: new FormControl("", [Validators.required]),
  //     amenities: new FormControl("", [Validators.required]),
  //     checkinTime: new FormControl(new Date(), [Validators.required]),
  //     checkoutTime: new FormControl(new Date(), [Validators.required]),
  //     photos: new FormControl("", [Validators.required]),
  //     price: new FormControl(0, [Validators.required]),
  //     rating: new FormControl(0, [Validators.required]),
  //   });

  //   if (this.roomId && this.isEditMode) {
  //     this.loadRoomData(this.roomId);
  //     this.cdr.detectChanges();
  //   }
  // }

  ngOnInit(): void {
    console.log("Edit Mode:", this.isEditMode, "Room ID:", this.roomId);

    this.addRoomForm = this.fb.group({
      roomType: new FormControl("", [Validators.required]),
      amenities: new FormControl("", [Validators.required]),
      checkinTime: new FormControl(new Date(), [Validators.required]),
      checkoutTime: new FormControl(new Date(), [Validators.required]),
      photos: new FormControl("", [Validators.required]),
      price: new FormControl(0, [Validators.required]),
      rating: new FormControl(0, [Validators.required]),
    });

    if (this.roomId && this.isEditMode) {
      this.loadRoomData(this.roomId);
      this.cdr.detectChanges();
    }
  }

  loadRoomData(id: number) {
    this.roomService.getRoomById(id).subscribe({
      next: (roomData: RoomList) => {
        const checkinTime = this.formatDateForInput(roomData.checkinTime);
        const checkoutTime = this.formatDateForInput(roomData.checkoutTime);

        this.addRoomForm.patchValue({
          roomType: roomData.roomType,
          amenities: roomData.amenities,
          checkinTime: checkinTime,
          checkoutTime: checkoutTime,
          photos: roomData.photos,
          price: roomData.price,
          rating: roomData.rating,
        });

        this.addRoomForm.markAllAsTouched();
        this.addRoomForm.updateValueAndValidity();
      },
      error: (err) => {
        console.error("Error loading room data:", err);
        Swal.fire("Error", "Unable to load room data", "error");
      },
    });
  }

  // Utility function to format date for datetime-local input
  private formatDateForInput(dateString: Date): string {
    const date = new Date(dateString);
    return date.toISOString().slice(0, 16); // Converts to 'YYYY-MM-DDTHH:mm'
  }
  // addRoom() {
  //   if (this.addRoomForm.valid) {
  //     const roomData: RoomList = this.addRoomForm.value;
  //     if (this.isEditMode && this.roomId) {
  //       this.roomService.updateRoom(this.roomId, roomData).subscribe(
  //         (data) => {
  //           Swal.fire({
  //             position: "bottom-end",
  //             icon: "success",
  //             title: "Room Updated Successfully",
  //             showConfirmButton: false,
  //             timer: 1500,
  //           });
  //           this.route.navigateByUrl("/rooms");
  //         },
  //         (error) => {
  //           console.error("Error updating room:", error);
  //         }
  //       );
  //     } else {
  //       this.roomService.addRoom(roomData).subscribe(
  //         (data) => {
  //           Swal.fire({
  //             position: "bottom-end",
  //             icon: "success",
  //             title: "Room Added Successfully",
  //             showConfirmButton: false,
  //             timer: 1500,
  //           });
  //           this.route.navigateByUrl("/rooms");
  //         },
  //         (error) => {
  //           console.error("Error adding room:", error);
  //         }
  //       );
  //     }
  //   } else {
  //     console.log("Form is invalid");
  //   }
  // }

  addRoom() {
    if (this.addRoomForm.valid) {
      const roomData: RoomList = this.addRoomForm.value;

      if (this.isEditMode && this.roomId) {
        this.roomService.updateRoom(this.roomId, roomData).subscribe(
          (data) => {
            Swal.fire({
              position: "bottom-end",
              icon: "success",
              title: "Room Updated Successfully",
              showConfirmButton: false,
              timer: 1500,
            });
            // this.route.navigateByUrl("/rooms");
            this.formSubmitted.emit();
          },
          (error) => {
            console.error("Error updating room:", error);
          }
        );
      } else {
        this.roomService.addRoom(roomData).subscribe(
          (data) => {
            Swal.fire({
              position: "bottom-end",
              icon: "success",
              title: "Room Added Successfully",
              showConfirmButton: false,
              timer: 1500,
            });
            // this.route.navigateByUrl("/rooms");
            this.formSubmitted.emit();
          },
          (error) => {
            console.error("Error adding room:", error);
          }
        );
      }

      this.addRoomForm.reset();
    } else {
      console.log("Form is invalid");
    }
  }
}
