import { Invoice } from '../../invoices/entities/invoice.entity';
export declare class Client {
    id: number;
    name: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
    invoices?: Invoice[];
}
