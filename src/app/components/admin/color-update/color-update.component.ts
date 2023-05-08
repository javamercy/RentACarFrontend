import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Color } from "src/app/models/color";
import { ColorService } from "src/app/services/color.service";

@Component({
  selector: "app-color-update",
  templateUrl: "./color-update.component.html",
  styleUrls: ["./color-update.component.css"],
})
export class ColorUpdateComponent implements OnInit {
  color: Color;
  colorUpdateForm: FormGroup;

  constructor(
    private colorService: ColorService,
    private toastrService: ToastrService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.getColorToUpdate();
    this.createColorUpdateForm();
  }

  getColorToUpdate() {
    this.activatedRoute.params.subscribe((params) => {
      let colorId: number = +params["colorId"];

      if (colorId) {
        this.colorService.getById(colorId).subscribe({
          next: (response) => {
            this.color = response.data;
            this.colorUpdateForm.controls["id"].setValue(this.color.id);
            this.colorUpdateForm.controls["name"].setValue(this.color.name);
          },

          error: (err) => console.error(err),
        });
      }
    });
  }

  createColorUpdateForm() {
    this.colorUpdateForm = new FormGroup({
      id: new FormControl({ disabled: true, value: "" }),
      name: new FormControl("", Validators.required),
    });
  }

  update() {
    let colorToUpdate: Color = this.colorUpdateForm.value as Color;
    colorToUpdate.id = this.color.id;
    this.colorService.update(colorToUpdate).subscribe({
      next: (response) => {
        this.toastrService.success("Color was updated!", "SUCCESS");
        this.router.navigate(["/admin/management/colors"]);
      },
    });
  }

  isUpdateButtonDisabled() {
    let name: string = this.color.name.toLowerCase();

    return (
      name == this.colorUpdateForm.controls["name"].value.toLowerCase() ||
      this.colorUpdateForm.invalid ||
      this.colorUpdateForm.pristine
    );
  }
}
