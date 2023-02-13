import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { SignupModel } from "src/app/models/signupModel";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-singup",
  templateUrl: "./singup.component.html",
  styleUrls: ["./singup.component.css"],
})
export class SingupComponent implements OnInit {
  signupForm: FormGroup;
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      firstName: new FormControl("Engin", Validators.required),
      lastName: new FormControl("Demiroğ", Validators.required),
      email: new FormControl("engin.engin@gmail.com", Validators.required),
      password: new FormControl("123456", Validators.required),
    });
  }

  signup() {
    if (this.signupForm.valid) {
      let userToAdd: SignupModel = this.signupForm.value as SignupModel;

      this.authService.signup(userToAdd).subscribe({
        next: (response) => {
          this.router.navigate(["/login"]);
        },
        error: (err) => console.error(err),
      });
    }
  }
}
