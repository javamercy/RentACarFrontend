import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { LocalStorageUserModel } from "src/app/models/localStorageUserModel";
import { LoginModel } from "src/app/models/loginModel";
import { TokenModel } from "src/app/models/tokenModel";
import { AuthService } from "src/app/services/auth.service";
import { LocalStorageService } from "src/app/services/localStorage.service";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private localStorageService: LocalStorageService,
    private router: Router,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl("", Validators.required),
      password: new FormControl("", Validators.required),
    });
  }

  login() {
    if (this.loginForm.invalid) return;
    let userToLogin: LoginModel = this.loginForm.value as LoginModel;

    this.authService.login(userToLogin).subscribe({
      next: (response) => {
        this.AddUserToLocalStorage(userToLogin.email);
        this.addTokenToLocalStorage(response.data);
        this.toastrService.success("Login Success");
        setTimeout(() => {
          this.router.navigate(["/home"]).then(() => location.reload());
        }, 1500);
      },

      error: (error) => {
        this.toastrService.error(error.error.message);
      },
    });
  }

  AddUserToLocalStorage(email: string) {
    this.userService.getByEmail(email).subscribe({
      next: (response) => {
        let user: LocalStorageUserModel = {
          id: response.data.id,
          email: response.data.email,
          firstName: response.data.firstName,
          lastName: response.data.lastName,
        };

        this.localStorageService.add("user", user);
      },

      error: (err) => console.error(err),
    });
  }

  addTokenToLocalStorage(tokenModel: TokenModel) {
    this.localStorageService.add("token", tokenModel);
  }
}
