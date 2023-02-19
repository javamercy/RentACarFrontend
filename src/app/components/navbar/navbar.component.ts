import { Component, OnInit } from "@angular/core";
import {
  faUserCircle,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import { User } from "src/app/models/user";
import { LocalStorageService } from "src/app/services/localStorage.service";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"],
})
export class NavbarComponent implements OnInit {
  user: User;
  profileIcon: IconDefinition = faUserCircle;

  constructor(private localStorageService: LocalStorageService) {}

  ngOnInit(): void {
    this.getUser();
  }

  getUser() {
    this.user = this.localStorageService.get("user");
  }
}
