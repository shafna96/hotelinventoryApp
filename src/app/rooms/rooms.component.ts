import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  DoCheck,
  OnDestroy,
  OnInit,
  QueryList,
  SkipSelf,
  TemplateRef,
  ViewChild,
  ViewChildren,
} from "@angular/core";
import { RoomList, Rooms } from "./rooms";
import { HeaderComponent } from "../header/header.component";
import { RoomsService } from "./services/rooms.service";
import { catchError, map, Observable, of, Subject, Subscription } from "rxjs";
import { HttpEventType, HttpRequest } from "@angular/common/http";
import { ConfigService } from "../services/config.service";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";

@Component({
  selector: "hinv-rooms",
  templateUrl: "./rooms.component.html",
  styleUrls: ["./rooms.component.scss"],
})
export class RoomsComponent
  implements OnInit, DoCheck, AfterViewInit, AfterViewChecked, OnDestroy
{
  modalRef?: BsModalRef;
  hotelName = "Hilton Hotel";
  numberOfRooms = 10;
  hideRooms = true;

  selectedRoom!: RoomList;

  rooms: Rooms = {
    totalRooms: 20,
    availableRooms: 10,
    bookedRooms: 5,
  };

  title = "Room List";

  roomList: RoomList[] = [];

  stream = new Observable((observer) => {
    observer.next("user1");
    observer.next("user2");
    observer.next("user3");
    observer.complete();
    // observer.error("error");
  });

  @ViewChild(HeaderComponent, { static: true })
  headerComponent!: HeaderComponent;

  @ViewChildren(HeaderComponent)
  headerChildrenComponent!: QueryList<HeaderComponent>;
  http: any;

  // roomService = new RoomsService();
  totalBytes = 0;

  subscription!: Subscription;

  error$ = new Subject<string>();

  getError$ = this.error$.asObservable();

  // rooms$ = this.roomService.getRooms$.pipe(
  //   catchError((err) => {
  //     // console.log(err);
  //     this.error$.next(err.message);
  //     return of([]);
  //   })
  // );

  // roomsCount$ = this.roomService.getRooms$.pipe(map((rooms) => rooms.length));

  constructor(
    @SkipSelf() private roomService: RoomsService,
    private configService: ConfigService,
    private modalService: BsModalService
  ) {}
  openModal(template: any) {
    this.modalRef = this.modalService.show(template, { class: "modal-lg" });
  }

  closeModal() {
    if (this.modalRef) {
      this.modalRef.hide();
    }
  }
  ngOnInit(): void {
    // this.roomService.getRooms().subscribe();
    // this.roomService.getPhotos().subscribe((event) => {
    //   // console.log(data);
    //   switch (event.type) {
    //     case HttpEventType.Sent: {
    //       console.log("Request has been made");
    //       break;
    //     }
    //     case HttpEventType.ResponseHeader: {
    //       console.log("Request success");
    //       break;
    //     }
    //     case HttpEventType.DownloadProgress: {
    //       this.totalBytes += event.loaded;
    //       break;
    //     }
    //     case HttpEventType.Response: {
    //       console.log(event.body);
    //     }
    //   }
    // });

    this.stream.subscribe({
      next: (value) => console.log(value),
      complete: () => console.log("complete"),
      error(err) {
        console.log(err);
      },
    });
    this.stream.subscribe((data) => console.log(data));
    // this.subscription = this.roomService.getRooms$.subscribe((rooms) => {
    //   this.roomList = rooms;
    // });
    // console.log(this.roomService.getRooms());
  }

  ngDoCheck(): void {
    console.log("on changes is called");
  }

  ngAfterViewInit(): void {
    // console.log(this.headerComponent);
    this.headerComponent.title = "Rooms View";

    // console.log((this.headerChildrenComponent.last.title = "Last title"));
  }

  ngAfterViewChecked(): void {}

  toggle() {
    this.hideRooms = !this.hideRooms;
    this.title = "Rooms List";
  }

  selectRoom(room: RoomList) {
    this.selectedRoom = room;
  }

  // addRoom() {
  //   const room: RoomList = {
  //     // roomNumber: "4",
  //     id: 1,
  //     roomType: "Deluxe Room",
  //     amenities: "Air Conditioner, Free Wi-Fi, TV, Bathroom, Kitchen",
  //     price: 1500,
  //     photos:
  //       "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
  //     checkinTime: new Date("11-Nov-2021"),
  //     checkoutTime: new Date("12-Nov-2021"),
  //     rating: 2.5,
  //   };
  //   // this.roomList.push(room);
  //   // this.roomList = [...this.roomList, room];
  //   this.roomService.addRoom(room).subscribe((data) => {
  //     this.roomList = data;
  //   });
  // }

  // editRoom() {
  //   const room: RoomList = {
  //     id: 3,
  //     roomNumber: "3",
  //     roomType: "Deluxe Room",
  //     amenities: "Air Conditioner, Free Wi-Fi, TV, Bathroom, Kitchen",
  //     price: 1500,
  //     photos:
  //       "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
  //     checkinTime: new Date("11-Nov-2021"),
  //     checkoutTime: new Date("12-Nov-2021"),
  //     rating: 2.5,
  //   };

  //   this.roomService.editRoom(room).subscribe((data) => {
  //     this.roomList = data;
  //   });
  // }

  // deleteRoom() {
  //   this.roomService
  //     .deleteRoom("0c937b65-3509-4844-ba54-d88202163861")
  //     .subscribe((data) => {
  //       this.roomList = data;
  //     });
  // }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
