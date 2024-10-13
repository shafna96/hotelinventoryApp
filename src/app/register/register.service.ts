import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { AppConfig } from "../AppConfig/appconfig.interface";
import { APP_SERVICE_CONFIG } from "../AppConfig/appconfig.service";
import { Observable } from "rxjs";
import { environment } from "../environments/environment";

@Injectable({
  providedIn: "root",
})
export class RegisterService {
  constructor(
    @Inject(APP_SERVICE_CONFIG) private config: AppConfig,
    private http: HttpClient
  ) {
    console.log("apiend", this.config.apiEndpoint);
  }

  register(user: any): Observable<any> {
    return this.http.post<any>(`${environment.apiEndpoint}/register`, user);
  }
}
