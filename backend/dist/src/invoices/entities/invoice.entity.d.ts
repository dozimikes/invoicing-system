import { InvoiceStatus } from '@prisma/client-custom';
import { Client } from '../../clients/entities/client.entity';
export declare class Invoice {
    id: number;
    clientId: number;
    amount: number;
    description: string;
    status: InvoiceStatus;
    createdAt: Date;
    updatedAt: Date;
    client?: Client;
}
