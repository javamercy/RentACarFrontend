import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import {
  faChevronDown,
  faChevronUp,
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
  chevronIcon: IconDefinition = faChevronDown;

  constructor(
    private localStorageService: LocalStorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getUser();
  }

  getUser() {
    this.user = this.localStorageService.get("user");
  }

  changeChevron() {
    const dropdownMenu = document.querySelector(".dropdown-menu-profile");
    if (dropdownMenu.classList.contains("show")) {
      this.chevronIcon = faChevronUp;
    } else {
      this.chevronIcon = faChevronDown;
    }
  }

  signout() {
    this.localStorageService.remove("token");
    this.localStorageService.remove("user");
    this.router.navigate(["/login"]).then((bool) => {
      if (bool) {
        location.reload();
      }
    });
  }
}
