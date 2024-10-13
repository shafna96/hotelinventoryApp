// import { Component } from "@angular/core";
// import { Router } from "@angular/router";
// import { RegisterService } from "./register.service";

// @Component({
//   selector: "hinv-register",
//   templateUrl: "./register.component.html",
//   styleUrls: ["./register.component.scss"],
// })
// export class RegisterComponent {
//   //

//   user = {
//     firstName: "",
//     lastName: "",
//     email: "",
//     username: "",
//     password: "",
//     confirmPassword: "",
//   };

//   constructor(
//     private router: Router,
//     private registerService: RegisterService
//   ) {}

//   updateUsername() {
//     this.user.username = this.user.email;
//   }

//   register() {
//     if (this.user.password === this.user.confirmPassword) {
//       const userPayload = {
//         first_name: this.user.firstName,
//         last_name: this.user.lastName,
//         email: this.user.email,
//         username: this.user.username,
//         password: this.user.password,
//         confirmPassword: this.user.confirmPassword,
//       };

//       this.registerService.register(userPayload).subscribe(
//         (response) => {
//           console.log("Registration successful", response);
//           this.router.navigateByUrl("/rooms");
//         },
//         (error) => {
//           console.error("Registration failed", error);
//         }
//       );
//     } else {
//       console.log("Passwords do not match");
//     }
//   }
// }

import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { RegisterService } from "./register.service";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import Swal from "sweetalert2";

@Component({
  selector: "hinv-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit {
  //

  // userForm: FormGroup = new FormGroup({
  //   firstName: new FormControl(null,Validators.required)
  // })
  userForm!: FormGroup;
  // user = {
  //   firstName: "",
  //   lastName: "",
  //   email: "",
  //   username: "",
  //   password: "",
  //   confirmPassword: "",
  // };

  constructor(
    private router: Router,
    private registerService: RegisterService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.userForm = this.fb.group({
      firstName: new FormControl("", { validators: [Validators.required] }),
      lastName: new FormControl("", { validators: [Validators.required] }),
      email: new FormControl("", {
        validators: [Validators.required, Validators.email],
      }),
      username: new FormControl(
        { value: "", disabled: true },
        { validators: [Validators.required] }
      ),
      password: new FormControl("", {
        validators: [Validators.required, Validators.minLength(5)],
      }),
      confirmPassword: new FormControl("", {
        validators: [Validators.required],
      }),
    });
  }

  updateUsername() {
    const email = this.userForm.get("email")?.value; // Get the email value
    this.userForm.get("username")?.setValue(email); // Set the username to the email
  }

  // register() {
  //   if (this.user.password === this.user.confirmPassword) {
  //     const userPayload = {
  //       first_name: this.user.firstName,
  //       last_name: this.user.lastName,
  //       email: this.user.email,
  //       username: this.user.username,
  //       password: this.user.password,
  //       confirmPassword: this.user.confirmPassword,
  //     };

  //     this.registerService.register(userPayload).subscribe(
  //       (response) => {
  //         //Swal Alert
  //         console.log("Registration successful", response);
  //         this.router.navigateByUrl("/rooms");
  //       },
  //       (error) => {
  //         console.error("Registration failed", error);
  //       }
  //     );
  //   } else {
  //     console.log("Passwords do not match");
  //   }
  // }

  register() {
    if (this.userForm.valid) {
      const { firstName, lastName, email, password, confirmPassword } =
        this.userForm.value;

      const username = this.userForm.get("username")?.value;

      if (password === confirmPassword) {
        const userPayload = {
          first_name: firstName,
          last_name: lastName,
          email: email,
          username: username,
          password: password,
          confirmPassword: confirmPassword,
        };

        this.registerService.register(userPayload).subscribe(
          (response) => {
            console.log("Registration successful", response);
            Swal.fire({
              position: "bottom-end",
              icon: "success",
              title: "Registration successful",
              showConfirmButton: false,
              timer: 1500,
            });
            // Swal.fire("Registration successful");
            this.router.navigateByUrl("/rooms");
          },
          (error) => {
            console.error("Registration failed", error);
            // Swal.fire("Registration failed");
            Swal.fire({
              position: "bottom-end",
              icon: "error",
              title: "Registration failed",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        );
      } else {
        console.log("Passwords do not match");
        // Swal.fire("Passwords do not match");
        Swal.fire({
          position: "bottom-end",
          icon: "error",
          title: "Passwords do not match",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } else {
      console.log("Form is invalid");
    }
  }
}
