import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ChangePasswordModel } from "src/app/models/changePasswordModel";
import { User } from "src/app/models/user";
import { AuthService } from "src/app/services/auth.service";
import { LocalStorageService } from "src/app/services/localStorage.service";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"],
})
export class ProfileComponent implements OnInit {
  user: User;
  changePasswordForm: FormGroup;
  changeEmailForm: FormGroup;
  changeFirstNameForm: FormGroup;
  changeLastNameForm: FormGroup;

  constructor(
    private userService: UserService,
    private localStorageService: LocalStorageService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getUser();
  }

  getUser() {
    let user: User = this.localStorageService.get("user");
    this.userService.getByEmail(user.email).subscribe({
      next: (response) => {
        this.user = response.data;
        this.createForms();
      },
      error: (err) => console.error(err),
    });
  }

  createForms() {
    this.createChangeFirstNameForm();
    this.createChangeLastNameForm();
    this.createChangeEmailForm();
    this.createChangePasswordForm();
  }

  createChangeFirstNameForm() {
    this.changeFirstNameForm = new FormGroup({
      firstName: new FormControl(this.user.firstName, Validators.required),
    });
  }

  createChangeLastNameForm() {
    this.changeLastNameForm = new FormGroup({
      lastName: new FormControl(this.user.lastName, Validators.required),
    });
  }

  createChangeEmailForm() {
    this.changeEmailForm = new FormGroup({
      email: new FormControl(this.user.email, Validators.required),
    });
  }

  createChangePasswordForm() {
    this.changePasswordForm = new FormGroup({
      oldPassword: new FormControl("", Validators.required),
      newPassword: new FormControl("", Validators.required),
    });
  }

  changeFirstName() {
    let updatedUser: User = Object.assign({}, this.user);
    updatedUser.firstName = this.changeFirstNameForm.value.firstName;

    this.userService.update(updatedUser).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (err) => console.error(err),
    });
  }

  changeLastName() {
    let updatedUser: User = Object.assign({}, this.user);
    updatedUser.lastName = this.changeLastNameForm.value.lastName;

    this.userService.update(updatedUser).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (err) => console.error(err),
    });
  }

  changeEmail() {
    let updatedUser: User = Object.assign({}, this.user);
    updatedUser.email = this.changeEmailForm.value.email;

    this.userService.update(updatedUser).subscribe({
      next: (response) => {
        this.localStorageService.update("user", updatedUser);
      },
      error: (err) => console.error(err),
    });
  }

  changePassword() {
    let changePasswordModel: ChangePasswordModel = this.changePasswordForm
      .value as ChangePasswordModel;
    changePasswordModel.email = this.user.email;

    console.log(changePasswordModel);

    this.authService.changePassword(changePasswordModel).subscribe({
      next: (response) => {
        this.localStorageService.remove("user", "token");
        this.router.navigate(["/login"]);
      },
      error: (err) => console.error(err),
    });
  }
}
