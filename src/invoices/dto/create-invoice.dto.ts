import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateInvoiceDto {
  @IsNumber()
  clientId: number;
}
