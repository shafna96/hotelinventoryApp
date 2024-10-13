import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { LoginService } from "./login.service";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import Swal from "sweetalert2";

@Component({
  selector: "hinv-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  // email: string = "";
  // password: string = "";

  constructor(
    private route: Router,
    private loginService: LoginService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: new FormControl("", { validators: [Validators.required] }),
      password: new FormControl("", { validators: [Validators.required] }),
    });
  }

  login() {
    const email = this.loginForm.get("email")?.value;
    const password = this.loginForm.get("password")?.value;
    this.loginService.login(email, password).subscribe((data) => {
      // Swal.fire("Login successful");
      Swal.fire({
        position: "bottom-end",
        icon: "success",
        title: "Login successful",
        showConfirmButton: false,
        timer: 1500,
      });
      this.route.navigateByUrl("/rooms");
    });
  }
}
