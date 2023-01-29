export interface Payment {
  id: number;
  firstName: string;
  lastName: string;
  cardNumber: string;
  expiringMonth: number;
  expiringYear: number;
  cardVerificationCode: number;
}
