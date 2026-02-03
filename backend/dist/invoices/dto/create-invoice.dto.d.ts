import { InvoiceStatus } from '@prisma/client';
export declare class CreateInvoiceDto {
    clientId: number;
    amount: number;
    description: string;
    status?: InvoiceStatus;
}
