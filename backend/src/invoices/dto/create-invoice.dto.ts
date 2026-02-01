import { IsInt, IsNotEmpty, IsNumber, IsPositive, IsString, IsEnum, IsOptional } from 'class-validator';
import { InvoiceStatus } from '../../prisma/client';

export class CreateInvoiceDto {
  @IsInt()
  clientId: number;

  @IsNumber()
  @IsPositive()
  amount: number;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsOptional()
  @IsEnum(InvoiceStatus)
  status?: InvoiceStatus;
}
