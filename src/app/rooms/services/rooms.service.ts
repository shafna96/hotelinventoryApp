import { Inject, Injectable } from "@angular/core";
import { RoomList } from "../rooms";
import { APP_SERVICE_CONFIG } from "../../AppConfig/appconfig.service";
import { AppConfig } from "src/app/AppConfig/appconfig.interface";
import { HttpClient, HttpHeaders, HttpRequest } from "@angular/common/http";
import { shareReplay } from "rxjs";
import { environment } from "src/app/environments/environment";

@Injectable({
  providedIn: "root",
})
export class RoomsService {
  roomList: RoomList[] = [
    // {
    //   roomNumber: 1,
    //   roomType: "Deluxe Room",
    //   amenities: "Air Conditioner, Free Wi-Fi, TV, Bathroom, Kitchen",
    //   price: 500,
    //   photos:
    //     "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
    //   checkinTime: new Date("11-Nov-2021"),
    //   checkoutTime: new Date("12-Nov-2021"),
    //   rating: 4.5,
    // },
    // {
    //   roomNumber: 2,
    //   roomType: "Deluxe Room",
    //   amenities: "Air Conditioner, Free Wi-Fi, TV, Bathroom, Kitchen",
    //   price: 1000,
    //   photos:
    //     "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
    //   checkinTime: new Date("11-Nov-2021"),
    //   checkoutTime: new Date("12-Nov-2021"),
    //   rating: 3.5658,
    // },
    // {
    //   roomNumber: 3,
    //   roomType: "Private Room",
    //   amenities: "Air Conditioner, Free Wi-Fi, TV, Bathroom, Kitchen",
    //   price: 1500,
    //   photos:
    //     "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
    //   checkinTime: new Date("11-Nov-2021"),
    //   checkoutTime: new Date("12-Nov-2021"),
    //   rating: 2.5,
    // },
  ];
  //  headers = new HttpHeaders({ "token": "12345sdhgfhdgf" });
  getRooms$ = this.http
    .get<RoomList[]>(environment.apiEndpoint + "/rooms")
    .pipe(shareReplay(1));
  constructor(
    @Inject(APP_SERVICE_CONFIG) private config: AppConfig,
    private http: HttpClient
  ) {
    console.log("Rooms Service Initialized...");
    console.log(this.config.apiEndpoint);
  }

  getRooms() {
    // return this.roomList;
    // const headers = new HttpHeaders({ "token": "12345sdhgfhdgf" });
    return this.http.get<RoomList[]>(environment.apiEndpoint + "/rooms");
  }

  addRoom(room: RoomList) {
    return this.http.post<RoomList[]>(environment.apiEndpoint + "/rooms", room);
  }

  editRoom(room: RoomList) {
    return this.http.put<RoomList[]>(environment.apiEndpoint + "/rooms", room);
  }

  deleteRoom(id: number) {
    console.log("delete service", id);
    return this.http.delete(`${environment.apiEndpoint}/rooms/${id}`);
  }

  getPhotos() {
    const request = new HttpRequest(
      "GET",
      `https://jsonplaceholder.typicode.com/photos`,
      {
        reportProgress: true,
      }
    );
    return this.http.request(request);
  }
}
