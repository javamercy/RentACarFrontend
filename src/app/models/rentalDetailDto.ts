export interface RentalDetailDto {
  rentalId: number;
  customerId: number;
  carId: number;
  customerFullName: string;
  carDescription: string;
  rentDate: Date;
  returnDate: Date;
}
