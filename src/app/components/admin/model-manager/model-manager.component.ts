import { Component } from "@angular/core";
import { Model } from "src/app/models/model";
import { ModelService } from "src/app/services/model.service";

@Component({
  selector: "app-model-manager",
  templateUrl: "./model-manager.component.html",
  styleUrls: ["./model-manager.component.css"],
})
export class ModelManagerComponent {
  models: Model[];

  constructor(private modelService: ModelService) {}

  ngOnInit(): void {
    this.getModels();
  }

  getModels() {
    this.modelService.getAll().subscribe({
      next: (response) => {
        this.models = response.data;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  delete(model: Model) {
    this.modelService.delete(model).subscribe({
      next: (response) => {},
      error: (error) => console.log(error),
    });
  }
}
