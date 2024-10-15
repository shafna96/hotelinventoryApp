import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
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
import Swal from "sweetalert2";
import { catchError, of, Subject } from "rxjs";

@Component({
  selector: "hinv-rooms-list",
  templateUrl: "./rooms-list.component.html",
  styleUrls: ["./rooms-list.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoomsListComponent implements OnInit, OnChanges {
  rooms: RoomList[] | null = [];
  modalRef?: BsModalRef;
  @Input() title: string = "";
  @Output() selectedRoom = new EventEmitter<RoomList>();
  error$ = new Subject<string>();

  constructor(
    private roomService: RoomsService,
    private route: Router,
    private modalService: BsModalService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getRooms();
    this.roomService.refreshRoom$.subscribe((data) => {
      if (data) {
        this.getRooms();
      }
    });
  }
  getRooms() {
    this.roomService.getRooms().subscribe((rooms: RoomList[]) => {
      this.rooms = rooms;
      console.log("Fetched rooms:", this.rooms);
      this.cdr.detectChanges();
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
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

  openEditModal(template: any, roomId: number) {
    const initialState = {
      isEditMode: true,
      roomId: roomId,
    };
    this.modalRef = this.modalService.show(template, {
      class: "modal-lg",
      initialState: initialState,
    });
  }

  closeModal() {
    if (this.modalRef) {
      this.modalRef.hide();
    }
  }

  deleteRoom(id: number) {
    this.roomService.deleteRoom(id).subscribe(
      (response) => {
        console.log("Room deleted successfully", response);
        Swal.fire({
          position: "bottom-end",
          icon: "success",
          title: "Room Deleted Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      },
      (error) => {
        console.error("Error deleting room", error);
      }
    );
  }
}
