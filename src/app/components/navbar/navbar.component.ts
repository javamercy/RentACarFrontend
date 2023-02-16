import { Component, OnInit } from "@angular/core";
import { User } from "src/app/models/user";
import { LocalStorageService } from "src/app/services/localStorage.service";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"],
})
export class NavbarComponent implements OnInit {
  user: User;

  constructor(private localStorageService: LocalStorageService) {}

  ngOnInit(): void {
    this.user = this.localStorageService.get("user");
  }
}
