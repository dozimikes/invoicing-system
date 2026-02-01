import { InvoiceStatus } from '../../prisma/client';
export declare class UpdateInvoiceDto {
    amount?: number;
    description?: string;
    status?: InvoiceStatus;
}
