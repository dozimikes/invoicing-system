import { Invoice } from '../../invoices/entities/invoice.entity';

export class Client {
    id: number;
    name: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
    invoices?: Invoice[];
}
