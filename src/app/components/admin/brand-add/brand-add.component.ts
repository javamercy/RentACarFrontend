import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { Brand } from "src/app/models/brand";
import { BrandService } from "src/app/services/brand.service";

@Component({
  selector: "app-brand-add",
  templateUrl: "./brand-add.component.html",
  styleUrls: ["./brand-add.component.css"],
})
export class BrandAddComponent implements OnInit {
  brandAddForm: FormGroup;

  constructor(
    private brandService: BrandService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.createBrandAddForm();
  }

  createBrandAddForm() {
    this.brandAddForm = new FormGroup({
      name: new FormControl("", Validators.required),
    });
  }

  add() {
    if (this.brandAddForm.invalid) return;
    let brand: Brand = this.brandAddForm.value as Brand;

    this.brandService.add(brand).subscribe({
      next: (response) => {
        this.toastrService.success("New brand was added!", "SUCCESS");
      },
      error: (error) => console.error(error),
    });
  }
}
