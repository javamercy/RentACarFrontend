import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Brand } from "src/app/models/brand";
import { Model } from "src/app/models/model";
import { BrandService } from "src/app/services/brand.service";
import { ModelService } from "src/app/services/model.service";

@Component({
  selector: "app-model-add",
  templateUrl: "./model-add.component.html",
  styleUrls: ["./model-add.component.css"],
})
export class ModelAddComponent implements OnInit {
  modelAddForm: FormGroup;
  brands: Brand[];

  constructor(
    private modelService: ModelService,
    private toastrService: ToastrService,
    private brandService: BrandService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createModelAddForm();
    this.getBrands();
  }

  createModelAddForm() {
    this.modelAddForm = new FormGroup({
      brandId: new FormControl("", Validators.required),
      name: new FormControl("", Validators.required),
    });
  }

  getBrands() {
    this.brandService.getAll().subscribe({
      next: (response) => {
        this.brands = response.data;
      },
      error: (err) => console.error(err),
    });
  }

  add() {
    let modelToAdd: Model = this.modelAddForm.value as Model;

    this.modelService.add(modelToAdd).subscribe({
      next: (response) => {
        this.toastrService.success("Model was added!", "SUCCESS");
        this.router.navigate(["/admin/management/models"]);
      },
      error: (err) => console.error(err),
    });
  }
}
