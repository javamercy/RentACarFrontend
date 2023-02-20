import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { User } from "src/app/models/user";
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
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.getUser();
  }

  getUser() {
    let user: User = this.localStorageService.get("user");
    this.userService.getByEmail(user.email).subscribe({
      next: (response) => {
        this.user = response.data;
        this.createChangeFirstNameForm();
        this.createChangeLastNameForm();
        this.createChangeEmailForm();
        this.createChangePasswordForm();
      },
      error: (err) => console.error(err),
    });
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
}
