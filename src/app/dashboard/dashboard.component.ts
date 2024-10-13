import { Component, Inject, OnInit, Optional } from "@angular/core";
import { LoginService } from "../login/login.service";
import { Router } from "@angular/router";
import { localStorageToken } from "../localstorage.token";
import { LoggerService } from "../logger.service";

@Component({
  selector: "hinv-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  constructor(
    @Optional() private loggerService: LoggerService,
    @Inject(localStorageToken) private localStorage: any,

    private router: Router,
    public loginService: LoginService
  ) {}

  ngOnInit(): void {}
}
