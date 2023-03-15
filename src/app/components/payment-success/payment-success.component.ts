import { Component, OnInit } from "@angular/core";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faCheckToSlot } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-payment-success",
  templateUrl: "./payment-success.component.html",
  styleUrls: ["./payment-success.component.css"],
})
export class PaymentSuccessComponent implements OnInit {
  checkIcon: IconDefinition;
  constructor() {
    this.checkIcon = faCheckToSlot;
  }
  ngOnInit(): void {}
}
