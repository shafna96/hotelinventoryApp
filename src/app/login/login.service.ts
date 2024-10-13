import { Inject, Injectable } from "@angular/core";
import { AppConfig } from "../AppConfig/appconfig.interface";
import { HttpClient } from "@angular/common/http";
import { APP_SERVICE_CONFIG } from "../AppConfig/appconfig.service";
import { catchError, map, Observable, of } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class LoginService {
  private _isLoggedIn: boolean = false;
  private _isAdmin: boolean = false;

  constructor(
    @Inject(APP_SERVICE_CONFIG) private config: AppConfig,
    private http: HttpClient
  ) {
    this.loadUserFromLocalStorage();
    console.log("apiend", this.config.apiEndpoint);
  }

  private loadUserFromLocalStorage(): void {
    const token = localStorage.getItem("token");
    if (token) {
      this._isLoggedIn = true;

      this._isAdmin = JSON.parse(localStorage.getItem("isAdmin") || "false");
    }
  }

  login(email: string, password: string): Observable<boolean> {
    const loginData = { email, password };
    return this.http
      .post<any>(`${this.config.apiEndpoint}/login`, loginData)
      .pipe(
        map((response) => {
          if (response && response.token) {
            this._isLoggedIn = true;
            this._isAdmin = response.isAdmin || false;
            localStorage.setItem("token", response.token);
            localStorage.setItem("isAdmin", JSON.stringify(this._isAdmin));
            return true;
          }
          return false;
        }),
        catchError((error) => {
          console.error("Login failed:", error);
          return of(false); // Return `false` when an error occurs
        })
      );
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem("token");
    return !!token || this._isLoggedIn;
  }

  isAdmin(): boolean {
    return this._isAdmin;
  }

  logout(): void {
    localStorage.removeItem("token");
    localStorage.removeItem("isAdmin");
    this._isLoggedIn = false;
    this._isAdmin = false;
  }
}
