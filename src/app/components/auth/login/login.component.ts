import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { LoginModel } from "src/app/models/loginModel";
import { TokenModel } from "src/app/models/tokenModel";
import { User } from "src/app/models/user";
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
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl("engin.engin@gmail.com", Validators.required),
      password: new FormControl("123456", Validators.required),
    });
  }

  login() {
    let userToLogin: LoginModel = this.loginForm.value as LoginModel;

    this.authService.login(userToLogin).subscribe({
      next: (response) => {
        this.AddUserToLocalStorage(userToLogin.email);
        this.addTokenToLocalStorage(response.data);
        this.router.navigate(["/home"]);
      },

      error: (err) => console.error(err),
    });
  }

  AddUserToLocalStorage(email: string) {
    this.userService.getByEmail(email).subscribe({
      next: (response) => {
        this.localStorageService.add("user", response.data);
      },

      error: (err) => console.error(err),
    });
  }

  addTokenToLocalStorage(tokenModel: TokenModel) {
    this.localStorageService.add("token", tokenModel.token);
    this.localStorageService.removeAtSpesificTime(
      "token",
      tokenModel.expiration
    );
  }
}
