import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Brand } from "src/app/models/brand";
import { BrandService } from "src/app/services/brand.service";

@Component({
  selector: "app-brand-update",
  templateUrl: "./brand-update.component.html",
  styleUrls: ["./brand-update.component.css"],
})
export class BrandUpdateComponent implements OnInit {
  brandUpdateForm: FormGroup;
  brand: Brand;

  constructor(
    private brandService: BrandService,
    private toastrService: ToastrService,
    private activatedRote: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.createBrandUpdateForm();
    this.activatedRote.params.subscribe((params) => {
      let brandId: number = params["brandId"];

      if (brandId) {
        this.getBrandById(brandId);
      }
    });
  }

  getBrandById(id: number) {
    this.brandService.getById(id).subscribe({
      next: (response) => {
        this.brand = response.data;
        this.brandUpdateForm.controls["name"].setValue(this.brand.name);
        this.brandUpdateForm.controls["id"].setValue(this.brand.id);
      },
      error: (error) => console.error(error),
    });
  }

  createBrandUpdateForm() {
    this.brandUpdateForm = new FormGroup({
      id: new FormControl({ disabled: true, value: "" }, Validators.required),

      name: new FormControl("", Validators.required),
    });
  }

  update() {
    let brand: Brand = Object.assign({}, this.brandUpdateForm.value);
    brand.id = this.brand.id;

    this.brandService.update(brand).subscribe({
      next: (response) => {
        this.toastrService.success("Brand was updated", "SUCCESS");
      },
      error: (error) => console.error(error),
    });
  }

  isUpdateButtonDisabled() {
    let name: string = this.brand.name.toLowerCase();

    return (
      name == this.brandUpdateForm.controls["name"].value.toLowerCase() ||
      this.brandUpdateForm.invalid ||
      this.brandUpdateForm.pristine
    );
  }
}
