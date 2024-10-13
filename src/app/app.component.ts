import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  Optional,
  ViewChild,
} from "@angular/core";
import { LoggerService } from "./logger.service";
import { localStorageToken } from "./localstorage.token";
import { InitService } from "./init.service";
import { Router } from "@angular/router";
import { LoginService } from "./login/login.service";

@Component({
  selector: "hinv-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  title = "hotelinventoryApp";

  // role = "Users";

  // @ViewChild("user", { read: ViewContainerRef }) vcr!: ViewContainerRef;
  @ViewChild("name", { static: true }) name!: ElementRef;

  constructor(
    @Optional() private loggerService: LoggerService,
    @Inject(localStorageToken) private localStorage: any,
    private initService: InitService,
    private router: Router,
    public loginService: LoginService
  ) {
    console.log(initService.config);
  }

  ngOnInit(): void {
    // this.router.events.subscribe((event) => {
    //   console.log(event);
    // });
    // this.router.events.pipe{}
    this.loggerService?.Log("AppComponent.ngOnInit()");
    this.name.nativeElement.innerText = "Hilton Hotel";
    this.localStorage.setItem("name", "Hilton Hotel");
  }
  // ngAfterViewInit(): void {
  //   const componentRef = this.vcr.createComponent(RoomsComponent);
  //   componentRef.instance.numberOfRooms = 50;
  // }
}
