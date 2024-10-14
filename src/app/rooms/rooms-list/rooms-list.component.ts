import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from "@angular/core";
import { RoomList } from "../rooms";
import { RoomsService } from "../services/rooms.service";
import { Router } from "@angular/router";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";

@Component({
  selector: "hinv-rooms-list",
  templateUrl: "./rooms-list.component.html",
  styleUrls: ["./rooms-list.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoomsListComponent implements OnInit, OnChanges {
  @Input() rooms: RoomList[] | null = [];
  modalRef?: BsModalRef;
  @Input() title: string = "";
  // @Output() isEditMode: boolean = false;
  // @Output() roomId: number | null = null;
  @Output() selectedRoom = new EventEmitter<RoomList>();

  constructor(
    private roomService: RoomsService,
    private route: Router,
    private modalService: BsModalService
  ) {}

  ngOnInit(): void {}
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    if (changes["title"]) {
      this.title = changes["title"].currentValue.toUpperCase();
    }
  }

  selectRoom(room: RoomList) {
    this.selectedRoom.emit(room);
  }

  editRoom(room: RoomList) {
    this.roomService.editRoom(room);
  }

  // getRooms() {
  //   this.roomService.getRooms().subscribe((data) => {});
  // }
  openEditModal(template: any, roomId: number) {
    // Pass data through initialState
    const initialState = {
      isEditMode: true,
      roomId: roomId,
    };
    this.modalRef = this.modalService.show(template, {
      class: "modal-lg",
      initialState: initialState,
    });

    console.log("roomId", roomId);
    console.log("isEditMode", true);
  }

  closeModal() {
    if (this.modalRef) {
      this.modalRef.hide();
    }
  }

  deleteRoom(id: number) {
    console.log("delete", id);
    this.roomService.deleteRoom(id).subscribe(
      (response) => {
        console.log("Room deleted successfully", response);
        // this.getRooms();
        this.route.navigateByUrl("/rooms");
      },
      (error) => {
        console.error("Error deleting room", error);
      }
    );
  }
}
