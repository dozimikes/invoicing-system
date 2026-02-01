import { IsNumber, IsOptional, IsPositive, IsString, IsEnum } from 'class-validator';
import { InvoiceStatus } from '../../prisma/client';

export class UpdateInvoiceDto {
    @IsOptional()
    @IsNumber()
    @IsPositive()
    amount?: number;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsEnum(InvoiceStatus)
    status?: InvoiceStatus;
}
