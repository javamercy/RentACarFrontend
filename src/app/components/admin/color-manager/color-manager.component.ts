import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Color } from "src/app/models/color";
import { ColorService } from "src/app/services/color.service";

@Component({
  selector: "app-color-manager",
  templateUrl: "./color-manager.component.html",
  styleUrls: ["./color-manager.component.css"],
})
export class ColorManagerComponent implements OnInit {
  colors: Color[];

  constructor(
    private colorService: ColorService,
    private toastrServie: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getColors();
  }

  getColors() {
    this.colorService.getAll().subscribe({
      next: (response) => (this.colors = response.data),

      error: (err) => console.error(err),
    });
  }
  delete(color: Color) {
    this.colorService.delete(color).subscribe({
      next: (response) => {
        this.toastrServie.success("Color was deleted!", "SUCCESS");
        this.getColors();
      },
      error: (err) => console.error(err),
    });
  }
}
