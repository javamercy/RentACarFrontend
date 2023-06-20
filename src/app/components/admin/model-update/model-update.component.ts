import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Brand } from "src/app/models/brand";
import { Model } from "src/app/models/model";
import { BrandService } from "src/app/services/brand.service";
import { ModelService } from "src/app/services/model.service";

@Component({
  selector: "app-model-update",
  templateUrl: "./model-update.component.html",
  styleUrls: ["./model-update.component.css"],
})
export class ModelUpdateComponent {
  modelUpdateForm: FormGroup;
  model: Model;
  brands: Brand[];

  constructor(
    private modelService: ModelService,
    private brandService: BrandService,
    private toastrService: ToastrService,
    private activatedRote: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.createModelUpdateForm();
    this.getBrands();
    this.activatedRote.params.subscribe((params) => {
      let modelId: number = params["modelId"];

      if (modelId) {
        this.getById(modelId);
      }
    });
  }

  getById(id: number) {
    this.modelService.getById(id).subscribe({
      next: (response) => {
        this.model = response.data;
        this.modelUpdateForm.controls["id"].setValue(this.model.id);
        this.modelUpdateForm.controls["brandId"].setValue(this.model.brandId);
        this.modelUpdateForm.controls["name"].setValue(this.model.name);
      },
      error: (error) => console.error(error),
    });
  }

  getBrands() {
    this.brandService.getAll().subscribe({
      next: (response) => {
        this.brands = response.data;
      },
      error: (error) => console.error(error),
    });
  }

  createModelUpdateForm() {
    this.modelUpdateForm = new FormGroup({
      id: new FormControl({ disabled: true, value: "" }, Validators.required),
      brandId: new FormControl(
        { disabled: true, value: "" },
        Validators.required
      ),
      name: new FormControl("", Validators.required),
    });
  }

  update() {
    let model: Model = Object.assign({}, this.modelUpdateForm.value);
    model.id = this.model.id;

    this.modelService.update(model).subscribe({
      next: (response) => {
        this.toastrService.success("model was updated", "SUCCESS");
      },
      error: (error) => console.error(error),
    });
  }

  isUpdateButtonDisabled() {
    let name: string = this.model.name.toLowerCase();

    return (
      name == this.modelUpdateForm.controls["name"].value.toLowerCase() ||
      this.modelUpdateForm.invalid ||
      this.modelUpdateForm.pristine
    );
  }
}
