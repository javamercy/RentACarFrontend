export interface CarDetailDto {
  carId: number;
  brandId: number;
  colorId: number;
  modelId: number;
  brandName: string;
  colorName: string;
  modelName: string;
  modelYear: number;
  dailyPrice: number;
  carDescription: string;
  imagePaths: string[];
}
