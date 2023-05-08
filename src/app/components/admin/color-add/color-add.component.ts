import { Component, OnInit } from "@angular/core";
import {
  FormControl,
  FormGroup,
  RequiredValidator,
  Validators,
} from "@angular/forms";
import { Route, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Color } from "src/app/models/color";
import { ColorService } from "src/app/services/color.service";

@Component({
  selector: "app-color-add",
  templateUrl: "./color-add.component.html",
  styleUrls: ["./color-add.component.css"],
})
export class ColorAddComponent implements OnInit {
  colorAddForm: FormGroup;

  constructor(
    private colorService: ColorService,
    private toastrService: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createColorAddForm();
  }

  createColorAddForm() {
    this.colorAddForm = new FormGroup({
      name: new FormControl("", Validators.required),
    });
  }

  add() {
    let colorToAdd: Color = this.colorAddForm.value as Color;

    this.colorService.add(colorToAdd).subscribe({
      next: (response) => {
        this.toastrService.success("Color was added!", "SUCCESS");
        this.router.navigateByUrl("/admin/management/colors");
      },
      error: (err) => console.error(err),
    });
  }
}
