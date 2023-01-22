import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.css'],
})
export class ColorComponent implements OnInit {
  colors: Color[];
  selectedColor: Color;
  isAllColors: boolean = false;

  constructor(
    private colorService: ColorService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getAll();
  }

  getAll(): void {
    this.colorService.getAll().subscribe({
      next: (response) => (this.colors = response.data),

      error: (err) => console.error(err),
    });
  }

  setSelectedColor(color: Color): void {
    this.selectedColor = color;
  }

  isSelectedColor(color: Color): boolean {
    return this.selectedColor == color;
  }
}
