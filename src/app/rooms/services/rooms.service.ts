import { Inject, Injectable } from "@angular/core";
import { RoomList } from "../rooms";
import { APP_SERVICE_CONFIG } from "../../AppConfig/appconfig.service";
import { AppConfig } from "src/app/AppConfig/appconfig.interface";
import { HttpClient, HttpHeaders, HttpRequest } from "@angular/common/http";
import { shareReplay, Subject, tap } from "rxjs";
import { environment } from "src/app/environments/environment";

@Injectable({
  providedIn: "root",
})
export class RoomsService {
  roomList: RoomList[] = [];
  //  headers = new HttpHeaders({ "token": "12345sdhgfhdgf" });
  refreshRoom$ = new Subject<boolean>();

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
    return this.http
      .post<RoomList[]>(environment.apiEndpoint + "/rooms", room)
      .pipe(
        tap(() => {
          this.refreshRoom$.next(true);
        })
      );
  }

  editRoom(room: RoomList) {
    return this.http
      .put<RoomList[]>(environment.apiEndpoint + "/rooms", room)
      .pipe(
        tap(() => {
          this.refreshRoom$.next(true);
        })
      );
  }

  deleteRoom(id: number) {
    console.log("delete service", id);
    return this.http.delete(`${environment.apiEndpoint}/rooms/${id}`).pipe(
      tap(() => {
        this.refreshRoom$.next(true);
      })
    );
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
  getRoomById(id: number) {
    return this.http.get<RoomList>(`${environment.apiEndpoint}/rooms/${id}`);
  }

  updateRoom(id: number, room: RoomList) {
    return this.http
      .put<RoomList>(`${environment.apiEndpoint}/rooms/${id}`, room)
      .pipe(
        tap(() => {
          this.refreshRoom$.next(true);
        })
      );
  }
}
