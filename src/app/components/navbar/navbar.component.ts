import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import {
  faChevronDown,
  faChevronUp,
  faUserCircle,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import { User } from "src/app/models/user";
import { AuthService } from "src/app/services/auth.service";
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
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getUser();
    this.collapseNavbar();
  }

  getUser() {
    this.user = this.localStorageService.get("user");
  }

  changeChevron() {
    this.chevronIcon =
      this.chevronIcon.icon == faChevronDown.icon ? faChevronUp : faChevronDown;
  }

  signout() {
    this.authService.signout();
    this.router.navigate(["/login"]).then((bool) => bool && location.reload());
  }

  collapseNavbar() {
    const navbar = document.querySelector("nav.navbar");

    navbar.addEventListener("click", (e) => {
      const navbarCollapse = document.querySelector(".navbar-collapse");
      const element = e.target as Element;

      if (
        element.classList.contains("nav-link") ||
        element.classList.contains("dropdown-item")
      ) {
        navbarCollapse.classList.toggle("show");
      }
    });
  }
}
