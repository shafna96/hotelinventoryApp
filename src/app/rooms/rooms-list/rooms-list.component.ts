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

@Component({
  selector: "hinv-rooms-list",
  templateUrl: "./rooms-list.component.html",
  styleUrls: ["./rooms-list.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoomsListComponent implements OnInit, OnChanges, OnDestroy {
  @Input() rooms: RoomList[] | null = [];

  @Input() title: string = "";

  @Output() selectedRoom = new EventEmitter<RoomList>();

  constructor(private roomService: RoomsService, private route: Router) {}

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
  ngOnDestroy(): void {
    console.log("onDestroy is called");
  }
  // getRooms() {
  //   this.roomService.getRooms().subscribe((data) => {});
  // }
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

  ngOnInit(): void {}
}
