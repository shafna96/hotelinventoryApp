import { Component, inject } from "@angular/core";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { Observable } from "rxjs";
import { map, shareReplay } from "rxjs/operators";
import { LoginService } from "../login/login.service";
import { Router } from "@angular/router";

@Component({
  selector: "hinv-app-nav",
  templateUrl: "./app-nav.component.html",
  styleUrls: ["./app-nav.component.scss"],
})
export class AppNavComponent {
  private breakpointObserver = inject(BreakpointObserver);

  private loginService = inject(LoginService);
  private router = inject(Router);

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  logout(): void {
    this.loginService.logout();
    this.router.navigate(["/auth/login"]);
  }
}
